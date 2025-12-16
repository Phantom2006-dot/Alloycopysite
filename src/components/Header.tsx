
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/5.svg";

// --- New Navigation Data Structure ---
const navItems = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about",
    dropdown: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Blog", path: "/blog" },
      { name: "Events", path: "/events" },
      { name: "Team", path: "/team" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      { name: "Films", path: "/film" },
      { name: "TV", path: "/tv" },
      { name: "Books", path: "/books" },
      { name: "Publishing", path: "/publishing" },
    ],
  },
  { name: "Shop", path: "/shop" },
];

// --- Dropdown Component for Desktop Navigation ---
const DropdownNavItem = ({ item, isActive }: { item: typeof navItems[number], isActive: (path: string) => boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to={item.path}
        className={`nav-link flex items-center gap-1 py-2 ${
          isActive(item.path) ? "text-foreground font-medium" : "hover:text-foreground"
        }`}
      >
        {item.name}
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </Link>
      {item.dropdown && (
        <div
          className={`absolute left-0 mt-0 w-48 bg-background border border-border rounded-md shadow-lg transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
          }`}
        >
          <ul className="py-2">
            {item.dropdown.map((subItem) => (
              <li key={subItem.path}>
                <Link
                  to={subItem.path}
                  className={`block px-4 py-2 text-sm ${
                    isActive(subItem.path) ? "text-primary font-medium" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

// --- Main Header Component ---
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

  const isActive = (path: string) => location.pathname === path;

  // Determine which logo to use based on theme
  const currentLogo = resolvedTheme === "dark" ? logoLight : logoDark;
  const logoAlt = "Bauhaus Production";

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Always on the left */}
            <Link to="/" className="flex items-center">
              <img src={currentLogo} alt={logoAlt} className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation - Simplified */}
            <div className="hidden md:flex items-center gap-10">
              <ul className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <DropdownNavItem
                        key={item.name}
                        item={item}
                        isActive={isActive}
                      />
                    );
                  }
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`nav-link ${
                          isActive(item.path) ? "text-foreground font-medium" : "hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-background transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="flex flex-col items-center">
                <Link
                  to={item.path}
                  className={`text-2xl tracking-wide transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: mobileMenuOpen
                      ? "translateY(0)"
                      : "translateY(20px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="flex flex-col items-center mt-4 space-y-2">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`text-lg transition-all duration-300 ${
                          isActive(subItem.path)
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        style={{
                          transitionDelay: mobileMenuOpen ? `${(index * 50) + (subIndex * 20)}ms` : "0ms",
                          transform: mobileMenuOpen
                            ? "translateY(0)"
                            : "translateY(20px)",
                          opacity: mobileMenuOpen ? 1 : 0,
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
