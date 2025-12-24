import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, RefreshCw, Home, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const error = searchParams.get("error");
  const status = searchParams.get("status");
  const reason = searchParams.get("reason");

  // Display failure notification
  useEffect(() => {
    const failureMessage = error || reason || "Your payment could not be processed";
    toast.error("❌ Payment Failed", {
      description: failureMessage,
      duration: 6000,
    });
  }, [error, reason]);

  const getStatusDisplay = () => {
    if (status) {
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
    return "Failed";
  };

  const failureMessage = reason || error || "Your payment could not be processed. Please try again.";

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <Card className="max-w-md w-full shadow-lg border-red-200 dark:border-red-800">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            
            {/* Main Message */}
            <h1 className="text-3xl font-serif font-bold mb-2 text-red-700 dark:text-red-300">
              ✗ Payment Failed
            </h1>

            {/* Status Badge */}
            {status && (
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium mb-4 border border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4" />
                Status: {getStatusDisplay()}
              </div>
            )}

            {/* Failure Reason */}
            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 mb-6 border border-red-200 dark:border-red-800">
              <p className="text-base text-red-700 dark:text-red-300 font-medium">
                {failureMessage}
              </p>
            </div>

            {/* Transaction Reference */}
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
                <Button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Support Info */}
            <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
              If the problem persists, please contact our support team.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
