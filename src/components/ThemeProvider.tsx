import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="dark"  // This makes dark mode the initial theme
      enableSystem={true}  // Users can still switch to system or light mode
      storageKey="bauhaus-theme" // Optional: custom storage key
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
