import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, RefreshCw, Home } from "lucide-react";

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const error = searchParams.get("error");
  const status = searchParams.get("status");

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-serif mb-2">Payment Failed</h1>
            <p className="text-muted-foreground mb-6">
              Unfortunately, your payment could not be processed. Please try again.
            </p>

            {(error || status) && (
              <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-600">
                  {error || `Status: ${status}`}
                </p>
              </div>
            )}

            {txRef && (
              <p className="text-sm text-muted-foreground mb-6">
                Reference: <span className="font-mono">{txRef}</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop">
                <Button variant="outline" className="w-full sm:w-auto">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
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
