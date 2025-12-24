import { Router, Request, Response } from "express";
import Flutterwave from "flutterwave-node-v3";
import { db } from "../db";
import { sql } from "drizzle-orm";

const router = Router();

const getFlutterwaveClient = () => {
  const publicKey = process.env.FLW_PUBLIC_KEY;
  const secretKey = process.env.FLW_SECRET_KEY;
  
  if (!publicKey || !secretKey) {
    throw new Error("Flutterwave API keys not configured");
  }
  
  return new Flutterwave(publicKey, secretKey);
};

router.post("/initialize", async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      phone,
      productId,
      redirectUrl
    } = req.body;

    if (!productId || !email || !name) {
      return res.status(400).json({ 
        message: "Missing required fields",
        error: "Product ID, email, and name are required" 
      });
    }

    const publicKey = process.env.FLW_PUBLIC_KEY;
    
    if (!publicKey) {
      return res.status(503).json({ 
        message: "Payment service unavailable",
        error: "Flutterwave is not configured" 
      });
    }

    const productResult = await db.execute(
      sql`SELECT id, title, price, is_in_stock FROM products WHERE id = ${productId} AND status = 'published'`
    );

    if (!productResult.rows || productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
        error: "The requested product does not exist or is not available"
      });
    }

    const product = productResult.rows[0] as { id: number; title: string; price: number; is_in_stock: boolean };

    if (!product.is_in_stock) {
      return res.status(400).json({
        message: "Product out of stock",
        error: "This product is currently out of stock"
      });
    }

    const amountInMajorUnits = product.price / 100;

    const txRef = `BAUHAUS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Handle protocol detection for Fly.io (behind load balancer)
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.get('host') || 'localhost:5000';
    const baseUrl = `${protocol}://${host}`;
    
    const callbackUrl = redirectUrl || `${baseUrl}/api/payments/callback`;

    const paymentData = {
      public_key: publicKey,
      tx_ref: txRef,
      amount: amountInMajorUnits,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd, mobilemoney",
      redirect_url: callbackUrl,
      customer: {
        email,
        phone_number: phone || "",
        name,
      },
      customizations: {
        title: "BAUHAUS",
        description: `Payment for ${product.title}`,
        logo: "https://res.cloudinary.com/di2u0n1qj/image/upload/v1/bauhaus-cms/logo.png",
      },
      meta: {
        product_id: product.id,
        product_title: product.title,
        source: "bauhaus-cms",
      },
    };

    res.json({
      status: "success",
      message: "Payment initialized",
      data: paymentData,
    });
  } catch (error: any) {
    console.error("Payment initialization error:", error);
    res.status(500).json({ 
      message: "Failed to initialize payment",
      error: error.message 
    });
  }
});

router.get("/callback", async (req: Request, res: Response) => {
  try {
    const { transaction_id, tx_ref, status } = req.query;

    console.log("=== Payment Callback Received ===");
    console.log("Status:", status);
    console.log("Transaction ID:", transaction_id);
    console.log("TX Ref:", tx_ref);

    // Return a simple HTML page that closes itself or shows a message
    const closeWindowHtml = (message: string, status: string) => `
      <html>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9fafb;">
          <div style="text-align: center; padding: 2rem; background: white; border-radius: 0.5rem; shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
            <h1 style="color: ${status === 'success' ? '#059669' : '#dc2626'}; margin-bottom: 1rem;">${message}</h1>
            <p style="color: #4b5563;">You can close this window now.</p>
            <script>
              setTimeout(() => {
                window.close();
              }, 3000);
            </script>
          </div>
        </body>
      </html>
    `;

    // Handle user cancellation
    if (status === "cancelled") {
      console.log("Payment cancelled by user");
      return res.send(closeWindowHtml("Payment Cancelled", "cancelled"));
    }

    // Check if transaction_id exists
    if (!transaction_id) {
      console.error("Missing transaction_id");
      return res.status(400).send(closeWindowHtml("Missing Transaction ID", "error"));
    }

    // Verify with Flutterwave
    const flw = getFlutterwaveClient();
    const response = await flw.Transaction.verify({ id: transaction_id as string });

    console.log("=== Flutterwave Verification Response ===");
    
    if (response.data.status === "successful" && response.data.tx_ref === tx_ref) {
      console.log("✓ Payment SUCCESSFUL");
      return res.send(closeWindowHtml("Payment Successful!", "success"));
    } else {
      console.log(`✗ Payment FAILED - Status: ${response.data.status}`);
      return res.send(closeWindowHtml("Payment Failed", "failed"));
    }
  } catch (error: any) {
    console.error("✗ Payment callback ERROR:", error);
    return res.status(500).send(closeWindowHtml("An error occurred", "error"));
  }
});

