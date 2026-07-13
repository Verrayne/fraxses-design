import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { Button, Badge, Card } from "../components/ui/shared";
import { themes } from "../components/theme/ThemeProvider";
import { useTheme } from "../components/theme/ThemeProvider";
import type { ThemeDefinition } from "../themes/themeRegistry";

export function HomePage() {
  const navigate = useNavigate();
  const { setThemeId } = useTheme();

  const chooseTheme = (id: ThemeDefinition["id"]) => {
    setThemeId(id);
    navigate("/docs/overview");
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-6 py-14 lg:px-10">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Fraxses</p>
        <h1>Fraxses Design</h1>
        <p className="mt-4 text-lg leading-8 text-subtle">
          A shared Tailwind-based design system for Fraxses, available in multiple visual themes.
        </p>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {themes.map((theme) => (
          <article key={theme.id} className="rounded-2xl border border-border bg-elevated p-5 shadow-soft">
            <div className="mb-4">
              <h2 className="text-xl">{theme.name}</h2>
              <p className="mt-2 text-sm leading-6 text-subtle">{theme.description}</p>
            </div>
            <ThemeMiniPreview theme={theme} />
            {theme.id === "midnight" || theme.id === "ocean" ? (
              <button
                className="mt-5 inline-flex h-10 w-full cursor-not-allowed items-center justify-center rounded-md border border-border bg-muted px-4 text-sm font-semibold text-subtle opacity-70"
                disabled
                type="button"
              >
                Coming soon
              </button>
            ) : (
            <button
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-ink transition hover:bg-primary/90"
              onClick={() => chooseTheme(theme.id)}
              type="button"
            >
              Continue
            </button>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

function ThemeMiniPreview({ theme }: { theme: ThemeDefinition }) {
  const style = Object.fromEntries(Object.entries(theme.tokens).map(([name, value]) => [`--${name}`, value])) as CSSProperties;
  return (
    <div className="rounded-xl border border-border bg-surface p-4" style={style}>
      <div className="mb-4 flex gap-2">
        <span className="h-8 flex-1 rounded-md" style={{ background: "var(--primary)" }} />
        <span className="h-8 flex-1 rounded-md" style={{ background: "var(--secondary)" }} />
        <span className="h-8 flex-1 rounded-md border" style={{ background: "var(--surface-raised)", borderColor: "var(--border)" }} />
      </div>
      <Card title="Preview">
        <div className="mt-3 flex items-center gap-2">
          <Button tone="primary" size="sm">Run</Button>
          <Badge tone="secondary" variant="soft">Ready</Badge>
        </div>
      </Card>
    </div>
  );
}
