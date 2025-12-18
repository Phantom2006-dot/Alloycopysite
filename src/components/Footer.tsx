import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import logoLight from "@/assets/light.png";
import logoDark from "@/assets/dark.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();

  return (
    <footer className="mt-auto border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex justify-center mb-8">
          <img
            // Inverted to match the Header: dark theme uses light logo, light theme uses dark logo
            src={resolvedTheme === "dark" ? logoLight : logoDark}
            alt="Bauhaus Production"
            className="h-20 w-auto opacity-80"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-foreground">
              UK Office
            </h4>
            <p className="text-sm text-muted-foreground">
              4 Notre Dame Mews, Northampton, NN1 2BG
            </p>
            <p className="text-sm text-muted-foreground">+44 1604 434082</p>
            <a
              href="mailto:info@bauhausproduction.com"
              className="text-sm link-accent"
            >
              info@bauhausproduction.com
            </a>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-foreground">
              Nigeria Office
            </h4>
            <p className="text-sm text-muted-foreground">
              41 Coker Road, Ilupeju, Lagos
            </p>
            <p className="text-sm text-muted-foreground">+234 703 889 2961</p>
            <a
              href="mailto:akinalaka@bauhaus-education.co.uk"
              className="text-sm link-accent"
            >
              akinalaka@bauhaus-education.co.uk
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-xs text-muted-foreground">
          <Link
            to="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="hidden md:inline text-border">|</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms and Conditions
          </Link>
          <span className="hidden md:inline text-border">|</span>
          <span>© BAUHAUS {currentYear}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
