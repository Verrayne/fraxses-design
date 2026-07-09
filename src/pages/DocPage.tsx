import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Figma } from "lucide-react";
import type { ReactNode } from "react";
import { ComponentDocSections, componentDocs } from "../content/componentDocs";
import { patternDocs } from "../content/patterns";
import { radiusTokens, shadowTokens, spacingTokens, themes } from "../content/tokens";
import { PreviewCard } from "../components/docs/PreviewCard";
import { CodeBlock } from "../components/docs/CodeBlock";
import { Button, Card, Input, SelectPreview, TabsPreview } from "../components/ui-kit";
import { IntendaLightGreenColourUsagePage } from "./ColourUsagePage";

export function DocPage() {
  const { section = "overview", slug = "overview", topic } = useParams();
  const key = section === "overview" ? "overview" : slug;

  if (section === "components" && componentDocs[key]) {
    const doc = componentDocs[key];
    return <PageShell eyebrow="Components" title={doc.title} description={doc.description}><ComponentDocSections doc={doc} /></PageShell>;
  }

  if (section === "patterns" && patternDocs[key]) {
    const doc = patternDocs[key];
    return (
      <PageShell eyebrow="Patterns" title={doc.title} description={doc.description}>
        {doc.preview}
        <section>
          <h2>Guidance</h2>
          <ul className="guide-list">{doc.guidance.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </PageShell>
    );
  }

  if (section === "themes") {
    return <ThemePage slug={key} topic={topic} />;
  }

  if (section === "foundations") {
    return <FoundationPage slug={key} />;
  }

  if (section === "resources") {
    return <ResourcesPage slug={key} />;
  }

  return <OverviewPage />;
}

function PageShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <article className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-6 py-10 lg:px-10">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="mt-4 text-lg leading-8 text-subtle">{description}</p>
      </div>
      <div className="doc-flow">{children}</div>
    </article>
  );
}

function OverviewPage() {
  return (
    <PageShell
      eyebrow="Design Guide"
      title="Fraxses Design Guide and UI Kit"
      description="A documentation-first catalogue for Fraxses foundations, themes, components and product patterns. It starts with the current Intenda green token direction and is structured so new components and themes can be added without reworking the site."
    >
      <PreviewCard title="System Preview">
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
              <div>
                <p className="font-semibold">Data sources</p>
                <p className="text-sm text-subtle">Operational workspace pattern</p>
              </div>
              <Button>New source</Button>
            </div>
            <TabsPreview />
            <div className="grid gap-4 md:grid-cols-3">
              <Card title="Sources" meta="Connected" value="13" />
              <Card title="Objects" meta="Governed" value="248" />
              <Card title="Reviews" meta="Open" value="3" tone="warning" />
            </div>
          </div>
          <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
            <Input label="Search catalogue" placeholder="Find objects" />
            <SelectPreview />
          </div>
        </div>
      </PreviewCard>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Foundations", "Core colour, type, spacing, radius and shadow decisions."],
          ["Themes", "Documented theme tokens for Intenda Light - Green and Midnight."],
          ["Components", "Live previews, variants, states, code and guidance."],
          ["Patterns", "Fraxses product workflows for data-heavy screens."],
        ].map(([title, text]) => (
          <Link key={title} to={`/docs/${title.toLowerCase() === "foundations" ? "foundations/colours" : title.toLowerCase() === "themes" ? "themes/intenda-light-green" : title.toLowerCase() === "components" ? "components/buttons" : "patterns/dashboard"}`} className="rounded-lg border border-border bg-surface p-4 transition hover:border-primary hover:shadow-soft">
            <h2 className="text-base">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-subtle">{text}</p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}

function FoundationPage({ slug }: { slug: string }) {
  const titles: Record<string, string> = {
    colours: "Colours",
    typography: "Typography",
    spacing: "Spacing",
    radius: "Radius",
    shadows: "Shadows",
  };

  return (
    <PageShell eyebrow="Foundations" title={titles[slug] ?? "Foundations"} description="Foundational decisions that keep Fraxses screens consistent, legible and production-friendly. Values are exposed through CSS variables and Tailwind extensions.">
      {slug === "colours" && <ColourFoundation />}
      {slug === "typography" && <TypographyFoundation />}
      {slug === "spacing" && <SpacingFoundation />}
      {slug === "radius" && <RadiusFoundation />}
      {slug === "shadows" && <ShadowFoundation />}
    </PageShell>
  );
}

function ColourFoundation() {
  const defaultTheme = themes[0];
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {defaultTheme.tokens.map((token) => (
        <div key={token.cssVar} className="rounded-lg border border-border bg-surface p-4">
          <div className="mb-4 h-20 rounded-md border border-border" style={{ backgroundColor: token.value }} />
          <h2 className="text-base">{token.label}</h2>
          <p className="mt-1 text-sm text-subtle">{token.description}</p>
          <code className="mt-3 block text-xs text-primary">{token.cssVar} · {token.value}</code>
        </div>
      ))}
    </section>
  );
}

function TypographyFoundation() {
  return (
    <PreviewCard title="Type Scale">
      <div className="space-y-5">
        <div><p className="text-sm text-subtle">Page title</p><h1 className="mt-1">Design system heading</h1></div>
        <div><p className="text-sm text-subtle">Section title</p><h2 className="mt-1">Component anatomy</h2></div>
        <div><p className="text-sm text-subtle">Body</p><p className="mt-1 max-w-2xl leading-7">Use clear, compact typography for documentation and dense application surfaces. Avoid display-sized type inside controls, cards and sidebars.</p></div>
        <div><p className="text-sm text-subtle">Code</p><code className="font-mono text-sm text-primary">--color-primary: 38 107 70;</code></div>
      </div>
    </PreviewCard>
  );
}

function SpacingFoundation() {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {spacingTokens.map((space) => (
        <div key={space} className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4">
          <div className="h-6 rounded bg-primary" style={{ width: `${Number(space) * 2}px` }} />
          <div><h2 className="text-base">{space}px</h2><p className="text-sm text-subtle">Tailwind spacing token and layout rhythm.</p></div>
        </div>
      ))}
    </section>
  );
}

function RadiusFoundation() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {radiusTokens.map((token) => (
        <div key={token.label} className="border border-border bg-surface p-4" style={{ borderRadius: token.value }}>
          <h2 className="text-base">{token.label} · {token.value}</h2>
          <p className="mt-2 text-sm text-subtle">{token.use}</p>
        </div>
      ))}
    </section>
  );
}

