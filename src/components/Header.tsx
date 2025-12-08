import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";
import logoLight from "@/assets/light.png";
import logoDark from "@/assets/dark.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const leftLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Books", path: "/books" },
    { name: "Films", path: "/film" },
    { name: "TV", path: "/tv" },
  ];

  const rightLinks = [
    { name: "Publishing", path: "/publishing" },
    { name: "Events", path: "/events" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="hidden md:flex items-center justify-between">
            <ul className="flex items-center gap-6 lg:gap-10">
              {leftLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? "text-foreground font-medium" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to="/" className="flex flex-col items-center mx-8">
              <img 
                src={resolvedTheme === "dark" ? logoDark : logoLight} 
                alt="Bauhaus Production" 
                className="h-20 w-auto"
              />
            </Link>

            <div className="flex items-center gap-6 lg:gap-10">
              <ul className="flex items-center gap-6 lg:gap-10">
                {rightLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`nav-link ${isActive(link.path) ? "text-foreground font-medium" : ""}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={resolvedTheme === "dark" ? logoDark : logoLight} 
                alt="Bauhaus Production" 
                className="h-14 w-auto"
              />
            </Link>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground relative z-[60]"
                data-testid="button-mobile-menu"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-background transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen 
            ? "opacity-100 visible translate-x-0" 
            : "opacity-0 invisible translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center gap-8">
            {allLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-2xl tracking-wide transition-all duration-300 ${
                  isActive(link.path) 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
