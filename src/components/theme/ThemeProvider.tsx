import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getTheme, themes, validateThemeTokens, type ThemeDefinition } from "../../themes/themeRegistry";

type ThemeContextValue = {
  themeId: ThemeDefinition["id"];
  activeTheme: ThemeDefinition;
  setThemeId: (id: ThemeDefinition["id"]) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const storageKey = "fraxses-theme";

validateThemeTokens();

function toRgbChannels(value: string) {
  if (!value.startsWith("#")) return value;
  const hex = value.slice(1);
  const full = hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;
  const number = Number.parseInt(full, 16);
  return `${(number >> 16) & 255} ${(number >> 8) & 255} ${number & 255}`;
}

function readInitialTheme(): ThemeDefinition["id"] {
  if (typeof window === "undefined") return "forest";
  const stored = window.localStorage.getItem(storageKey);
  return getTheme(stored ?? undefined).id;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeId, setThemeIdState] = useState<ThemeDefinition["id"]>(readInitialTheme);
  const activeTheme = getTheme(themeId);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = activeTheme.id;
    for (const [name, value] of Object.entries(activeTheme.tokens)) {
      root.style.setProperty(`--${name}`, value);
    }
    root.style.setProperty("--color-canvas", toRgbChannels(activeTheme.tokens.background));
    root.style.setProperty("--color-background", toRgbChannels(activeTheme.tokens.background));
    root.style.setProperty("--color-surface", toRgbChannels(activeTheme.tokens.surface));
    root.style.setProperty("--color-elevated", toRgbChannels(activeTheme.tokens["surface-raised"]));
    root.style.setProperty("--color-border", toRgbChannels(activeTheme.tokens.border));
    root.style.setProperty("--color-muted", toRgbChannels(activeTheme.tokens["surface-hover"]));
    root.style.setProperty("--color-ink", toRgbChannels(activeTheme.tokens.foreground));
    root.style.setProperty("--color-subtle", toRgbChannels(activeTheme.tokens["foreground-subtle"]));
    root.style.setProperty("--color-primary", toRgbChannels(activeTheme.tokens.primary));
    root.style.setProperty("--color-primary-ink", toRgbChannels(activeTheme.tokens["primary-foreground"]));
    root.style.setProperty("--color-accent", toRgbChannels(activeTheme.tokens.secondary));
    root.style.setProperty("--color-success", toRgbChannels(activeTheme.tokens.success));
    root.style.setProperty("--color-warning", toRgbChannels(activeTheme.tokens.warning));
    root.style.setProperty("--color-danger", toRgbChannels(activeTheme.tokens.error));
    root.style.setProperty("--shadow-soft", activeTheme.tokens["shadow-soft"]);
    root.style.setProperty("--shadow-lifted", activeTheme.tokens["shadow-raised"]);
    root.style.colorScheme = activeTheme.id === "midnight" ? "dark" : "light";
    window.localStorage.setItem(storageKey, activeTheme.id);
  }, [activeTheme]);

  const setThemeId = (id: ThemeDefinition["id"]) => setThemeIdState(getTheme(id).id);
  const value = useMemo(() => ({ themeId, activeTheme, setThemeId }), [themeId, activeTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}

export { themes };
