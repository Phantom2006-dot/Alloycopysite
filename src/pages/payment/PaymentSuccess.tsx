import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Home, Package } from "lucide-react";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");
  const productTitle = searchParams.get("product_title") || "Your Purchase";
  const paymentType = searchParams.get("payment_type") || "card";

  // Display success message on load with instant redirect notification
  useEffect(() => {
    toast.success("🎉 Payment Successful!", {
      description: `You have successfully purchased ${productTitle}. Thank you!`,
      duration: 5000,
    });
  }, [productTitle]);

  const formatAmount = (value: string | null, curr: string | null) => {
    if (!value) return "";
    const numValue = parseFloat(value);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: curr || 'NGN',
      minimumFractionDigits: 2,
    }).format(numValue);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <Card className="max-w-md w-full shadow-lg border-green-200 dark:border-green-800">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            
            {/* Main Message */}
            <h1 className="text-3xl font-serif font-bold mb-2 text-green-700 dark:text-green-300">
              ✓ Payment Successful!
            </h1>
            
            {/* Personalized Message */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2 font-medium">
              You have purchased:
            </p>
            <div className="flex items-center justify-center gap-2 mb-6 bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-base font-semibold text-green-700 dark:text-green-300">
                {productTitle}
              </p>
            </div>

            <p className="text-muted-foreground mb-6">
              Thank you! Your order has been confirmed and is being processed.
            </p>

            {/* Amount Paid */}
            {amount && currency && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-800">
                <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-300">
                  {formatAmount(amount, currency)}
                </p>
                <p className="text-xs text-muted-foreground mt-2 capitalize">
                  via {paymentType}
                </p>
              </div>
            )}

            {/* Transaction Details */}
            {txRef && (
              <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-3 mb-6">
                <p className="text-xs text-muted-foreground mb-1">Transaction Reference</p>
                <p className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300 break-all">
                  {txRef}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-green-200 hover:bg-green-50 dark:hover:bg-green-950/30">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/" className="w-full sm:w-auto">
                <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Info Message */}
            <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
              A confirmation email has been sent to your registered email address.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
