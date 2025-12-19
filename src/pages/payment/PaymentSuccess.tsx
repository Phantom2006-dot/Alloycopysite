import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");

  // Display success message on load
  useEffect(() => {
    toast.success("Payment Successful!", {
      description: "Thank you for your purchase. Your order has been confirmed.",
      duration: 5000,
    });
  }, []);

  const formatAmount = (value: string | null, curr: string | null) => {
    if (!value) return "";
    const numValue = parseFloat(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr || 'NGN',
    }).format(numValue);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-serif mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {amount && currency && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatAmount(amount, currency)}
                </p>
              </div>
            )}

            {txRef && (
              <p className="text-sm text-muted-foreground mb-6">
                Transaction Reference: <span className="font-mono">{txRef}</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
