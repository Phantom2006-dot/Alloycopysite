import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-serif mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">Page not found</p>
          <Link to="/" className="link-gold text-sm uppercase tracking-wider">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
