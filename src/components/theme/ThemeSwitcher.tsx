import { themes } from "../../content/tokens";
import { useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { themeId, setThemeId } = useTheme();

  return (
    <select
      className="rounded-md border border-border bg-surface px-2 py-1 text-sm text-ink outline-none focus:border-primary"
      value={themeId}
      onChange={(event) => setThemeId(event.target.value)}
      aria-label="Theme"
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id} disabled={theme.status === "placeholder"}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