// Helper function to get human-readable failure reasons
function getFailureReason(status: string): string {
  const reasons: Record<string, string> = {
    "failed": "Payment was declined. Please check your card details and try again.",
    "pending": "Payment is still being processed. Please wait or contact support.",
    "cancelled": "Payment was cancelled.",
    "declined": "Your payment was declined. Please try a different payment method.",
    "error": "An error occurred during payment. Please try again.",
    "unknown": "Payment status could not be determined. Please contact support.",
  };
  
  return reasons[status] || `Payment failed with status: ${status}`;
}

router.get("/verify/:transactionId", async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({ 
        message: "Transaction ID required" 
      });
    }

    const flw = getFlutterwaveClient();
    const response = await flw.Transaction.verify({ id: transactionId });

    if (response.data.status === "successful") {
      res.json({
        status: "success",
        message: "Payment verified",
        data: {
          transactionId: response.data.id,
          txRef: response.data.tx_ref,
          amount: response.data.amount,
          currency: response.data.currency,
          paymentType: response.data.payment_type,
          customer: response.data.customer,
          createdAt: response.data.created_at,
        },
      });
    } else {
      res.json({
        status: "failed",
        message: "Payment not successful",
        data: {
          transactionId: response.data.id,
          status: response.data.status,
        },
      });
    }
  } catch (error: any) {
    console.error("Payment verification error:", error);
    res.status(500).json({ 
      message: "Failed to verify payment",
      error: error.message 
    });
  }
});

router.post("/webhook", async (req: Request, res: Response) => {
  try {
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers["verif-hash"];

    if (secretHash && signature !== secretHash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = req.body;
    
    console.log("Webhook received:", JSON.stringify(payload, null, 2));

    if (payload.event === "charge.completed") {
      const { data } = payload;
      
      if (data.status === "successful") {
        console.log(`Payment successful: ${data.tx_ref} - ${data.amount} ${data.currency}`);
      }
    }

    res.sendStatus(200);
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
});

router.post("/charge/bank-transfer", async (req: Request, res: Response) => {
  try {
    const {
      amount,
      email,
      phone,
      name,
      currency = "NGN",
    } = req.body;

    if (!amount || !email) {
      return res.status(400).json({ 
        message: "Missing required fields",
        error: "Amount and email are required" 
      });
    }

    const flw = getFlutterwaveClient();
    
    const payload = {
      tx_ref: `BAUHAUS-BT-${Date.now()}`,
      amount: parseFloat(amount),
      email,
      phone_number: phone || "",
      currency,
      fullname: name || "",
      client_ip: req.ip,
      device_fingerprint: req.headers["user-agent"],
      is_permanent: false,
      expires: 3600,
    };

    const response = await flw.Charge.bank_transfer(payload);

    if (response.status === "success") {
      res.json({
        status: "success",
        message: "Bank transfer initiated",
        data: {
          accountNumber: response.meta?.authorization?.transfer_account,
          bankName: response.meta?.authorization?.transfer_bank,
          amount: response.meta?.authorization?.transfer_amount,
          reference: response.meta?.authorization?.transfer_reference,
          expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        message: response.message || "Failed to initiate bank transfer",
      });
    }
  } catch (error: any) {
    console.error("Bank transfer error:", error);
    res.status(500).json({ 
      message: "Failed to initiate bank transfer",
      error: error.message 
    });
  }
});

router.get("/config", async (_req: Request, res: Response) => {
  const publicKey = process.env.FLW_PUBLIC_KEY;
  
  res.json({
    configured: !!publicKey,
    publicKey: publicKey ? publicKey.substring(0, 20) + "..." : null,
  });
});

export default router;
