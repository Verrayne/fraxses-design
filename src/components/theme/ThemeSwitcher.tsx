import { Link } from "react-router-dom";
import { themes, useTheme } from "./ThemeProvider";
import type { ThemeDefinition } from "../../themes/themeRegistry";

export function ThemeSwitcher() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <select
        className="rounded-md border border-border bg-surface px-2 py-1 text-sm text-ink outline-none focus:border-primary"
        value={themeId}
        onChange={(event) => setThemeId(event.target.value as ThemeDefinition["id"])}
        aria-label="Theme"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <Link to="/" className="text-sm font-medium text-primary">
        Change theme
      </Link>
    </div>
  );
}
