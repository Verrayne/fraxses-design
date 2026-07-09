import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { themes } from "../../content/tokens";

type ThemeContextValue = {
  themeId: string;
  setThemeId: (id: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeId, setThemeId] = useState("intenda-green");
  const activeTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];

  useEffect(() => {
    document.documentElement.classList.remove(...themes.map((theme) => theme.className));
    document.documentElement.classList.add(activeTheme.className);
    document.documentElement.dataset.theme = activeTheme.id;
  }, [activeTheme]);

  const value = useMemo(() => ({ themeId, setThemeId }), [themeId]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
