import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import HelpCircle from "lucide-react/dist/esm/icons/help-circle.js";
import Menu from "lucide-react/dist/esm/icons/menu.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import {
  Alert,
  Avatar,
  Badge,
  BarChart,
  Button,
  Callout,
  Card,
  Checkbox,
  DonutChart,
  LineChart,
  Progress,
  Radio,
  SearchInput,
  Select,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  type Tone,
  type Variant,
} from "../components/ui/shared";
import { DoDont } from "../components/docs/DoDont";
import { componentItems, foundationItems, labelFromSlug, patternItems, redirectLegacyPath } from "../docs/sharedRegistry";
import { getTheme, semanticTokenNames, themes, type PaletteFamily, type ThemeDefinition } from "../themes/themeRegistry";
import { useTheme } from "../components/theme/ThemeProvider";

export function DocPage() {
  const params = useParams();
  const location = useLocation();
  const legacyRedirect = redirectLegacyPath(location.pathname);
  if (legacyRedirect) return <Navigate to={legacyRedirect} replace />;

  if (location.pathname.startsWith("/themes/")) {
    return <ThemeSummaryPage theme={getTheme(params.themeId)} />;
  }

  const section = params.section ?? "overview";
  const slug = params.slug ?? "overview";

  if (section === "overview") return <OverviewPage />;
  if (section === "foundations") return foundationItems.includes(slug) ? <FoundationPage slug={slug} /> : <Navigate to="/docs/foundations/colours" replace />;
  if (section === "components") {
    if (slug === "overview") return <ComponentsOverviewPage />;
    return componentItems.includes(slug) ? <ComponentPage slug={slug} /> : <Navigate to="/docs/components/overview" replace />;
  }
  if (section === "patterns") return patternItems.includes(slug) ? <PatternPage slug={slug} /> : <Navigate to="/docs/patterns/dashboard" replace />;
  return <Navigate to="/docs/overview" replace />;
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
    <PageShell eyebrow="Shared system" title="One design system, many themes" description="Fraxses Design now has one Tailwind-aligned foundation and one shared component catalogue. Forest, Oryx, Midnight and Ocean change the semantic tokens underneath the same components.">
      <PreviewPanel title="Live shared component preview">
        <DashboardPreview />
      </PreviewPanel>
      <section className="grid gap-4 md:grid-cols-3">
        {["Components do not belong to themes.", "Themeable colours use semantic CSS variables.", "Old Intenda and Oryx routes redirect into the shared documentation tree."].map((item) => (
          <Card key={item} title={item}><p className="mt-2 text-sm leading-6 text-subtle">This keeps the documentation and implementation compact while preserving visual variety.</p></Card>
        ))}
      </section>
    </PageShell>
  );
}

function FoundationPage({ slug }: { slug: string }) {
  const { activeTheme } = useTheme();
  if (slug === "colours") return <ColoursPage theme={activeTheme} />;
  if (slug === "typography") return <TypographyPage />;
  const content: Record<string, string[]> = {
    spacing: ["Spacing follows a Tailwind-aligned 4px rhythm.", "Use compact gaps for enterprise forms, tables and dashboards.", "Use larger section spacing for documentation only."],
    radius: ["Shared default radius is 6px to 16px depending on component scale.", "Themes do not currently alter geometry.", "Cards and panels stay restrained; controls remain predictable."],
    shadows: ["Use soft elevation for raised cards and popovers.", "Theme shadow colour may vary through --shadow-soft and --shadow-raised.", "Avoid heavy decorative shadows in dense product screens."],
    iconography: ["Use lucide icons for actions and status.", "Icons support labels and do not carry semantic meaning alone.", "Use 14-18px icons in dense controls."],
    accessibility: ["Every interactive component has visible focus states via --focus and --focus-ring.", "Status treatments include labels or icons.", "Contrast scores need source verification; do not invent APCA or WCAG numbers."],
  };
  return (
    <PageShell eyebrow="Foundations" title={labelFromSlug(slug)} description="Shared foundations define the baseline. Themes primarily alter colour tokens, not component anatomy.">
      <PreviewPanel title="Guidance">
        <ul className="guide-list">{(content[slug] ?? ["Documentation pending."]).map((item) => <li key={item}>{item}</li>)}</ul>
      </PreviewPanel>
    </PageShell>
  );
}

