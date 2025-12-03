import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/30 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 text-center md:text-left">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-2">UK Office</h4>
            <p className="text-sm text-muted-foreground">4 Notre Dame Mews, Northampton, NN1 2BG</p>
            <p className="text-sm text-muted-foreground">+44 1604 434082</p>
            <a href="mailto:info@bauhausproduction.com" className="text-sm link-gold">
              info@bauhausproduction.com
            </a>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-2">Nigeria Office</h4>
            <p className="text-sm text-muted-foreground">41 Coker Road, Ilupeju, Lagos</p>
            <p className="text-sm text-muted-foreground">+234 703 889 2961</p>
            <a href="mailto:akinalaka@bauhaus-education.co.uk" className="text-sm link-gold">
              akinalaka@bauhaus-education.co.uk
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs text-muted-foreground">
          <Link to="/privacy" className="link-gold">
            Privacy Policy
          </Link>
          <span className="hidden md:inline">|</span>
          <Link to="/terms" className="link-gold">
            Terms and Conditions
          </Link>
          <span className="hidden md:inline">|</span>
          <span>© BAUHAUS {currentYear}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
