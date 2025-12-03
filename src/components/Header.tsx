import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";
import logoDark from "@/assets/5.svg"; // Changed from logo-dark.svg to 5.svg
import logoLight from "@/assets/logo-light.svg";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const leftLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Books", path: "/books" },
    { name: "Films", path: "/film" },
  ];

  const rightLinks = [
    { name: "Publishing", path: "/publishing" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Links */}
          <ul className="flex items-center gap-8 lg:gap-12">
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

          {/* Center Logo - Made Bigger */}
          <Link to="/" className="flex flex-col items-center mx-8">
            <img 
              src={resolvedTheme === "dark" ? logoLight : logoDark} 
              alt="BAUHAUS Logo" 
              className="h-16 w-auto"
            />
            <span className="text-xs tracking-[0.2em] font-medium mt-1 uppercase">
              BAUHAUS
            </span>
          </Link>

          {/* Right Links + Theme Toggle */}
          <div className="flex items-center gap-8 lg:gap-12">
            <ul className="flex items-center gap-8 lg:gap-12">
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

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={resolvedTheme === "dark" ? logoLight : logoDark} 
              alt="BAUHAUS Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xs tracking-[0.15em] font-medium uppercase">
              BAUHAUS
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border">
            <ul className="flex flex-col py-4">
              {[...leftLinks, ...rightLinks].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block px-6 py-3 nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