const typographyRows = [
  { use: "Page title", example: "Typography", size: "clamp(36px, 4vw, 68px)", line: "0.98", weight: "720", notes: "Use for foundation, component and pattern page H1s only." },
  { use: "Section heading", example: "Raw palette families", size: "20px", line: "1.35", weight: "650", notes: "Used for section-level headings and documentation panels." },
  { use: "Panel heading", example: "Guidance", size: "16px", line: "24px", weight: "600", notes: "Used inside cards, preview panels and compact dashboard cards." },
  { use: "Body paragraph", example: "Shared foundations define the baseline.", size: "18px", line: "32px", weight: "400", notes: "Used for page descriptions and longer introductory copy." },
  { use: "Body compact", example: "This keeps implementation compact.", size: "14px", line: "24px", weight: "400", notes: "Default text size for dense guidance, cards and table content." },
  { use: "Menu heading", example: "FOUNDATIONS", size: "12px", line: "16px", weight: "600", notes: "Uppercase with 0.08em letter spacing." },
  { use: "Menu option", example: "Colours", size: "14px", line: "20px", weight: "400", notes: "Active options keep the same size and switch to inverse text on primary fill." },
  { use: "Top bar product name", example: "Fraxses Design", size: "16px", line: "24px", weight: "600", notes: "Used beside the Fx mark in the application header." },
  { use: "Top bar search text", example: "Search components, tokens, patterns...", size: "14px", line: "20px", weight: "400", notes: "Search and utility controls use compact body sizing." },
  { use: "Input heading", example: "Serial number", size: "14px", line: "20px", weight: "400", notes: "Labels sit above fields with 6px bottom spacing." },
  { use: "Input box text", example: "JohnDoe", size: "14px", line: "20px", weight: "400", notes: "Inputs, selects, textareas and search fields inherit the shared form control scale." },
  { use: "Input helper text", example: "Username is available!", size: "14px", line: "20px", weight: "400", notes: "Helper text appears 6px below the field and uses the component tone." },
  { use: "Button label", example: "Continue", size: "14px", line: "20px", weight: "500", notes: "Medium buttons use 40px height; large buttons move to 16px text." },
  { use: "Badge label", example: "Success", size: "12px", line: "16px", weight: "500", notes: "Small badges use 11px text for tighter metadata chips." },
  { use: "Tab label", example: "Settings", size: "14px", line: "20px", weight: "400", notes: "Active state is communicated by colour and underline, not weight change." },
  { use: "Table heading", example: "Object", size: "14px", line: "20px", weight: "400", notes: "Table heads use subtle text colour to keep dense data calm." },
  { use: "Table primary cell", example: "Customer Profile", size: "14px", line: "20px", weight: "500", notes: "Primary identifying cells use medium weight." },
  { use: "Keyboard hint", example: "/", size: "11px", line: "16px", weight: "400", notes: "Use only for compact command hints in bordered kbd elements." },
];

