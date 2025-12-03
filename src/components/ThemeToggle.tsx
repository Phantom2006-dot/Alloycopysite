import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect } from "react"; // Add this import

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Add this useEffect to force dark mode on initial load
  useEffect(() => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem("your-theme-key") || localStorage.getItem("theme");
    
    // If no theme is saved (first visit) or it's light mode, force dark mode
    if (!savedTheme || savedTheme === "light") {
      setTheme("dark");
    }
  }, [setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-8 w-8"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
