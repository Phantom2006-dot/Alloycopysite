import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ShoppingBag, Home } from "lucide-react";

export default function PaymentCancelled() {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get("tx_ref");

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-amber-600" />
            </div>
            
            <h1 className="text-2xl font-serif mb-2">Payment Cancelled</h1>
            <p className="text-muted-foreground mb-6">
              Your payment was cancelled. No charges were made to your account.
            </p>

            {txRef && (
              <p className="text-sm text-muted-foreground mb-6">
                Reference: <span className="font-mono">{txRef}</span>
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