function TypographyPage() {
  return (
    <PageShell eyebrow="Foundations" title="Typography" description="Shared type rules define how Fraxses reads in product screens: compact, smoothed, and consistent across all themes.">
      <PreviewPanel title="Global rules">
        <ul className="guide-list">
          <li>Font smoothing is enabled globally with antialiased WebKit rendering and grayscale macOS Firefox rendering.</li>
          <li>Primary font stack: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI and sans-serif fallbacks.</li>
          <li>Code font stack: JetBrains Mono, SFMono-Regular, Consolas and monospace fallbacks.</li>
          <li>The type scale is shared across themes; theme tokens may change colour, not text size or weight.</li>
        </ul>
      </PreviewPanel>

      <PreviewPanel title="Type specs by interface role">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-subtle">
              <tr>
                <th className="px-4 py-3 font-semibold">Use</th>
                <th className="px-4 py-3 font-semibold">Example</th>
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">Line height</th>
                <th className="px-4 py-3 font-semibold">Weight</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-elevated">
              {typographyRows.map((row) => (
                <tr key={row.use}>
                  <td className="px-4 py-3 font-medium text-ink">{row.use}</td>
                  <td className="px-4 py-3 text-ink">{row.example}</td>
                  <td className="px-4 py-3 font-mono text-xs text-subtle">{row.size}</td>
                  <td className="px-4 py-3 font-mono text-xs text-subtle">{row.line}</td>
                  <td className="px-4 py-3 font-mono text-xs text-subtle">{row.weight}</td>
                  <td className="px-4 py-3 text-subtle">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PreviewPanel>

      <PreviewPanel title="Live examples">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-elevated p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Foundations</p>
            <div className="mt-3 grid gap-1 text-sm">
              <span className="rounded-md bg-primary px-3 py-2 text-primary-ink">Colours</span>
              <span className="px-3 py-2 text-subtle">Typography</span>
              <span className="px-3 py-2 text-subtle">Spacing</span>
            </div>
          </div>
          <div className="grid gap-4">
            <TextInput label="Input heading" helper="Input helper text" defaultValue="Input box text" />
            <div className="flex flex-wrap gap-3">
              <Button>Button label</Button>
              <Badge tone="success" variant="soft">Badge label</Badge>
            </div>
            <Tabs items={["Overview", "Objects", "Settings", "History"]} />
          </div>
        </div>
      </PreviewPanel>

      <section className="grid gap-4 md:grid-cols-2">
        <Guidance title="Do" items={["Use the documented role sizes before creating a new text treatment.", "Keep menu labels compact and scannable.", "Use medium weight for interactive labels and important table cells."]} />
        <Guidance title="Don't" items={["Do not use theme colour changes to imply a different type hierarchy.", "Do not introduce viewport-scaled text outside the page title.", "Do not make active tabs or menu options larger than inactive options."]} />
      </section>
    </PageShell>
  );
}

function ColoursPage({ theme }: { theme: ThemeDefinition }) {
  return (
    <PageShell eyebrow="Foundations" title={`${theme.name} colours`} description="The colours page responds to the active theme and shows raw palette families, semantic mappings and usage examples.">
      <PreviewPanel title="Raw palette families">
        {theme.palettes.length ? <div className="space-y-8">{theme.palettes.map((family) => <PaletteScale key={`${family.name}-${family.role}`} family={family} />)}</div> : <p className="text-sm text-subtle">Needs source verification: this theme has semantic tokens but no final raw palette ramp in the current source.</p>}
      </PreviewPanel>
      <PreviewPanel title="Semantic mapping">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {semanticTokenNames.map((token) => <TokenSwatch key={token} label={`--${token}`} value={theme.tokens[token]} />)}
        </div>
      </PreviewPanel>
      <PreviewPanel title="Usage examples">
        <div className="grid gap-4 md:grid-cols-2">
          <Alert tone="primary" variant="solid" title="Primary solid alert" />
          <Alert tone="secondary" variant="soft" title="Secondary soft alert" />
          <Callout tone="primary" variant="surface" />
          <Card title="Chart colours"><BarChart /></Card>
        </div>
      </PreviewPanel>
    </PageShell>
  );
}

function PaletteScale({ family }: { family: PaletteFamily }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2"><h2 className="text-base">{family.name}</h2><Badge variant="soft">{family.role}</Badge></div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-6 xl:grid-cols-11">
        {Object.entries(family.shades).map(([shade, value]) => (
          <button key={shade} className="h-20 rounded-md p-3 text-left text-xs shadow-sm" style={{ background: value, color: Number(shade) >= 500 ? "#FFFFFF" : "#111111" }} onClick={() => navigator.clipboard?.writeText(value)}>
            <span className="block font-semibold">{shade}</span>
            <span className="mt-6 block font-mono">{value}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function TokenSwatch({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-border bg-elevated p-3"><div className="mb-3 h-10 rounded-md border border-border" style={{ background: value.startsWith("#") ? value : `rgb(${value})` }} /><p className="font-mono text-xs">{label}</p><p className="mt-1 font-mono text-xs text-subtle">{value}</p></div>;
}

function ComponentsOverviewPage() {
  return (
    <PageShell eyebrow="Components" title="Components" description="A browsable catalogue of shared Fraxses components. Each card opens the matching component documentation page.">
      <section>
        <h2 className="mb-2 text-base">Base components</h2>
        <p className="max-w-2xl text-base leading-7 text-subtle">Buttons, inputs, navigation, feedback and data display components for building compact Fraxses product screens.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {componentItems.map((slug) => (
          <Link key={slug} to={`/docs/components/${slug}`} className="fx-component-card block overflow-hidden rounded-xl border border-border bg-elevated p-1 transition">
            <div className="fx-component-card-preview grid h-20 place-items-center rounded-lg border border-border bg-surface p-3">
              <ComponentCardPreview slug={slug} />
            </div>
            <div className="px-3 py-3">
              <h2 className="text-sm font-semibold">{labelFromSlug(slug)}</h2>
              <p className="mt-1 text-xs text-subtle">Shared component documentation</p>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}

function ComponentCardPreview({ slug }: { slug: string }) {
  if (slug === "buttons") return <Button size="sm">Continue</Button>;
  if (slug === "badges") return <div className="flex gap-2"><Badge tone="success" variant="soft">Success</Badge><Badge tone="warning" variant="soft">Warning</Badge></div>;
  if (slug === "avatars") return <div className="flex gap-1"><Avatar size="sm">EV</Avatar><Avatar tone="secondary" size="sm">A</Avatar><Avatar tone="neutral" size="sm">B</Avatar></div>;
  if (slug === "alerts") return <Alert tone="success" variant="soft" title="Synced" />;
  if (slug === "callouts") return <div className="h-8 w-32 rounded-lg border border-border bg-elevated" />;
  if (slug === "form-controls") return <div className="flex items-center gap-4"><Checkbox label="" /><Radio label="" /><Switch /></div>;
  if (slug === "inputs" || slug === "selects" || slug === "textarea") return <div className="h-9 w-32 rounded-md border border-border bg-elevated" />;
  if (slug === "tabs") return <Tabs items={["One", "Two", "Three"]} />;
  if (slug === "progress") return <Progress value={65} />;
  if (slug === "links") return <span className="text-sm text-primary">View documentation</span>;
  if (slug === "cards") return <div className="h-12 w-28 rounded-lg border border-border bg-elevated shadow-soft" />;
  if (slug === "charts") return <div className="flex h-12 w-32 items-end justify-center gap-1">{[50, 80, 35, 65, 45].map((height, index) => <span key={index} className="w-3 rounded-t" style={{ height: `${height}%`, background: `var(--chart-${(index % 3) + 1})` }} />)}</div>;
  if (slug === "tables") return <div className="grid w-32 gap-1">{[0, 1, 2].map((row) => <span key={row} className="h-3 rounded bg-muted" />)}</div>;
  if (slug === "navigation") return <div className="grid w-32 gap-1">{[0, 1, 2].map((row) => <span key={row} className={row === 1 ? "h-3 rounded bg-muted" : "h-3 rounded"} />)}</div>;
  return <div className="grid h-10 w-24 place-items-center rounded-lg border border-dashed border-border text-xs text-subtle">{labelFromSlug(slug)}</div>;
}

const tooltipExamples = {
  default: `import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip";

export function DefaultTooltip() {
  return (
    <Tooltip title="This is a tooltip">
      <TooltipTrigger>
        <HelpCircle size={16} />
      </TooltipTrigger>
    </Tooltip>
  );
}`,
  arrow: `import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip";

export function TooltipWithArrow() {
  return (
    <Tooltip title="This is a tooltip" showArrow>
      <TooltipTrigger>
        <HelpCircle size={16} />
      </TooltipTrigger>
    </Tooltip>
  );
}`,
  supporting: `import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip";

export function TooltipWithSupportingText() {
  return (
    <Tooltip
      title="This is a tooltip"
      description="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
    >
      <TooltipTrigger>
        <HelpCircle size={16} />
      </TooltipTrigger>
    </Tooltip>
  );
}`,
};

const tooltipPageNavItems = [
  { id: "overview", label: "Overview" },
  { id: "usage", label: "Usage" },
  { id: "default-tooltip", label: "Default Tooltip" },
  { id: "with-arrow-tooltip", label: "With Arrow Tooltip" },
  { id: "with-supporting-text", label: "With Supporting Text" },
  { id: "properties", label: "Properties" },
];

function TooltipPage() {
  const [activeSection, setActiveSection] = useState(tooltipPageNavItems[0].id);

  useEffect(() => {
    const updateActiveSection = () => {
      let current = tooltipPageNavItems[0].id;
      for (const item of tooltipPageNavItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 170) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <article className="fx-tooltip-page mx-auto min-h-[calc(100vh-4rem)] px-6 py-10 lg:px-10">
      <div className="fx-tooltip-content">
        <div className="mb-9 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Components</p>
          <h1>Tooltips</h1>
          <p className="mt-4 text-lg leading-8 text-subtle">Contextual hints that explain controls, icons and short interface states without interrupting the workflow.</p>
        </div>

        <section id="overview" className="fx-doc-section fx-doc-section-first">
          <PreviewPanel title="Overview">
            <p className="text-sm leading-7 text-subtle">Tooltips provide brief, non-critical context on hover or focus. They should clarify a control or label, not carry information required to complete a task.</p>
          </PreviewPanel>
        </section>

        <section id="usage" className="fx-doc-section">
          <div className="grid gap-4 md:grid-cols-2">
            <Guidance title="Accessibility" items={["Trigger tooltips on both hover and keyboard focus.", "Keep tooltip text short and connect it to the trigger with accessible labelling.", "Do not hide required instructions or validation messages inside a tooltip."]} />
            <Guidance title="Usage guidance" items={["Use default tooltips for short labels and icon clarification.", "Use an arrow when the relationship to the trigger needs extra precision.", "Use supporting text only when one line cannot explain the control clearly."]} />
          </div>
        </section>

        <TooltipVariantSection
          id="default-tooltip"
          title="Default Tooltip"
          code={tooltipExamples.default}
          tooltip={<TooltipPreview />}
        />
        <TooltipVariantSection
          id="with-arrow-tooltip"
          title="With Arrow Tooltip"
          code={tooltipExamples.arrow}
          tooltip={<TooltipPreview arrow />}
        />
        <TooltipVariantSection
          id="with-supporting-text"
          title="With Supporting Text"
          description={<p className="max-w-3xl text-base leading-7 text-subtle">Use supporting text when you need to provide more context for the tooltip. The description appears below the tooltip title.</p>}
          code={tooltipExamples.supporting}
          tooltip={<TooltipPreview supporting />}
        />

        <section id="properties" className="fx-doc-section">
          <PreviewPanel title="Properties table">
            <TooltipPropertiesTable />
          </PreviewPanel>
        </section>
      </div>

      <aside className="fx-on-page-nav">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Menu size={15} /> On this page</div>
        <nav className="grid gap-2 border-l border-border pl-4 text-sm font-medium text-subtle">
          {tooltipPageNavItems.map((item) => (
            <a className={activeSection === item.id ? "is-active" : undefined} href={`#${item.id}`} key={item.id} onClick={() => setActiveSection(item.id)}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </article>
  );
}

function TooltipVariantSection({ id, title, description, code, tooltip }: { id: string; title: string; description?: ReactNode; code: string; tooltip: ReactNode }) {
  return (
    <section id={id} className="fx-doc-section">
      <TooltipExampleCard code={code} description={description} title={title}>{tooltip}</TooltipExampleCard>
    </section>
  );
}

function TooltipExampleCard({ title, description, code, children }: { title: string; description?: ReactNode; code: string; children: ReactNode }) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    let didCopy = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy) {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.setAttribute("readonly", "");
      textarea.style.left = "-9999px";
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      didCopy = document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (!didCopy) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base">{title}</h2>
        <div className="flex items-center gap-2 text-subtle">
          <button className="fx-copy-button" type="button" onClick={() => void copyCode()} aria-label={copied ? "Code copied" : "Copy code"}>
            <Copy size={15} />
            <span className={copied ? "fx-copy-tooltip is-visible" : "fx-copy-tooltip"} role="status">Copied</span>
          </button>
          <div className="inline-flex rounded-lg border border-border bg-elevated p-1 text-sm font-semibold">
            <button className={view === "preview" ? "fx-example-toggle is-active" : "fx-example-toggle"} type="button" onClick={() => setView("preview")}>Preview</button>
            <button className={view === "code" ? "fx-example-toggle is-active" : "fx-example-toggle"} type="button" onClick={() => setView("code")}>Code</button>
          </div>
        </div>
      </div>
      {description && <div className="mb-5">{description}</div>}
      <div className="fx-example-frame">
        {view === "preview" ? <div className="fx-tooltip-preview">{children}</div> : <CodePreview code={code} />}
      </div>
    </div>
  );
}

function CodePreview({ code }: { code: string }) {
  return (
    <pre className="fx-example-code" aria-label="Component source code">
      <code>
        {code.split("\n").map((line, index) => (
          <span className="fx-code-line" key={`${index}-${line}`}>
            <span className="fx-code-line-number">{index + 1}</span>
            <span className="fx-code-line-content">{highlightCodeLine(line)}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function highlightCodeLine(line: string) {
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|from|export|function|return|const|let|var)\b|<\/?[A-Za-z][A-Za-z0-9]*|[A-Za-z][A-Za-z0-9]*=)/g);
  return parts.map((part, index) => {
    if (!part) return null;
    if (/^["'`]/.test(part)) return <span className="fx-code-token-string" key={index}>{part}</span>;
    if (/^(import|from|export|function|return|const|let|var)$/.test(part)) return <span className="fx-code-token-keyword" key={index}>{part}</span>;
    if (/^<\/?[A-Za-z]/.test(part)) return <span className="fx-code-token-tag" key={index}>{part}</span>;
    if (/^[A-Za-z][A-Za-z0-9]*=$/.test(part)) return <span className="fx-code-token-attr" key={index}>{part.slice(0, -1)}<span className="fx-code-token-punctuation">=</span></span>;
    return <span key={index}>{part}</span>;
  });
}

function TooltipPreview({ arrow = false, supporting = false }: { arrow?: boolean; supporting?: boolean }) {
  return (
    <div className="fx-tooltip-trigger">
      <div className={supporting ? "fx-tooltip-bubble fx-tooltip-bubble-wide" : "fx-tooltip-bubble"} role="tooltip">
        <p className="font-semibold">This is a tooltip</p>
        {supporting && <p className="mt-2 leading-5 text-primary-ink/85">Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.</p>}
        {arrow && <span className="fx-tooltip-arrow" />}
      </div>
      <button className="fx-tooltip-icon-button" type="button" aria-label="Show tooltip">
        <HelpCircle size={16} />
      </button>
    </div>
  );
}

function TooltipPropertiesTable() {
  const rows = [
    ["title", "string", "Short tooltip heading or label."],
    ["description", "string", "Optional supporting text displayed below the title."],
    ["showArrow", "boolean", "Adds a directional arrow between tooltip and trigger."],
    ["placement", "top | right | bottom | left", "Preferred tooltip placement around the trigger."],
    ["delay", "number", "Optional delay before the tooltip appears."],
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-subtle"><tr><th className="px-4 py-3 font-semibold">Property</th><th className="px-4 py-3 font-semibold">Type</th><th className="px-4 py-3 font-semibold">Description</th></tr></thead>
        <tbody className="divide-y divide-border bg-elevated">{rows.map(([name, type, description]) => <tr key={name}><th className="px-4 py-3 font-mono text-xs">{name}</th><td className="px-4 py-3 font-mono text-xs text-subtle">{type}</td><td className="px-4 py-3 text-subtle">{description}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function ComponentPage({ slug }: { slug: string }) {
  if (slug === "tooltips") return <TooltipPage />;
  return <SharedComponentPage slug={slug} />;
}

const componentPageNavItems = [
  { id: "overview", label: "Overview" },
  { id: "usage", label: "Usage" },
  { id: "variants", label: "Variants and states" },
  { id: "properties", label: "Properties" },
  { id: "tokens", label: "Token references" },
];

const buttonPageNavItems = [
  { id: "overview", label: "Overview" },
  { id: "usage", label: "Usage" },
  { id: "primary-buttons", label: "Primary buttons" },
  { id: "prefix-buttons", label: "Prefix buttons" },
  { id: "suffix-buttons", label: "Suffix buttons" },
  { id: "tone-state-matrix", label: "Tone state matrix" },
  { id: "properties", label: "Properties" },
  { id: "tokens", label: "Token references" },
];

function SharedComponentPage({ slug }: { slug: string }) {
  const navItems = slug === "buttons" ? buttonPageNavItems : componentPageNavItems;
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  useEffect(() => {
    const updateActiveSection = () => {
      let current = navItems[0].id;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 170) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navItems]);

  const title = labelFromSlug(slug);

  return (
    <article className="fx-tooltip-page mx-auto min-h-[calc(100vh-4rem)] px-6 py-10 lg:px-10">
      <div className="fx-tooltip-content">
        <div className="mb-9 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Components</p>
          <h1>{title}</h1>
          <p className="mt-4 text-lg leading-8 text-subtle">A shared Fraxses component page. Anatomy, variants, states and code remain stable while the active theme changes the semantic tokens.</p>
        </div>

        <section id="overview" className="fx-doc-section fx-doc-section-first">
          <PreviewPanel title="Overview"><ComponentPreview slug={slug} /></PreviewPanel>
        </section>

        <section id="usage" className="fx-doc-section">
          <div className="grid gap-4 md:grid-cols-2">
            <Guidance title="Accessibility" items={["Use visible focus states.", "Pair colour with labels or icons.", "Keep disabled states readable and non-interactive."]} />
            <Guidance title="Usage guidance" items={["Use the shared component instead of theme-specific copies.", "Use semantic tones for meaning.", "Keep enterprise layouts compact and scannable."]} />
          </div>
          <div className="mt-4">
            <DoDont doItems={["Reference semantic tokens.", "Let the selected theme change colour treatment."]} dontItems={["Do not hard-code Forest or Oryx hex values in component JSX.", "Do not duplicate component docs by theme."]} />
          </div>
        </section>

        {slug === "buttons" ? <ButtonSections /> : (
          <section id="variants" className="fx-doc-section">
            <TooltipExampleCard code={componentExampleCode(slug)} title="Variants and states">
              <ComponentMatrix slug={slug} />
            </TooltipExampleCard>
          </section>
        )}

        <section id="properties" className="fx-doc-section">
          <PreviewPanel title="Properties table"><PropsTable /></PreviewPanel>
        </section>

        <section id="tokens" className="fx-doc-section">
          <PreviewPanel title="Token references">
            <ul className="guide-list">
              <li>--primary, --secondary, --neutral, --success, --warning, --error</li>
              <li>--surface, --surface-raised, --border, --focus-ring</li>
              <li>--chart-1 through --chart-5 for chart geometry.</li>
            </ul>
          </PreviewPanel>
        </section>
      </div>

      <aside className="fx-on-page-nav">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Menu size={15} /> On this page</div>
        <nav className="grid gap-2 border-l border-border pl-4 text-sm font-medium text-subtle">
          {navItems.map((item) => (
            <a className={activeSection === item.id ? "is-active" : undefined} href={`#${item.id}`} key={item.id} onClick={() => setActiveSection(item.id)}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </article>
  );
}

function componentExampleCode(slug: string) {
  const componentName = labelFromSlug(slug).replace(/\s+/g, "");
  const examples: Record<string, string> = {
    buttons: `<Button tone="primary" variant="solid">Continue</Button>
<Button tone="secondary" variant="soft">Continue</Button>
<Button tone="neutral" variant="outline">Continue</Button>
<Button tone="primary" variant="solid" prefixIcon={<Plus size={16} />}>Continue</Button>
<Button tone="primary" variant="solid">Continue</Button>`,
    badges: `<Badge tone="success" variant="solid">Success</Badge>
<Badge tone="warning" variant="soft">Warning</Badge>
<Badge tone="error" variant="outline">Error</Badge>`,
    alerts: `<Alert tone="success" variant="soft" title="Products imported" />
<Alert tone="warning" variant="soft" title="Connection unstable" />
<Alert tone="error" variant="soft" title="Failed to login" />`,
    callouts: `<Callout tone="primary" variant="solid" />
<Callout tone="secondary" variant="soft" />
<Callout tone="neutral" variant="outline" />`,
    inputs: `<TextInput tone="primary" label="Serial number" />
<TextInput tone="success" helper="Username is available!" />
<TextInput tone="error" helper="Email address is invalid" />`,
    tabs: `<Tabs items={["My account", "Orders", "Settings", "Notifications"]} />`,
    progress: `<Progress value={65} />
<Progress tone="secondary" soft value={65} />`,
    charts: `<Card title="Multi Bar Chart"><BarChart /></Card>
<Card title="Line Chart"><LineChart /></Card>
<Card title="Donut Chart"><DonutChart /></Card>`,
    tables: `<DataTable />`,
    navigation: `<DashboardPreview compact />`,
  };

  return examples[slug] ?? `<${componentName} />
// Use semantic tokens and shared component props for theme-aware rendering.`;
}

function ComponentPreview({ slug }: { slug: string }) {
  if (slug === "buttons") return <p className="max-w-3xl text-sm leading-7 text-subtle">Buttons allow users to take an action or make a change. Use them to initiate tasks, submit information, confirm decisions, or control the interface. Button labels should clearly describe the action and communicate what will happen when selected.</p>;
  if (slug === "badges") return <div className="flex flex-wrap gap-3">{(["primary", "secondary", "neutral", "success", "warning", "error"] as const).map((tone) => <Badge key={tone} tone={tone}>{labelFromSlug(tone)}</Badge>)}</div>;
  if (slug === "avatars") return <div className="flex flex-wrap gap-4"><Avatar /><Avatar>EV</Avatar><Avatar>icon</Avatar><Avatar tone="secondary" variant="soft-gradient">E</Avatar></div>;
  if (slug === "alerts") return <div className="grid gap-3"><Alert tone="primary" variant="solid" title="Update available" /><Alert tone="success" variant="soft" title="Products imported" /><Alert tone="error" variant="soft" title="Failed to login" /></div>;
  if (slug === "callouts") return <div className="grid gap-3"><Callout tone="primary" variant="solid" /><Callout tone="secondary" variant="soft" /><Callout tone="neutral" variant="outline" /></div>;
  if (slug === "form-controls") return <div className="grid gap-4"><div className="flex flex-wrap gap-8"><Checkbox /><Radio /><Switch /><Progress /></div><div className="flex flex-wrap gap-8"><Checkbox tone="secondary" /><Radio tone="secondary" /><Switch tone="secondary" /><Progress tone="secondary" soft /></div></div>;
  if (slug === "inputs") return <div className="grid max-w-md gap-4"><TextInput tone="primary" /><TextInput tone="secondary" /><TextInput tone="success" helper="Username is available!" /><TextInput tone="error" helper="Email address is invalid" /></div>;
  if (slug === "selects") return <Select><option>Connected source</option><option>Data object</option></Select>;
  if (slug === "textarea") return <Textarea placeholder="Describe the data source..." />;
  if (slug === "tabs") return <Tabs />;
  if (slug === "progress") return <div className="grid gap-4"><Progress /><Progress soft /><Progress tone="secondary" /><Progress tone="secondary" soft /></div>;
  if (slug === "links") return <p className="max-w-xl leading-7 text-subtle">Inline links use <a className="text-primary underline-offset-4 hover:underline" href="/docs/components/links">theme-aware colour</a> and stay readable inside continuous text.</p>;
  if (slug === "cards") return <div className="grid gap-4 md:grid-cols-3"><Card title="Expenses"><p className="mt-2 text-2xl font-semibold">$12,543</p></Card><Card title="Orders"><BarChart /></Card><Card title="Expenses"><DonutChart /></Card></div>;
  if (slug === "charts") return <div className="grid gap-4 md:grid-cols-2"><Card title="Multi Bar Chart"><BarChart /></Card><Card title="Line Chart"><LineChart /></Card><Card title="Donut Chart"><DonutChart /></Card><Card title="Stacked Bar Chart"><BarChart stacked /></Card></div>;
  if (slug === "tables") return <DataTable />;
  if (slug === "navigation") return <DashboardPreview compact />;
  return <div className="grid gap-3 md:grid-cols-2"><Card title={labelFromSlug(slug)}><p className="mt-2 text-sm text-subtle">Shared documentation shell with live theme tokens. Needs deeper source examples where the reference did not define exact behaviour.</p></Card><Alert tone="neutral" variant="soft" title="Needs source verification" body="Component-specific motion and edge-case states are pending." /></div>;
}

function ComponentMatrix({ slug }: { slug: string }) {
  if (slug === "buttons") return <ButtonMatrix />;
  if (slug === "badges") return <div className="grid gap-3">{(["solid", "soft", "surface", "outline"] as const).map((variant) => <div key={variant} className="flex flex-wrap gap-4"><span className="w-20 text-sm text-subtle">{variant}</span>{(["primary", "secondary", "neutral", "success", "warning", "error"] as const).map((tone) => <Badge key={tone} tone={tone} variant={variant}>{tone}</Badge>)}</div>)}</div>;
  return <ComponentPreview slug={slug} />;
}

function ButtonSections() {
  return (
    <>
      <section id="primary-buttons" className="fx-doc-section">
      <TooltipExampleCard code={`<Button tone="primary" size="xs" suffixIcon={false}>Button xs</Button>
<Button tone="primary" size="sm" suffixIcon={false}>Button sm</Button>
<Button tone="primary" size="md" suffixIcon={false}>Button md</Button>
<Button tone="primary" size="lg" suffixIcon={false}>Button lg</Button>
<Button tone="primary" size="xl" suffixIcon={false}>Button xl</Button>`} title="Primary buttons">
        <div className="fx-button-example-preview">
          <Button tone="primary" size="xs" suffixIcon={false}>Button xs</Button>
          <Button tone="primary" size="sm" suffixIcon={false}>Button sm</Button>
          <Button tone="primary" size="md" suffixIcon={false}>Button md</Button>
          <Button tone="primary" size="lg" suffixIcon={false}>Button lg</Button>
          <Button tone="primary" size="xl" suffixIcon={false}>Button xl</Button>
        </div>
      </TooltipExampleCard>
      </section>

      <section id="prefix-buttons" className="fx-doc-section">
      <TooltipExampleCard code={`import { Plus } from "lucide-react";

<Button tone="primary" size="xs" prefixIcon={<Plus size={14} />} suffixIcon={false}>Button xs</Button>
<Button tone="primary" size="sm" prefixIcon={<Plus size={14} />} suffixIcon={false}>Button sm</Button>
<Button tone="primary" size="md" prefixIcon={<Plus size={16} />} suffixIcon={false}>Button md</Button>
<Button tone="primary" size="lg" prefixIcon={<Plus size={16} />} suffixIcon={false}>Button lg</Button>
<Button tone="primary" size="xl" prefixIcon={<Plus size={18} />} suffixIcon={false}>Button xl</Button>`} title="Prefix buttons">
        <div className="fx-button-example-preview">
          <Button tone="primary" size="xs" prefixIcon={<Plus size={14} />} suffixIcon={false}>Button xs</Button>
          <Button tone="primary" size="sm" prefixIcon={<Plus size={14} />} suffixIcon={false}>Button sm</Button>
          <Button tone="primary" size="md" prefixIcon={<Plus size={16} />} suffixIcon={false}>Button md</Button>
          <Button tone="primary" size="lg" prefixIcon={<Plus size={16} />} suffixIcon={false}>Button lg</Button>
          <Button tone="primary" size="xl" prefixIcon={<Plus size={18} />} suffixIcon={false}>Button xl</Button>
        </div>
      </TooltipExampleCard>
      </section>

      <section id="suffix-buttons" className="fx-doc-section">
      <TooltipExampleCard code={`import { ArrowRight } from "lucide-react";

<Button tone="primary" size="xs" suffixIcon={<ArrowRight size={14} />}>Button xs</Button>
<Button tone="primary" size="sm" suffixIcon={<ArrowRight size={14} />}>Button sm</Button>
<Button tone="primary" size="md" suffixIcon={<ArrowRight size={16} />}>Button md</Button>
<Button tone="primary" size="lg" suffixIcon={<ArrowRight size={16} />}>Button lg</Button>
<Button tone="primary" size="xl" suffixIcon={<ArrowRight size={18} />}>Button xl</Button>`} title="Suffix buttons">
        <div className="fx-button-example-preview">
          <Button tone="primary" size="xs" suffixIcon={<ArrowRight size={14} />}>Button xs</Button>
          <Button tone="primary" size="sm" suffixIcon={<ArrowRight size={14} />}>Button sm</Button>
          <Button tone="primary" size="md" suffixIcon={<ArrowRight size={16} />}>Button md</Button>
          <Button tone="primary" size="lg" suffixIcon={<ArrowRight size={16} />}>Button lg</Button>
          <Button tone="primary" size="xl" suffixIcon={<ArrowRight size={18} />}>Button xl</Button>
        </div>
      </TooltipExampleCard>
      </section>

      <section id="tone-state-matrix" className="fx-doc-section">
        <h2 className="mb-5 text-base">Tone state matrix</h2>
        <div className="fx-example-frame fx-button-matrix-frame">
          <ButtonMatrix />
        </div>
      </section>
    </>
  );
}

function ButtonMatrix() {
  const variants = ["modern", "classic", "solid", "soft", "surface", "outline"] as const;
  const states = ["Default", "Hover", "Active", "Disabled"] as const;
  const toneGroups = ["primary", "secondary", "neutral", "success", "warning", "error"] as const;
  return (
    <div className="grid gap-10">
      {toneGroups.map((tone) => (
        <section className="grid gap-4" key={tone}>
          <h3 className="text-base font-semibold capitalize">{tone}</h3>
          <div className="fx-button-state-grid">
            <span />
            {states.map((state) => <span className="text-center text-sm text-subtle" key={state}>{state}</span>)}
            {variants.map((variant) => (
              <ButtonMatrixRow key={`${tone}-${variant}`} tone={tone} variant={variant} />
            ))}
          </div>
        </section>
      ))}

    </div>
  );
}

function ButtonMatrixRow({ tone, variant }: { tone: Tone; variant: Variant }) {
  return (
    <>
      <span className="flex h-10 items-center text-sm capitalize text-subtle">{variant}</span>
      <Button tone={tone} variant={variant}>Continue</Button>
      <Button tone={tone} variant={variant} className="fx-button-demo-hover">Continue</Button>
      <Button tone={tone} variant={variant} className="fx-button-demo-active">Continue</Button>
      <Button tone={tone} variant={variant} disabled>Continue</Button>
    </>
  );
}

function PropsTable() {
  return <div className="overflow-hidden rounded-lg border border-border"><table className="w-full text-left text-sm"><tbody className="divide-y divide-border">{["tone", "variant", "size", "disabled", "loading", "prefixIcon", "suffixIcon", "children"].map((prop) => <tr key={prop}><th className="w-40 bg-surface px-4 py-3 font-mono">{prop}</th><td className="px-4 py-3 text-subtle">Shared prop used by the component family where applicable.</td></tr>)}</tbody></table></div>;
}

function PatternPage({ slug }: { slug: string }) {
  return (
    <PageShell eyebrow="Patterns" title={labelFromSlug(slug)} description="Patterns are shared implementations for Fraxses product workflows. The active theme changes the visual treatment only.">
      <PreviewPanel title="Pattern preview">{slug === "dashboard" ? <DashboardPreview /> : slug === "forms" ? <FormPattern /> : slug === "settings" ? <SettingsPattern /> : slug === "feedback" ? <FeedbackPattern /> : <GenericPattern slug={slug} />}</PreviewPanel>
      <Guidance title="Pattern guidance" items={["Use shared components and semantic tokens.", "Adapt copy to Fraxses data workflows.", "Do not copy Forward branding or ecommerce content from references."]} />
    </PageShell>
  );
}

function ThemeSummaryPage({ theme }: { theme: ThemeDefinition }) {
  return (
    <PageShell eyebrow="Theme" title={theme.name} description={theme.description}>
      <PreviewPanel title="Intent"><p className="text-sm leading-7 text-subtle">{theme.intent}</p></PreviewPanel>
      <ColoursPage theme={theme} />
    </PageShell>
  );
}

function PreviewPanel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-2xl border border-border bg-surface p-5 shadow-soft"><h2 className="mb-4 text-base">{title}</h2>{children}</section>;
}

function Guidance({ title, items }: { title: string; items: string[] }) {
  return <section className="rounded-2xl border border-border bg-elevated p-5"><h2 className="text-base">{title}</h2><ul className="guide-list mt-3">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function DashboardPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-4 ${compact ? "" : "xl:grid-cols-[220px_1fr]"}`}>
      <div className="rounded-xl border border-border bg-elevated p-4">
        <p className="font-semibold">Fraxses</p>
        <div className="mt-4 grid gap-2 text-sm text-subtle">
          <span>Connected Sources</span>
          <span className="rounded bg-muted px-2 py-1 text-ink">Data Objects</span>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Recent Objects</h2>
          <Button>Create</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Sources"><p className="mt-2 text-2xl font-semibold">42</p></Card>
          <Card title="Objects"><p className="mt-2 text-2xl font-semibold">632</p></Card>
        </div>
        <Card title="Query Activity"><LineChart /></Card>
        <div className="rounded-2xl border border-border bg-elevated p-4"><SearchInput /><DataTable /></div>
      </div>
    </div>
  );
}

function DataTable() {
  return <table className="mt-5 w-full text-left text-sm"><thead className="text-subtle"><tr><th className="py-3">Object</th><th>Status</th><th>Owner</th></tr></thead><tbody className="divide-y divide-border">{["Customer Profile", "Invoice Fact", "Source Health"].map((item, index) => <tr key={item}><td className="py-3 font-medium">{item}</td><td><Badge tone={index === 2 ? "warning" : "success"} variant="soft">{index === 2 ? "Review" : "Synced"}</Badge></td><td className="text-subtle">Data team</td></tr>)}</tbody></table>;
}

function FormPattern() {
  return <div className="grid max-w-2xl gap-4"><TextInput label="Source name" /><Select label="Source type"><option>Postgres</option></Select><Textarea label="Description" /><div className="flex gap-3"><Button>Save source</Button><Button variant="outline">Cancel</Button></div></div>;
}

function SettingsPattern() {
  return <div className="grid gap-4"><Card title="Compute environment"><div className="mt-4 grid gap-3"><Checkbox label="Enable cache warming" /><div className="flex items-center justify-between border-t border-divider pt-3"><span>Wallpaper tinting</span><Switch /></div></div></Card><Card title="Number of workers"><div className="mt-3 flex gap-2"><Button iconOnly>-</Button><span className="grid h-10 w-12 place-items-center rounded border border-border">8</span><Button iconOnly>+</Button></div></Card></div>;
}

function FeedbackPattern() {
  return <div className="grid gap-4"><Alert tone="success" variant="soft" title="Data source connected" /><Callout tone="primary" variant="surface" /><Alert tone="error" variant="soft" title="Validation failed" body="Add a source owner before publishing." /></div>;
}

function GenericPattern({ slug }: { slug: string }) {
  return <div className="grid gap-4 md:grid-cols-2"><Card title={labelFromSlug(slug)}><p className="mt-2 text-sm text-subtle">Shared Fraxses pattern documentation using the active theme.</p></Card><ComponentPreview slug={slug === "empty-states" ? "empty-states" : "cards"} /></div>;
}
