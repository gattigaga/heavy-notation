import { useEffect, useState } from "react";

type ColorScheme = "light" | "dark";

const useColorScheme = (): ColorScheme => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;

    const handler = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? "dark" : "light");
    };

    if (typeof window !== "undefined") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      setColorScheme(mediaQuery.matches ? "dark" : "light");

      mediaQuery.addEventListener("change", handler);
    }

    return () => {
      if (typeof window !== "undefined") {
        mediaQuery?.removeEventListener("change", handler);
      }
    };
  }, []);

  return colorScheme;
};

export default useColorScheme;
