import { useEffect, useRef, useState } from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import { themes, type ThemeDefinition } from "../../themes/themeRegistry";
import { useTheme } from "./themeContext";

type ThemeSwitcherProps = {
  size?: "sm" | "lg";
};

export function ThemeSwitcher({ size = "sm" }: ThemeSwitcherProps) {
  const { activeTheme, themeId, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const chooseTheme = (nextThemeId: ThemeDefinition["id"]) => {
    setThemeId(nextThemeId);
    setOpen(false);
  };

  return (
    <div className="fx-theme-switcher" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className={size === "lg" ? "fx-theme-trigger fx-theme-trigger-lg" : "fx-theme-trigger"}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>{activeTheme.name}</span>
        <ChevronDown className={open ? "fx-theme-trigger-icon is-open" : "fx-theme-trigger-icon"} size={15} />
      </button>
      {open && (
        <div className="fx-theme-menu" role="listbox">
          {themes.map((theme) => (
            <button
              aria-selected={theme.id === themeId}
              className={theme.id === themeId ? "fx-theme-option is-active" : "fx-theme-option"}
              key={theme.id}
              onClick={() => chooseTheme(theme.id)}
              role="option"
              type="button"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{theme.name}</span>
                <span className="block truncate text-xs text-subtle">{theme.id === "midnight" || theme.id === "ocean" ? "Coming soon" : theme.description}</span>
              </span>
              {theme.id === themeId && <Check className="shrink-0" size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
