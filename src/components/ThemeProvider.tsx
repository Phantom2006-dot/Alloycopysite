import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="dark"
      enableSystem={false} // Disable system theme
      forcedTheme="dark" // This forces dark mode ALWAYS
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