function ShadowFoundation() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {shadowTokens.map((token) => (
        <div key={token.label} className="rounded-lg border border-border bg-surface p-5" style={{ boxShadow: token.value }}>
          <h2 className="text-base">{token.label}</h2>
          <p className="mt-2 text-sm text-subtle">{token.use}</p>
          <code className="mt-3 block text-xs text-primary">{token.value}</code>
        </div>
      ))}
    </section>
  );
}

function ThemePage({ slug, topic }: { slug: string; topic?: string }) {
  if (slug === "intenda-light-green" && topic === "colour-usage") {
    return (
      <PageShell
        eyebrow="Themes"
        title="Intenda Light - Green colour usage"
        description="A Tailwind and Figma-style guide for how Intenda Light - Green colour tokens are used across Fraxses components, navigation, canvas workspaces and semantic states."
      >
        <IntendaLightGreenColourUsagePage />
      </PageShell>
    );
  }

  const theme = themes.find((item) => item.id === (slug === "intenda-light-green" ? "intenda-green" : slug === "intenda-light-blue" ? "intenda-blue" : slug)) ?? themes[0];

  if (theme.status === "placeholder") {
    return (
      <PageShell eyebrow="Themes" title={theme.name} description={theme.description}>
        <PreviewCard title="Placeholder">
          <div className="rounded-lg border border-dashed border-border bg-elevated p-8">
            <h2>Token values pending</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-subtle">This page is intentionally present without final colour values. Add values to <code>src/content/tokens.ts</code> once the blue theme is approved.</p>
          </div>
        </PreviewCard>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Themes" title={theme.name} description={theme.description}>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {theme.tokens.map((token) => (
          <div key={token.cssVar} className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-4 h-16 rounded-md border border-border" style={{ backgroundColor: token.value }} />
            <h2 className="text-base">{token.label}</h2>
            <p className="mt-1 text-sm text-subtle">{token.description}</p>
            <code className="mt-3 block text-xs text-primary">{token.cssVar} · {token.value}</code>
          </div>
        ))}
      </section>
      <CodeBlock code={`html[data-theme="${theme.id}"] {
  --color-primary: ${theme.tokens.find((token) => token.cssVar === "--color-primary")?.value};
}`} />
    </PageShell>
  );
}

function ResourcesPage({ slug }: { slug: string }) {
  if (slug === "figma-source") {
    return (
      <PageShell eyebrow="Resources" title="Figma Source" description="The design guide is referenced from the Fraxses Figma Design Guide file. The provided node is the cover for the Intenda 3 Design Library.">
        <a className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-elevated" href="https://www.figma.com/design/swjGUNj0dztirocm1n5e7j/Design-Guide?node-id=36-2&p=f&t=R74OpPXpqIYKdHuZ-0" target="_blank" rel="noreferrer">
          <Figma size={16} /> Open Figma source <ArrowUpRight size={14} />
        </a>
        <PreviewCard title="Implementation Notes">
          <p className="max-w-3xl text-sm leading-7 text-subtle">The connector exposed the cover frame metadata. Exact app theme tokens can be updated in the token registry without changing route, layout or component documentation code.</p>
        </PreviewCard>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Resources" title="Contribution Notes" description="How to extend this UI kit without making the guide harder to maintain.">
      <ul className="guide-list">
        <li>Add new routes in <code>src/content/navigation.ts</code>.</li>
        <li>Add component pages to <code>src/content/componentDocs.tsx</code>.</li>
        <li>Add or replace theme values in <code>src/content/tokens.ts</code>.</li>
        <li>Keep live previews small, focused and representative of product use.</li>
      </ul>
    </PageShell>
  );
}
