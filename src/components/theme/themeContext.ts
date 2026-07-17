import { createContext, useContext } from "react";
import type { ThemeDefinition } from "../../themes/themeRegistry";

export type ThemeContextValue = {
  themeId: ThemeDefinition["id"];
  activeTheme: ThemeDefinition;
  setThemeId: (id: ThemeDefinition["id"]) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}
