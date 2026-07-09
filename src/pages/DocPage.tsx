import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, Figma } from "lucide-react";
import type { ReactNode } from "react";
import { ComponentDocSections, componentDocs } from "../content/componentDocs";
import { designSystems, type DesignSystemId } from "../content/navigation";
import { patternDocs } from "../content/patterns";
import { radiusTokens, shadowTokens, spacingTokens, themes } from "../content/tokens";
import { getChildRegistryItem, getRegistryItem, type DocSectionId } from "../docs/registry";
import { PreviewCard } from "../components/docs/PreviewCard";
import { CodeBlock } from "../components/docs/CodeBlock";
import { Button, Card, Input, SelectPreview, TabsPreview } from "../components/ui-kit";
import { IntendaLightGreenColourUsagePage } from "./ColourUsagePage";

export function DocPage() {
  const { designSystem, section, slug, topic } = useParams();

  if (designSystem !== "intenda" && designSystem !== "oryx") {
    return <Navigate to={legacyRedirectPath(designSystem, section, slug, topic)} replace />;
  }

  const activeDesignSystem = designSystem as DesignSystemId;
  const activeSection = section ?? "overview";
  const key = activeSection === "overview" ? "overview" : slug ?? "overview";

  if (activeDesignSystem === "oryx") {
    return <OryxPage section={activeSection} slug={slug} topic={topic} />;
  }

  if (activeSection === "overview") {
    return <IntendaOverviewPage />;
  }

  if (activeSection === "components" && componentDocs[key]) {
    const doc = componentDocs[key];
    return <PageShell eyebrow="Components" title={doc.title} description={doc.description}><ComponentDocSections doc={doc} /></PageShell>;
  }

  if (activeSection === "components" && getRegistryItem("components", key)) {
    return <NotDocumentedPage designSystem="Intenda" section="Components" title={getRegistryItem("components", key)?.title ?? titleCase(key)} />;
  }

  if (activeSection === "patterns" && patternDocs[key]) {
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

  if (activeSection === "patterns" && getRegistryItem("patterns", key)) {
    return <NotDocumentedPage designSystem="Intenda" section="Patterns" title={getRegistryItem("patterns", key)?.title ?? titleCase(key)} />;
  }

  if (activeSection === "themes") {
    return <ThemePage slug={key} topic={topic} />;
  }

  if (activeSection === "foundations") {
    return <FoundationPage slug={key} />;
  }

  return <Navigate to="/docs/intenda/overview" replace />;
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

function IntendaOverviewPage() {
  return (
    <PageShell
      eyebrow="Intenda"
      title="Intenda design system"
      description="The modern Fraxses design system: a token-driven catalogue for enterprise interfaces, data-heavy workflows, theming, components and product patterns."
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
          ["Themes", "Theme tokens and usage guidance for Intenda Light - Green and Midnight."],
          ["Components", "Live previews, variants, states, code and guidance."],
          ["Patterns", "Fraxses product workflows for data-heavy screens."],
        ].map(([title, text]) => (
          <Link key={title} to={`/docs/intenda/${title.toLowerCase() === "foundations" ? "foundations/colours" : title.toLowerCase() === "themes" ? "themes/intenda-light-green/colour-usage" : title.toLowerCase() === "components" ? "components/buttons" : "patterns/dashboard"}`} className="rounded-lg border border-border bg-surface p-4 transition hover:border-primary hover:shadow-soft">
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
    iconography: "Iconography",
  };

  if (slug === "iconography") {
    return <NotDocumentedPage designSystem="Intenda" section="Foundations" title="Iconography" />;
  }

  return (
    <PageShell eyebrow="Foundations" title={titles[slug] ?? "Foundations"} description="Foundational decisions that keep Fraxses screens consistent, legible and production-friendly. Values are exposed through CSS variables and Tailwind extensions.">
      {slug === "typography" && <TypographyFoundation />}
      {slug === "colours" && <ColourFoundation />}
      {slug === "spacing" && <SpacingFoundation />}
      {slug === "radius" && <RadiusFoundation />}
      {slug === "shadows" && <ShadowFoundation />}
    </PageShell>
  );
}

function ColourFoundation() {
  return (
    <div className="space-y-6">
      <PreviewCard title="Theme-specific colour documentation">
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base">Colours are documented per Intenda theme</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-subtle">
              Intenda supports multiple themes, so detailed colour usage lives with each theme. Start with
              Intenda Light - Green for the current default palette and usage guidance.
            </p>
          </div>
          <Link
            to="/docs/intenda/themes/intenda-light-green/colour-usage"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-ink"
          >
            View colour usage
          </Link>
        </div>
      </PreviewCard>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {themes[0].tokens.slice(0, 9).map((token) => (
          <div key={token.cssVar} className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-4 h-16 rounded-md border border-border" style={{ backgroundColor: token.value }} />
            <h2 className="text-base">{token.label}</h2>
            <p className="mt-1 text-sm text-subtle">{token.description}</p>
            <code className="mt-3 block text-xs text-primary">{token.cssVar} · {token.value}</code>
          </div>
        ))}
      </section>
    </div>
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

function OryxPage({ section, slug, topic }: { section: string; slug?: string; topic?: string }) {
  if (section === "overview") {
    return (
      <PageShell
        eyebrow="Oryx"
        title="Oryx design system"
        description="The established Fraxses design system. This structure is ready for migration from the Oryx design guide without inventing component specifications or colour values."
      >
        <PreviewCard title="Source design library">
          <div className="space-y-4">
            <p className="max-w-3xl text-sm leading-7 text-subtle">
              Oryx documentation will be migrated section by section from the source Figma design guide.
              Values and specifications are intentionally left out until they are documented from source.
            </p>
            <a
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-elevated"
              href={designSystems.oryx.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Figma size={16} /> Open Oryx Figma source <ArrowUpRight size={14} />
            </a>
          </div>
        </PreviewCard>
      </PageShell>
    );
  }

  const sectionTitle = titleCase(section);
  const registryItem = getRegistryItem(section as DocSectionId, slug);
  const childItem = getChildRegistryItem(section as DocSectionId, slug, topic);
  const pageTitle = childItem?.title ?? registryItem?.title ?? (slug ? titleCase(slug.replace(/-/g, " ")) : sectionTitle);

  return <NotDocumentedPage designSystem="Oryx" section={sectionTitle} title={pageTitle} sourceUrl={designSystems.oryx.sourceUrl} />;
}

function NotDocumentedPage({
  designSystem,
  section,
  title,
  sourceUrl,
}: {
  designSystem: string;
  section: string;
  title: string;
  sourceUrl?: string;
}) {
  return (
    <PageShell
      eyebrow={`${designSystem} / ${section}`}
      title={title}
      description={`${designSystem} documentation page reserved in the shared registry. Specifications will be added once they are documented from the source design system.`}
    >
      <PreviewCard title="Migration placeholder">
        <div className="rounded-lg border border-dashed border-border bg-background p-6">
          <div className="mb-4 inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-subtle">
            Status: Not documented yet
          </div>
          <h2 className="text-base">No specifications added yet</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-subtle">
            This page exists to preserve documentation parity between Intenda and Oryx. It does not invent colours,
            component behaviour, spacing, states or pattern guidance.
          </p>
          {sourceUrl && (
            <a
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-elevated"
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Figma size={16} /> Open source design library <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </PreviewCard>
    </PageShell>
  );
}

function legacyRedirectPath(designSystem?: string, section?: string, slug?: string, topic?: string) {
  if (!designSystem || designSystem === "overview") {
    return "/docs/intenda/overview";
  }

  const parts = [designSystem, section, slug, topic].filter(Boolean);
  return `/docs/intenda/${parts.join("/")}`;
}

function titleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
