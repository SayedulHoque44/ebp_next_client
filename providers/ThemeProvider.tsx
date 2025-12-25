"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
  useTheme,
} from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  useEffect(() => {
    if (!pathname.includes("/dashboard")) {
      setTheme("light");

      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.style["color-scheme" as any] = "light";
    }
  }, [pathname, setTheme]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
