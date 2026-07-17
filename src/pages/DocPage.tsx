import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import HelpCircle from "lucide-react/dist/esm/icons/help-circle.js";
import Menu from "lucide-react/dist/esm/icons/menu.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Sankey,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
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
import { getTheme, semanticTokenNames, type PaletteFamily, type ThemeDefinition } from "../themes/themeRegistry";
import { useTheme } from "../components/theme/themeContext";

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

type ComponentVariantExample = {
  id: string;
  label: string;
  description?: ReactNode;
  code: string;
  preview: ReactNode;
};

const componentDescriptions: Record<string, string> = {
  badges: "Badges mark compact status, category, or metadata labels without interrupting the surrounding workflow.",
  avatars: "Avatars represent people, teams, or entities in compact identity surfaces.",
  alerts: "Alerts communicate immediate system feedback such as success, warning, or error outcomes.",
  callouts: "Callouts draw attention to contextual messages and optional actions inside a page.",
  "form-controls": "Form controls let users make binary, single-choice, and ranged selections.",
  inputs: "Inputs collect short text values with helper and validation feedback.",
  selects: "Selects let users choose one option from a constrained list.",
  textarea: "Textarea fields collect longer free-form text while preserving the form rhythm.",
  tabs: "Tabs switch between related views within the same context.",
  progress: "Progress indicators show completion or capacity without requiring exact interaction.",
  links: "Links navigate users to related content while remaining readable inside continuous text.",
  cards: "Cards group related content, metrics, charts, or actions into scannable blocks.",
  "empty-states": "Empty states explain why a surface has no content and guide the next useful action.",
  charts: "Charts visualize trends, comparisons, and composition with theme-aware data colours.",
  tables: "Tables organize structured records for scanning, comparison, and repeated action.",
  navigation: "Navigation helps users move through product sections while preserving orientation.",
  modals: "Modals interrupt the current flow for focused confirmation, creation, or destructive decisions.",
  toasts: "Toasts provide brief, non-blocking feedback after a user or system action.",
  popovers: "Popovers expose lightweight contextual controls without leaving the current page.",
  dropdowns: "Dropdowns present compact action or option menus from a trigger.",
};

function componentOverviewCopy(slug: string) {
  const title = labelFromSlug(slug).toLowerCase();
  const description = componentDescriptions[slug] ?? `${labelFromSlug(slug)} support shared Fraxses product workflows.`;
  return `${description} Use ${title} when the information belongs inline with the current task; choose a fuller page pattern when users need comparison, editing space, or persistent context.`;
}

function componentUsageItems(slug: string) {
  const shared = ["Use shared components so Forest, Oryx, Midnight, and Ocean inherit the same anatomy.", "Use semantic tones for meaning rather than palette-specific colour names.", "Keep labels short, direct, and useful in compact enterprise layouts."];
  const bySlug: Record<string, string[]> = {
    alerts: ["Use alerts near the area affected by the message.", "Reserve error and warning tones for conditions that need attention.", "Do not rely on colour alone; pair status with text and icons."],
    inputs: ["Place helper text directly below the field.", "Use success and error feedback only after user input or validation.", "Keep placeholder text supplemental, not the only label."],
    modals: ["Use modals for focused decisions that should block the current task.", "Keep actions explicit and provide a safe dismissal path.", "Return focus to the triggering control after close. Needs source verification in the implementation."],
    toasts: ["Use toasts for temporary feedback that does not require a decision.", "Do not use toasts for critical errors that must remain visible.", "Keep messages concise and avoid stacking excessive notifications."],
    popovers: ["Use popovers for contextual controls that are useful but not primary.", "Close popovers on escape and outside click. Needs source verification in the implementation.", "Do not hide required form steps inside a transient popover."],
    dropdowns: ["Use dropdowns for compact action sets.", "Keep options scannable and avoid deeply nested menus.", "Support keyboard navigation. Needs source verification in the implementation."],
  };
  return bySlug[slug] ?? shared;
}

function componentDoDont(slug: string) {
  const title = labelFromSlug(slug).toLowerCase();
  return {
    doItems: [`Use ${title} for its documented purpose.`, "Keep live examples theme-aware through semantic tokens."],
    dontItems: ["Do not hard-code Forest or Oryx hex values in shared component JSX.", "Do not duplicate the documentation by theme."],
  };
}

function componentTokenItems(slug: string) {
  if (slug === "charts") return ["--chart-1 through --chart-5", "--surface-raised", "--border", "--foreground"];
  if (["alerts", "badges", "callouts", "inputs", "form-controls", "progress"].includes(slug)) return ["--primary, --secondary, --neutral, --success, --warning, --error", "--*-subtle, --*-border, --*-foreground", "--focus-ring"];
  if (["cards", "modals", "popovers", "dropdowns", "tables", "navigation"].includes(slug)) return ["--surface", "--surface-raised", "--surface-hover", "--border", "--shadow-soft"];
  return ["--foreground", "--foreground-subtle", "--border", "--focus-ring"];
}

type ChartType = "metric-basic" | "metric-change" | "metric-spark" | "metric-area" | "metric-bar" | "bar" | "multi-bar" | "stacked-bar" | "line" | "sparkline" | "area" | "pie" | "donut" | "scatter" | "gauge" | "radar" | "heatmap" | "funnel" | "sankey";

const chartSeries = [
  { name: "Jan", mobile: 420, desktop: 280, api: 180, active: 600, previous: 410 },
  { name: "Feb", mobile: 520, desktop: 330, api: 210, active: 620, previous: 405 },
  { name: "Mar", mobile: 390, desktop: 285, api: 160, active: 625, previous: 400 },
  { name: "Apr", mobile: 610, desktop: 360, api: 285, active: 650, previous: 410 },
  { name: "May", mobile: 370, desktop: 260, api: 125, active: 590, previous: 320 },
  { name: "Jun", mobile: 640, desktop: 390, api: 250, active: 645, previous: 430 },
  { name: "Jul", mobile: 470, desktop: 320, api: 140, active: 620, previous: 395 },
  { name: "Aug", mobile: 680, desktop: 420, api: 300, active: 750, previous: 540 },
  { name: "Sep", mobile: 720, desktop: 450, api: 330, active: 780, previous: 505 },
  { name: "Oct", mobile: 560, desktop: 380, api: 240, active: 750, previous: 460 },
  { name: "Nov", mobile: 630, desktop: 410, api: 280, active: 780, previous: 480 },
  { name: "Dec", mobile: 710, desktop: 470, api: 350, active: 820, previous: 500 },
];

const barChartData = chartSeries.slice(0, 8).map(({ name, mobile }) => ({ name, value: mobile }));

const chartSegments = [
  { name: "Mobile", value: 145 },
  { name: "Desktop", value: 92 },
  { name: "API", value: 58 },
];

const scatterData = chartSeries.map((item, index) => ({ x: item.mobile, y: item.desktop, z: index + 3, name: item.name }));
const radarData = ["Reliability", "Latency", "Coverage", "Freshness", "Cost", "Quality"].map((name, index) => ({ name, current: [86, 74, 92, 68, 78, 88][index], target: 80 }));
const funnelData = [
  { name: "Sources", value: 520, fill: "var(--chart-1)" },
  { name: "Validated", value: 410, fill: "var(--chart-2)" },
  { name: "Published", value: 260, fill: "var(--chart-3)" },
  { name: "Used", value: 160, fill: "var(--chart-4)" },
];
const heatmapRows = ["Sources", "Objects", "Queries", "Jobs"];
const heatmapColumns = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number | string; color?: string; payload?: { name?: string } }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-elevated px-4 py-3 text-sm shadow-raised">
      <p className="mb-2 font-medium">{label ?? payload[0]?.payload?.name ?? "Value"}</p>
      <div className="grid gap-1.5">
        {payload.map((item) => (
          <div className="flex items-center gap-2" key={`${item.name}-${item.value}`}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color ?? "var(--chart-1)" }} />
            <span>{item.name}</span>
            <span className="ml-4 font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartFrame({ type }: { type: ChartType }) {
  const grid = <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={type !== "area"} />;
  const axis = { tick: { fill: "var(--foreground-subtle)", fontSize: 12 }, axisLine: { stroke: "var(--border)" }, tickLine: false };
  const colours = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

  if (type === "metric-basic" || type === "metric-change" || type === "metric-spark" || type === "metric-area" || type === "metric-bar") {
    return <MetricCardPreview type={type} />;
  }

  if (type === "bar") {
    return <BarChartPreview />;
  }

  if (type === "multi-bar" || type === "stacked-bar") {
    return <BarChartPreview mode={type} />;
  }

  if (type === "line" || type === "area" || type === "sparkline") {
    return <LineChartPreview mode={type} />;
  }

  if (type === "pie" || type === "donut") {
    return <PieChartPreview mode={type} />;
  }

  if (type === "scatter") {
    return <ScatterChartPreview />;
  }

  if (type === "gauge") {
    return <GaugeChartPreview />;
  }

  if (type === "radar") {
    return <RadarChartPreview />;
  }

  if (type === "heatmap") {
    return <HeatmapChartPreview />;
  }

  if (type === "funnel") {
    return <FunnelChartPreview />;
  }

  if (type === "sankey") {
    return <SankeyChartPreview />;
  }

  if (type === "sparkline") {
    return <div className="h-32 w-full"><ResponsiveContainer width="100%" height="100%"><RechartsLineChart data={chartSeries}><Tooltip content={<ChartTooltip />} /><Line dataKey="active" type="monotone" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} /></RechartsLineChart></ResponsiveContainer></div>;
  }

  if (type === "pie" || type === "donut") {
    return (
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip />} />
            <Pie data={chartSegments} dataKey="value" nameKey="name" innerRadius={type === "donut" ? 82 : 0} outerRadius={116} paddingAngle={type === "donut" ? 3 : 1}>
              {chartSegments.map((entry, index) => <Cell fill={colours[index]} key={entry.name} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "gauge") {
    return (
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="70%" innerRadius="72%" outerRadius="100%" barSize={18} data={[{ name: "Health", value: 76, fill: "var(--chart-1)" }]} startAngle={180} endAngle={0}>
            <RadialBar dataKey="value" cornerRadius={999} background={{ fill: "var(--surface-active)" }} />
            <text x="50%" y="64%" textAnchor="middle" fill="var(--foreground)" className="text-3xl font-semibold">76%</text>
            <text x="50%" y="76%" textAnchor="middle" fill="var(--foreground-subtle)" className="text-sm">source health</text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "radar") {
    return <div className="h-80 w-full"><ResponsiveContainer width="100%" height="100%"><RadarChart data={radarData}><PolarGrid stroke="var(--border)" /><PolarAngleAxis dataKey="name" tick={{ fill: "var(--foreground-subtle)", fontSize: 12 }} /><PolarRadiusAxis tick={false} axisLine={false} /><Radar dataKey="target" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.16} /><Radar dataKey="current" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.28} /><Tooltip content={<ChartTooltip />} /></RadarChart></ResponsiveContainer></div>;
  }

  if (type === "funnel") {
    return <div className="h-80 w-full"><ResponsiveContainer width="100%" height="100%"><FunnelChart><Tooltip content={<ChartTooltip />} /><Funnel dataKey="value" data={funnelData} isAnimationActive><LabelList position="right" fill="var(--foreground)" stroke="none" dataKey="name" /></Funnel></FunnelChart></ResponsiveContainer></div>;
  }

  if (type === "sankey") {
    const data = { nodes: [{ name: "Sources" }, { name: "Objects" }, { name: "Queries" }, { name: "Dashboards" }, { name: "Jobs" }], links: [{ source: 0, target: 1, value: 180 }, { source: 1, target: 2, value: 110 }, { source: 1, target: 3, value: 70 }, { source: 0, target: 4, value: 40 }] };
    return <div className="h-80 w-full"><ResponsiveContainer width="100%" height="100%"><Sankey data={data} nodePadding={22} nodeWidth={14} link={{ stroke: "var(--chart-2)", strokeOpacity: 0.28 }} node={{ fill: "var(--chart-1)", stroke: "var(--surface-raised)" }}><Tooltip content={<ChartTooltip />} /></Sankey></ResponsiveContainer></div>;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <RechartsLineChart data={chartSeries}>{grid}<XAxis dataKey="name" {...axis} /><YAxis {...axis} /><Tooltip content={<ChartTooltip />} /><Line dataKey="active" type="monotone" stroke="var(--chart-1)" strokeWidth={2} dot={false} /><Line dataKey="previous" type="monotone" stroke="var(--chart-2)" strokeWidth={2} dot={false} /><Line dataKey="desktop" type="monotone" stroke="var(--chart-3)" strokeWidth={2} dot={false} /></RechartsLineChart>
        ) : type === "area" ? (
          <RechartsAreaChart data={chartSeries}>{grid}<defs><linearGradient id="chartAreaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.22} /><stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} /></linearGradient></defs><XAxis dataKey="name" {...axis} /><YAxis {...axis} /><Tooltip content={<ChartTooltip />} /><Area dataKey="active" type="monotone" stroke="var(--chart-1)" strokeWidth={2} fill="url(#chartAreaFill)" /><Area dataKey="previous" type="monotone" stroke="var(--chart-2)" strokeWidth={2} fill="transparent" /></RechartsAreaChart>
        ) : type === "scatter" ? (
          <ScatterChart>{grid}<XAxis dataKey="x" name="Mobile" {...axis} /><YAxis dataKey="y" name="Desktop" {...axis} /><ZAxis dataKey="z" range={[80, 280]} /><Tooltip content={<ChartTooltip />} /><Scatter data={scatterData} fill="var(--chart-1)" /></ScatterChart>
        ) : (
          <RechartsBarChart data={type === "bar" ? barChartData : chartSeries}>{grid}<XAxis dataKey="name" {...axis} /><YAxis {...axis} /><Tooltip content={<ChartTooltip />} />{type === "bar" && <Bar dataKey="value" name="Objects" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />}{type === "multi-bar" && <><Bar dataKey="mobile" fill="var(--chart-1)" radius={[4, 4, 0, 0]} /><Bar dataKey="desktop" fill="var(--chart-2)" radius={[4, 4, 0, 0]} /><Bar dataKey="api" fill="var(--chart-3)" radius={[4, 4, 0, 0]} /></>}{type === "stacked-bar" && <><Bar dataKey="mobile" stackId="a" fill="var(--chart-1)" /><Bar dataKey="desktop" stackId="a" fill="var(--chart-2)" /><Bar dataKey="api" stackId="a" fill="var(--chart-3)" radius={[4, 4, 0, 0]} /></>}</RechartsBarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function MetricCardPreview({ type }: { type: Extract<ChartType, "metric-basic" | "metric-change" | "metric-spark" | "metric-area" | "metric-bar"> }) {
  const showChange = type !== "metric-basic";
  const showSpark = type === "metric-spark";
  const showArea = type === "metric-area";
  const showBar = type === "metric-bar";
  const metricValues = [24, 32, 28, 44, 38, 52, 48, 61, 56, 68, 73, 78];
  const points = metricValues.map((value, index) => `${18 + index * 24},${58 - value * 0.46}`).join(" ");
  const areaPath = `M ${points.replaceAll(" ", " L ")} L 282 64 L 18 64 Z`;

  return (
    <div className="flex min-h-64 items-center justify-center p-4">
      <div className="w-full max-w-xs rounded-xl border border-border bg-elevated p-5 shadow-soft">
        <p className="text-sm font-medium text-subtle">Total Sources</p>
        <p className="mt-4 text-[36px] font-semibold leading-none tracking-normal text-ink">4</p>
        {showChange && (
          <p className="mt-2 text-sm font-medium text-success">
            +2 <span className="font-normal">this week</span>
          </p>
        )}
        {(showSpark || showArea || showBar) && (
          <div className="mt-2 h-14 overflow-hidden">
            {showBar ? (
              <svg className="h-full w-full" role="img" aria-label="Metric bar chart preview" viewBox="0 0 300 64">
                {metricValues.map((value, index) => (
                  <rect fill="var(--chart-1)" height={value * 0.5} key={index} rx="3" width="14" x={18 + index * 23} y={58 - value * 0.5} />
                ))}
              </svg>
            ) : (
              <svg className="h-full w-full" role="img" aria-label={showArea ? "Metric area chart preview" : "Metric sparkline preview"} viewBox="0 0 300 64">
                {showArea && <path d={areaPath} fill="var(--chart-1)" opacity="0.16" />}
                <polyline fill="none" points={points} stroke="var(--chart-1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BarChartPreview({ mode = "bar" }: { mode?: "bar" | "multi-bar" | "stacked-bar" }) {
  if (mode === "stacked-bar") return <StackedBarChartPreview />;

  const width = 920;
  const height = 320;
  const padding = { top: 18, right: 18, bottom: 38, left: 46 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = 800;
  const step = plotWidth / barChartData.length;
  const barWidth = mode === "multi-bar" ? 18 : 34;
  const ticks = [0, 200, 400, 600, 800];
  const series = chartSeries.slice(0, 8);
  const legend = [
    { label: "Mobile", colour: "var(--chart-1)" },
    { label: "Desktop", colour: "var(--chart-2)" },
    { label: "API", colour: "var(--chart-3)" },
  ];

  return (
    <div className="w-full">
      <svg className={mode === "multi-bar" ? "block h-96 w-full overflow-visible" : "block h-80 w-full overflow-visible"} role="img" aria-label={`${mode} chart showing object counts`} viewBox={`0 0 ${width} ${mode === "multi-bar" ? 360 : height}`}>
        {ticks.map((tick) => {
          const y = padding.top + plotHeight - (tick / maxValue) * plotHeight;
          return (
            <g key={tick}>
              <line stroke="var(--border)" strokeDasharray="4 4" x1={padding.left} x2={width - padding.right} y1={y} y2={y} />
              <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="end" x={padding.left - 12} y={y + 4}>{tick}</text>
            </g>
          );
        })}
        <line stroke="var(--border)" x1={padding.left} x2={width - padding.right} y1={padding.top + plotHeight} y2={padding.top + plotHeight} />
        {series.map((item, index) => {
          const x = padding.left + index * step + (step - (mode === "multi-bar" ? barWidth * 3 + 8 : barWidth)) / 2;
          const values = mode === "bar" ? [item.mobile] : [item.mobile, item.desktop, item.api];
          let stackedOffset = 0;
          return (
            <g key={item.name}>
              {values.map((value, valueIndex) => {
                const barHeight = (value / maxValue) * plotHeight;
                const y = padding.top + plotHeight - barHeight - stackedOffset;
                const rectX = mode === "multi-bar" ? x + valueIndex * (barWidth + 4) : x;
                if (mode === "stacked-bar") stackedOffset += barHeight;
                return <rect fill={`var(--chart-${valueIndex + 1})`} height={barHeight} key={`${item.name}-${valueIndex}`} rx="4" width={barWidth} x={rectX} y={y} />;
              })}
              <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="middle" x={x + barWidth / 2} y={height - 12}>{item.name}</text>
            </g>
          );
        })}
        {mode === "multi-bar" && <SvgLegend items={legend} startX={318} y={332} />}
      </svg>
    </div>
  );
}

function SvgLegend({ items, startX, y, gap = 120 }: { items: Array<{ label: string; colour: string }>; startX: number; y: number; gap?: number }) {
  return (
    <g transform={`translate(${startX} ${y})`}>
      {items.map((item, index) => (
        <g key={item.label} transform={`translate(${index * gap} 0)`}>
          <circle cx="0" cy="0" fill={item.colour} r="4" />
          <text fill="var(--foreground-subtle)" fontSize="12" x="12" y="4">{item.label}</text>
        </g>
      ))}
    </g>
  );
}

function StackedBarChartPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const width = 920;
  const height = 360;
  const padding = { top: 18, right: 18, bottom: 76, left: 46 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = 1200;
  const barWidth = 34;
  const series = chartSeries.slice(0, 8);
  const legend = [
    { key: "mobile", label: "Mobile", colour: "var(--chart-1)" },
    { key: "desktop", label: "Desktop", colour: "var(--chart-2)" },
    { key: "api", label: "API", colour: "var(--chart-3)" },
  ] as const;
  const step = plotWidth / series.length;
  const activeItem = hovered === null ? null : series[hovered];
  const legendWidth = 320;
  const legendStartX = padding.left + plotWidth / 2 - legendWidth / 2;

  return (
    <div className="relative w-full">
      <svg className="block h-96 w-full overflow-visible" role="img" aria-label="Stacked bar chart showing counts by month" viewBox={`0 0 ${width} ${height}`}>
        {[0, 300, 600, 900, 1200].map((tick) => {
          const y = padding.top + plotHeight - (tick / maxValue) * plotHeight;
          return (
            <g key={tick}>
              <line stroke="var(--border)" strokeDasharray="4 4" x1={padding.left} x2={width - padding.right} y1={y} y2={y} />
              <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="end" x={padding.left - 12} y={y + 4}>{tick}</text>
            </g>
          );
        })}
        <line stroke="var(--border)" x1={padding.left} x2={width - padding.right} y1={padding.top + plotHeight} y2={padding.top + plotHeight} />
        {series.map((item, index) => {
          const x = padding.left + index * step + (step - barWidth) / 2;
          const values = [item.mobile, item.desktop, item.api];
          let stackedOffset = 0;
          const total = values.reduce((sum, value) => sum + value, 0);
          const totalHeight = (total / maxValue) * plotHeight;
          const hitY = padding.top + plotHeight - totalHeight;
          return (
            <g key={item.name}>
              {values.map((value, valueIndex) => {
                const barHeight = (value / maxValue) * plotHeight;
                const y = padding.top + plotHeight - stackedOffset - barHeight;
                stackedOffset += barHeight;
                const isTop = valueIndex === values.length - 1;
                const fill = `var(--chart-${valueIndex + 1})`;
                return isTop
                  ? <path d={`M ${x} ${y + 4} Q ${x} ${y} ${x + 4} ${y} H ${x + barWidth - 4} Q ${x + barWidth} ${y} ${x + barWidth} ${y + 4} V ${y + barHeight} H ${x} Z`} fill={fill} key={`${item.name}-${valueIndex}`} />
                  : <rect fill={fill} height={barHeight} key={`${item.name}-${valueIndex}`} width={barWidth} x={x} y={y} />;
              })}
              <rect
                fill="transparent"
                height={totalHeight}
                onBlur={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                pointerEvents="all"
                tabIndex={0}
                width={barWidth}
                x={x}
                y={hitY}
              />
              <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="middle" x={x + barWidth / 2} y={padding.top + plotHeight + 20}>{item.name}</text>
              {hovered === index && <text fill="var(--foreground)" fontSize="12" fontWeight="700" textAnchor="middle" x={x + barWidth / 2} y={hitY - 10}>{total}</text>}
            </g>
          );
        })}
        <g transform={`translate(${legendStartX} ${height - 28})`}>
          {legend.map((item, index) => (
            <g key={item.key} transform={`translate(${index * 120} 0)`}>
              <circle cx="0" cy="0" fill={item.colour} r="4" />
              <text fill="var(--foreground-subtle)" fontSize="12" x="12" y="4">{item.label}</text>
            </g>
          ))}
        </g>
      </svg>
      {activeItem && (
        <div className="pointer-events-none absolute rounded-lg border border-border bg-elevated px-4 py-3 text-sm shadow-raised" style={{ left: `${((padding.left + hovered! * step + step / 2) / width) * 100}%`, top: "38px", transform: "translateX(-50%)" }}>
          <p className="mb-2 font-medium">{activeItem.name}</p>
          <div className="grid gap-1.5">
            {legend.map((item) => (
              <div className="flex items-center gap-2" key={item.key}>
                <span aria-hidden="true" className="shrink-0 rounded-full" style={{ background: item.colour, height: 9, width: 9 }} />
                <span>{item.label}</span>
                <span className="ml-4 font-medium">{activeItem[item.key]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function linePoints(values: number[], width = 920, height = 320, compact = false) {
  const padding = compact ? { top: 14, right: 16, bottom: 14, left: 16 } : { top: 18, right: 18, bottom: 38, left: 46 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = 900;
  return values.map((value, index) => {
    const x = padding.left + (index / (values.length - 1)) * plotWidth;
    const y = padding.top + plotHeight - (value / maxValue) * plotHeight;
    return `${x},${y}`;
  }).join(" ");
}

function LineChartPreview({ mode }: { mode: "line" | "area" | "sparkline" }) {
  const width = 920;
  const height = mode === "sparkline" ? 150 : 320;
  const viewHeight = mode === "line" ? 360 : height;
  const compact = mode === "sparkline";
  const active = chartSeries.map((item) => item.active);
  const previous = chartSeries.map((item) => item.previous);
  const desktop = chartSeries.map((item) => item.desktop);
  const activePoints = linePoints(active, width, height, compact);
  const areaPath = `M ${activePoints.replaceAll(" ", " L ")} L 902,282 L 46,282 Z`;

  return (
    <svg className={mode === "line" ? "block h-96 w-full" : compact ? "block h-36 w-full" : "block h-80 w-full"} role="img" aria-label={`${mode} chart preview`} viewBox={`0 0 ${width} ${viewHeight}`}>
      {!compact && [0, 225, 450, 675, 900].map((tick) => {
        const y = 18 + (264 - (tick / 900) * 264);
        return (
          <g key={tick}>
            <line stroke="var(--border)" strokeDasharray="4 4" x1="46" x2="902" y1={y} y2={y} />
            <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="end" x="34" y={y + 4}>{tick}</text>
          </g>
        );
      })}
      {mode === "area" && <path d={areaPath} fill="var(--chart-1)" opacity="0.14" />}
      <polyline fill="none" points={activePoints} stroke="var(--chart-1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      {mode === "line" && <polyline fill="none" points={linePoints(previous, width, height)} stroke="var(--chart-2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />}
      {mode === "line" && <polyline fill="none" points={linePoints(desktop, width, height)} stroke="var(--chart-3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />}
      {!compact && chartSeries.map((item, index) => <text fill="var(--foreground-subtle)" fontSize="12" key={item.name} textAnchor="middle" x={46 + (index / 11) * 856} y="308">{index % 2 === 0 ? item.name : ""}</text>)}
      {mode === "line" && <SvgLegend items={[{ label: "Active", colour: "var(--chart-1)" }, { label: "Previous", colour: "var(--chart-2)" }, { label: "Desktop", colour: "var(--chart-3)" }]} startX={312} y={340} />}
    </svg>
  );
}

function PieChartPreview({ mode }: { mode: "pie" | "donut" }) {
  const donut = mode === "donut";
  const [hovered, setHovered] = useState<number | null>(null);
  const total = chartSegments.reduce((sum, item) => sum + item.value, 0);
  let startAngle = -90;
  const slices = chartSegments.map((item, index) => {
    const angle = (item.value / total) * 360;
    const slice = {
      ...item,
      colour: `var(--chart-${index + 1})`,
      path: donut
        ? donutSlicePath(120, 120, 94, 58, startAngle, startAngle + angle)
        : pieSlicePath(120, 120, 96, startAngle, startAngle + angle),
    };
    startAngle += angle;
    return slice;
  });
  const activeSlice = hovered === null ? null : slices[hovered];

  return (
    <div className="relative grid h-80 place-items-center">
      <div className="grid place-items-center gap-3">
        <svg className="h-64 w-64 overflow-visible" role="img" aria-label={`${mode} chart preview`} viewBox="0 0 240 240">
          {slices.map((slice, index) => (
            <path
              aria-label={`${slice.name}: ${slice.value}`}
              className="cursor-pointer outline-none transition-opacity hover:opacity-80 focus:opacity-80"
              d={slice.path}
              fill={slice.colour}
              key={slice.name}
              onBlur={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              tabIndex={0}
            />
          ))}
          {donut && <circle cx="120" cy="120" fill="var(--surface-raised)" r="58" pointerEvents="none" />}
        </svg>
        <svg className="h-5 w-80" aria-hidden="true" viewBox="0 0 320 20">
          <SvgLegend items={slices.map((slice) => ({ label: slice.name, colour: slice.colour }))} startX={22} y={10} gap={100} />
        </svg>
      </div>
      {activeSlice && (
        <div className="pointer-events-none absolute right-[18%] top-1/2 rounded-lg border border-border bg-elevated px-4 py-3 text-sm shadow-raised">
          <p className="mb-2 font-medium">{activeSlice.name}</p>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeSlice.colour }} />
            <span>{activeSlice.name}</span>
            <span className="ml-4 font-medium">{activeSlice.value}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function polarPoint(cx: number, cy: number, radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function pieSlicePath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarPoint(cx, cy, radius, startAngle);
  const end = polarPoint(cx, cy, radius, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

function donutSlicePath(cx: number, cy: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number) {
  const outerStart = polarPoint(cx, cy, outerRadius, startAngle);
  const outerEnd = polarPoint(cx, cy, outerRadius, endAngle);
  const innerStart = polarPoint(cx, cy, innerRadius, startAngle);
  const innerEnd = polarPoint(cx, cy, innerRadius, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${outerStart.x} ${outerStart.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

function ScatterChartPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const xMin = 350;
  const xMax = 740;
  const yMin = 240;
  const yMax = 480;
  const plot = { left: 62, right: 902, top: 28, bottom: 268 };
  const xFor = (value: number) => plot.left + ((value - xMin) / (xMax - xMin)) * (plot.right - plot.left);
  const yFor = (value: number) => plot.bottom - ((value - yMin) / (yMax - yMin)) * (plot.bottom - plot.top);
  const activePoint = hovered === null ? null : scatterData[hovered];

  return (
    <div className="relative">
      <svg className="block h-80 w-full" role="img" aria-label="Scatter chart preview" viewBox="0 0 920 320">
        {[240, 300, 360, 420, 480].map((tick) => {
          const y = yFor(tick);
          return (
            <g key={tick}>
              <line stroke="var(--border)" strokeDasharray="4 4" x1={plot.left} x2={plot.right} y1={y} y2={y} />
              <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="end" x={plot.left - 12} y={y + 4}>{tick}</text>
            </g>
          );
        })}
        {[350, 450, 550, 650, 750].map((tick) => {
          const x = xFor(tick);
          return (
            <g key={tick}>
              <line stroke="var(--border)" strokeDasharray="4 4" x1={x} x2={x} y1={plot.top} y2={plot.bottom} />
              <text fill="var(--foreground-subtle)" fontSize="12" textAnchor="middle" x={x} y={plot.bottom + 20}>{tick}</text>
            </g>
          );
        })}
        <line stroke="var(--border)" x1={plot.left} x2={plot.right} y1={plot.bottom} y2={plot.bottom} />
        <line stroke="var(--border)" x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.bottom} />
        <text fill="var(--foreground-subtle)" fontSize="13" fontWeight="600" textAnchor="middle" x="482" y="314">Mobile events</text>
        <text fill="var(--foreground-subtle)" fontSize="13" fontWeight="600" textAnchor="middle" transform="rotate(-90 16 148)" x="16" y="148">Desktop events</text>
        {scatterData.map((item, index) => (
          <circle
            aria-label={`${item.name}: mobile ${item.x}, desktop ${item.y}`}
            className="cursor-pointer outline-none transition-opacity hover:opacity-100 focus:opacity-100"
            cx={xFor(item.x)}
            cy={yFor(item.y)}
            fill="var(--chart-1)"
            key={item.name}
            onBlur={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            opacity={hovered === null || hovered === index ? 0.82 : 0.36}
            r={item.z + 4}
            tabIndex={0}
          />
        ))}
      </svg>
      {activePoint && (
        <div className="pointer-events-none absolute rounded-lg border border-border bg-elevated px-4 py-3 text-sm shadow-raised" style={{ left: `${(xFor(activePoint.x) / 920) * 100}%`, top: `${Math.max(8, yFor(activePoint.y) - 72)}px`, transform: "translateX(-50%)" }}>
          <p className="mb-2 font-medium">{activePoint.name}</p>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-1)]" /><span>Mobile</span><span className="ml-4 font-medium">{activePoint.x}</span></div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-2)]" /><span>Desktop</span><span className="ml-4 font-medium">{activePoint.y}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function GaugeChartPreview() {
  return (
    <div className="grid min-h-48 place-items-center">
      <svg height="110" role="img" aria-label="Gauge chart preview" viewBox="0 0 180 110" width="180">
        <path d="M 28 82 A 62 62 0 0 1 152 82" fill="none" stroke="var(--surface-active)" strokeLinecap="round" strokeWidth="12" />
        <path d="M 28 82 A 62 62 0 0 1 133 39" fill="none" stroke="var(--chart-1)" strokeLinecap="round" strokeWidth="12" />
        <text fill="var(--foreground)" fontSize="24" fontWeight="700" textAnchor="middle" x="90" y="78">76%</text>
        <text fill="var(--foreground-subtle)" fontSize="11" textAnchor="middle" x="90" y="98">source health</text>
      </svg>
    </div>
  );
}

function RadarChartPreview() {
  const cx = 460;
  const cy = 160;
  const angles = radarData.map((_, index) => -90 + index * 60);
  const point = (value: number, angle: number) => `${cx + Math.cos(angle * Math.PI / 180) * value * 1.25},${cy + Math.sin(angle * Math.PI / 180) * value * 1.25}`;
  return <svg className="block h-80 w-full" role="img" aria-label="Radar chart preview" viewBox="0 0 920 320">{[35, 70, 105].map((r) => <polygon fill="none" key={r} points={angles.map((angle) => point(r / 1.25, angle)).join(" ")} stroke="var(--border)" />)}<polygon fill="var(--chart-1)" fillOpacity="0.22" points={radarData.map((item, index) => point(item.current, angles[index])).join(" ")} stroke="var(--chart-1)" strokeWidth="2" />{radarData.map((item, index) => <text fill="var(--foreground-subtle)" fontSize="12" key={item.name} textAnchor="middle" x={cx + Math.cos(angles[index] * Math.PI / 180) * 145} y={cy + Math.sin(angles[index] * Math.PI / 180) * 145}>{item.name}</text>)}</svg>;
}

function HeatmapChartPreview() {
  const values = [
    [12, 22, 31, 38, 45, 26, 16],
    [18, 29, 41, 50, 36, 24, 20],
    [9, 17, 28, 43, 56, 47, 32],
    [14, 23, 34, 40, 31, 19, 12],
  ];
  const heatmapColour = (value: number) => {
    if (value >= 46) return "var(--chart-1)";
    if (value >= 36) return "var(--chart-2)";
    if (value >= 26) return "var(--chart-3)";
    if (value >= 16) return "var(--chart-4)";
    return "var(--chart-5)";
  };

  return (
    <div className="grid h-80 place-items-center">
      <svg className="h-72 w-full max-w-3xl rounded-xl border border-border bg-surface shadow-soft" role="img" aria-label="Heatmap chart preview" viewBox="0 0 760 288">
        {heatmapColumns.map((column, index) => (
          <text fill="var(--foreground-subtle)" fontSize="12" fontWeight="600" key={column} textAnchor="middle" x={132 + index * 70} y="34">{column}</text>
        ))}
        {heatmapRows.map((row, rowIndex) => (
          <g key={row}>
            <text fill="var(--foreground-subtle)" fontSize="13" textAnchor="end" x="92" y={71 + rowIndex * 48}>{row}</text>
            {heatmapColumns.map((column, columnIndex) => {
              const value = values[rowIndex][columnIndex];
              const x = 108 + columnIndex * 70;
              const y = 48 + rowIndex * 48;
              return (
                <g key={`${row}-${column}`}>
                  <rect fill={heatmapColour(value)} height="38" rx="7" stroke="var(--border)" width="58" x={x} y={y} />
                  <text fill="var(--foreground)" fontSize="12" fontWeight="700" textAnchor="middle" x={x + 29} y={y + 24}>{value}</text>
                </g>
              );
            })}
          </g>
        ))}
        <g transform="translate(622 68)">
          <text fill="var(--foreground-subtle)" fontSize="12" fontWeight="600" x="0" y="-18">Intensity</text>
          <text fill="var(--foreground-subtle)" fontSize="12" x="28" y="10">High</text>
          <rect fill="var(--chart-1)" height="22" rx="5" width="22" x="0" y="-4" />
          <rect fill="var(--chart-2)" height="22" rx="5" width="22" x="0" y="28" />
          <rect fill="var(--chart-3)" height="22" rx="5" width="22" x="0" y="60" />
          <rect fill="var(--chart-4)" height="22" rx="5" width="22" x="0" y="92" />
          <rect fill="var(--chart-5)" height="22" rx="5" width="22" x="0" y="124" />
          <text fill="var(--foreground-subtle)" fontSize="12" x="28" y="142">Low</text>
        </g>
      </svg>
    </div>
  );
}

function FunnelChartPreview() {
  const widths = [620, 500, 380, 260, 160];
  const top = 36;
  const stageHeight = 48;
  const center = 410;
  return (
    <div className="grid h-80 place-items-center">
      <svg className="h-72 w-full max-w-3xl" role="img" aria-label="Funnel chart preview" viewBox="0 0 820 288">
        <line stroke="var(--border)" x1="100" x2="720" y1={top + stageHeight * funnelData.length + 16} y2={top + stageHeight * funnelData.length + 16} />
        <line stroke="var(--border)" x1="86" x2="86" y1={top} y2={top + stageHeight * funnelData.length} />
        <text fill="var(--foreground-subtle)" fontSize="13" fontWeight="600" textAnchor="middle" x="410" y="276">Stage progression</text>
        <text fill="var(--foreground-subtle)" fontSize="13" fontWeight="600" textAnchor="middle" transform="rotate(-90 22 140)" x="22" y="140">Volume</text>
        {funnelData.map((item, index) => {
          const currentWidth = widths[index];
          const nextWidth = widths[index + 1];
          const y1 = top + index * stageHeight;
          const y2 = y1 + stageHeight;
          const x1 = center - currentWidth / 2;
          const x2 = center + currentWidth / 2;
          const x3 = center + nextWidth / 2;
          const x4 = center - nextWidth / 2;
          return (
            <g key={item.name}>
              <path d={`M ${x1} ${y1} H ${x2} L ${x3} ${y2} H ${x4} Z`} fill={item.fill} opacity={1 - index * 0.08} />
              <text fill="var(--foreground)" fontSize="14" fontWeight="650" textAnchor="middle" x={center} y={y1 + 30}>{item.name} · {item.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function SankeyChartPreview() {
  const nodes: Array<[number, number, number, string, string]> = [
    [80, 88, 116, "Sources", "var(--chart-1)"],
    [385, 72, 92, "Objects", "var(--chart-2)"],
    [385, 190, 54, "Jobs", "var(--chart-3)"],
    [695, 58, 70, "Queries", "var(--chart-1)"],
    [695, 160, 58, "Dashboards", "var(--chart-4)"],
    [695, 240, 42, "Exports", "var(--chart-5)"],
  ];

  return (
    <svg className="block h-80 w-full" role="img" aria-label="Sankey chart preview" viewBox="0 0 920 320">
      <path d="M 104 112 C 225 112 250 94 385 94" fill="none" stroke="var(--chart-1)" strokeLinecap="round" strokeOpacity="0.26" strokeWidth="58" />
      <path d="M 104 170 C 230 170 255 218 385 218" fill="none" stroke="var(--chart-3)" strokeLinecap="round" strokeOpacity="0.24" strokeWidth="34" />
      <path d="M 409 98 C 540 98 565 88 695 88" fill="none" stroke="var(--chart-1)" strokeLinecap="round" strokeOpacity="0.24" strokeWidth="42" />
      <path d="M 409 126 C 540 126 565 188 695 188" fill="none" stroke="var(--chart-4)" strokeLinecap="round" strokeOpacity="0.22" strokeWidth="34" />
      <path d="M 409 218 C 540 218 565 260 695 260" fill="none" stroke="var(--chart-5)" strokeLinecap="round" strokeOpacity="0.22" strokeWidth="26" />
      {nodes.map(([x, y, h, label, fill]) => (
        <g key={label}>
          <rect fill={fill} height={h} rx="6" width="18" x={x} y={y} />
          <text fill="var(--foreground)" fontSize="13" fontWeight="650" x={x + 28} y={y + h / 2 + 4}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

function ChartExample({ type }: { type: ChartType }) {
  return <div className="w-full rounded-2xl border border-border bg-elevated p-6 shadow-soft"><ChartFrame type={type} /></div>;
}

function isMetricChartType(type: ChartType): type is Extract<ChartType, "metric-basic" | "metric-change" | "metric-spark" | "metric-area" | "metric-bar"> {
  return type === "metric-basic" || type === "metric-change" || type === "metric-spark" || type === "metric-area" || type === "metric-bar";
}

function barChartExampleCode() {
  return `import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", value: 420 },
  { name: "Feb", value: 560 },
  { name: "Mar", value: 380 },
  { name: "Apr", value: 640 },
  { name: "May", value: 410 },
  { name: "Jun", value: 670 },
  { name: "Jul", value: 520 },
  { name: "Aug", value: 720 },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-elevated px-4 py-3 text-sm shadow-raised">
      <p className="mb-2 font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-1)]" />
        <span>Value</span>
        <span className="ml-4 font-medium">{payload[0].value}</span>
      </div>
    </div>
  );
}

export function BarChartExample() {
  return (
    <div className="rounded-2xl border border-border bg-elevated p-6 shadow-soft">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "var(--border)" }}
              tick={{ fill: "var(--foreground-subtle)", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={{ stroke: "var(--border)" }}
              tick={{ fill: "var(--foreground-subtle)", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
            <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}`;
}

function chartExampleCode(type: ChartType) {
  if (type === "bar") return barChartExampleCode();
  if (type.startsWith("metric-")) {
    const chartType = type.replace("metric-", "");
    return `<MetricCard
  title="Revenue"
  value="$23,522"
  change={${chartType === "basic" ? "undefined" : '"12.4%"'}}
  direction="up"
  visual="${chartType}"
/>`;
  }

  const chartName = labelFromSlug(type);
  return `import { ResponsiveContainer } from "recharts";

export function ${chartName.replace(/\s+/g, "")}Example() {
  return (
    <div className="rounded-2xl border border-border bg-elevated p-6 shadow-soft">
      <ResponsiveContainer width="100%" height={320}>
        {/* Render the ${chartName.toLowerCase()} using Fraxses chart tokens:
            --chart-1, --chart-2, --chart-3, --border and --surface-raised. */}
      </ResponsiveContainer>
    </div>
  );
}`;
}

function componentVariants(slug: string): ComponentVariantExample[] {
  if (slug === "charts") {
    return ([
      ["metric-basic", "Metric Basic"],
      ["metric-change", "Metric Change"],
      ["metric-spark", "Metric Spark"],
      ["metric-area", "Metric Area"],
      ["metric-bar", "Metric Bar"],
      ["bar", "Bar Chart"],
      ["multi-bar", "Multi Bar Chart"],
      ["stacked-bar", "Stacked Bar Chart"],
      ["line", "Line Chart"],
      ["sparkline", "Sparkline"],
      ["area", "Area Chart"],
      ["pie", "Pie"],
      ["donut", "Donut"],
      ["scatter", "Scatter"],
      ["gauge", "Gauge"],
      ["radar", "Radar"],
      ["heatmap", "Heatmap"],
      ["funnel", "Funnel"],
      ["sankey", "Sankey"],
    ] as Array<[ChartType, string]>).map(([type, label]) => ({ id: type, label, code: chartExampleCode(type), preview: isMetricChartType(type) ? <MetricCardPreview type={type} /> : <ChartExample type={type} /> }));
  }

  const variants: Record<string, ComponentVariantExample[]> = {
    badges: [
      { id: "solid-badges", label: "Solid Badges", code: `<Badge tone="primary">Primary</Badge>
<Badge tone="secondary">Secondary</Badge>
<Badge tone="neutral">Neutral</Badge>
<Badge tone="success">Success</Badge>
<Badge tone="warning">Warning</Badge>
<Badge tone="error">Error</Badge>`, preview: <ComponentPreview slug="badges" /> },
      { id: "soft-and-outline-badges", label: "Soft And Outline Badges", code: `<Badge tone="success" variant="soft">Success</Badge>
<Badge tone="warning" variant="soft">Warning</Badge>
<Badge tone="error" variant="soft">Error</Badge>
<Badge tone="success" variant="outline">Success</Badge>
<Badge tone="warning" variant="outline">Warning</Badge>
<Badge tone="error" variant="outline">Error</Badge>`, preview: <ComponentMatrix slug="badges" /> },
    ],
    avatars: [
      { id: "avatar-content", label: "Avatar Content", code: `<Avatar>E</Avatar>
<Avatar>EV</Avatar>
<Avatar>icon</Avatar>
<Avatar image="/avatar.jpg" />`, preview: <div className="flex flex-wrap gap-4"><Avatar>E</Avatar><Avatar>EV</Avatar><Avatar>icon</Avatar><Avatar tone="secondary">A</Avatar></div> },
      { id: "avatar-variants", label: "Avatar Variants", code: `<Avatar variant="solid">E</Avatar>
<Avatar variant="soft">E</Avatar>
<Avatar variant="solid-gradient">E</Avatar>
<Avatar variant="soft-gradient">E</Avatar>`, preview: <div className="flex flex-wrap gap-4"><Avatar variant="solid">E</Avatar><Avatar variant="soft">E</Avatar><Avatar variant="solid-gradient">E</Avatar><Avatar variant="soft-gradient">E</Avatar><Avatar tone="secondary" variant="solid">E</Avatar><Avatar tone="secondary" variant="soft">E</Avatar></div> },
    ],
    alerts: [
      { id: "solid-alerts", label: "Solid Alerts", code: `<Alert tone="primary" variant="solid" title="Update available" />
<Alert tone="success" variant="solid" title="Products imported" />
<Alert tone="warning" variant="solid" title="Connection unstable" />
<Alert tone="error" variant="solid" title="Failed to login" />`, preview: <div className="grid gap-3"><Alert tone="primary" variant="solid" title="Update available" /><Alert tone="success" variant="solid" title="Products imported" /><Alert tone="warning" variant="solid" title="Connection unstable" /><Alert tone="error" variant="solid" title="Failed to login" /></div> },
      { id: "soft-alerts", label: "Soft Alerts", code: `<Alert tone="primary" variant="soft" title="Update available" />
<Alert tone="success" variant="soft" title="Products imported" />
<Alert tone="warning" variant="soft" title="Connection unstable" />
<Alert tone="error" variant="soft" title="Failed to login" />`, preview: <div className="grid gap-3"><Alert tone="primary" variant="soft" title="Update available" /><Alert tone="success" variant="soft" title="Products imported" /><Alert tone="warning" variant="soft" title="Connection unstable" /><Alert tone="error" variant="soft" title="Failed to login" /></div> },
    ],
    callouts: [
      { id: "callout-tones", label: "Callout Tones", code: `<Callout tone="primary" variant="solid" />
<Callout tone="secondary" variant="solid" />
<Callout tone="neutral" variant="solid" />`, preview: <div className="grid gap-3"><Callout tone="primary" variant="solid" /><Callout tone="secondary" variant="solid" /><Callout tone="neutral" variant="solid" /></div> },
      { id: "callout-variants", label: "Callout Variants", code: `<Callout tone="primary" variant="soft" />
<Callout tone="primary" variant="surface" />
<Callout tone="primary" variant="outline" />`, preview: <div className="grid gap-3"><Callout tone="primary" variant="soft" /><Callout tone="primary" variant="surface" /><Callout tone="primary" variant="outline" /></div> },
    ],
    "form-controls": [
      { id: "selection-controls", label: "Selection Controls", code: `<Checkbox label="Checkbox" />
<Radio label="Radio" />
<Switch />`, preview: <div className="flex flex-wrap items-center gap-8"><Checkbox /><Radio /><Switch /></div> },
      { id: "range-controls", label: "Range Controls", code: `<Progress value={50} />
<Progress tone="secondary" soft value={50} />`, preview: <div className="grid gap-4"><Progress value={50} /><Progress tone="secondary" soft value={50} /></div> },
    ],
    inputs: [
      { id: "input-tones", label: "Input Tones", code: `<TextInput tone="primary" label="Serial number" />
<TextInput tone="secondary" label="Serial number" />
<TextInput tone="success" label="Username" helper="Username is available!" />
<TextInput tone="error" label="Email address" helper="Email address is invalid" />`, preview: <ComponentPreview slug="inputs" /> },
    ],
    selects: [
      { id: "default-select", label: "Default Select", code: `<Select label="Source type">
  <option>Postgres</option>
  <option>REST API</option>
  <option>CSV upload</option>
</Select>`, preview: <div className="max-w-md"><Select label="Source type"><option>Postgres</option><option>REST API</option><option>CSV upload</option></Select></div> },
    ],
    textarea: [
      { id: "default-textarea", label: "Default Textarea", code: `<Textarea label="Description" placeholder="Describe the data source..." />`, preview: <div className="max-w-lg"><Textarea label="Description" placeholder="Describe the data source..." /></div> },
    ],
    tabs: [
      { id: "primary-tabs", label: "Primary Tabs", code: `<Tabs items={["My account", "Orders", "Settings", "Notifications"]} />`, preview: <Tabs /> },
      { id: "secondary-tabs", label: "Secondary Tabs", code: `<Tabs tone="secondary" items={["My account", "Orders", "Settings", "Notifications"]} />`, preview: <Tabs tone="secondary" /> },
    ],
    progress: [
      { id: "solid-progress", label: "Solid Progress", code: `<Progress value={65} />
<Progress tone="secondary" value={65} />`, preview: <div className="grid gap-4"><Progress value={65} /><Progress tone="secondary" value={65} /></div> },
      { id: "soft-progress", label: "Soft Progress", code: `<Progress soft value={65} />
<Progress tone="secondary" soft value={65} />`, preview: <div className="grid gap-4"><Progress soft value={65} /><Progress tone="secondary" soft value={65} /></div> },
    ],
    links: [
      { id: "inline-links", label: "Inline Links", code: `<p>
  Inline links use <a href="/docs/components/links">theme-aware colour</a>
  and stay readable inside continuous text.
</p>`, preview: <ComponentPreview slug="links" /> },
    ],
    cards: [
      { id: "metric-cards", label: "Metric Cards", code: `<Card title="Orders">
  <p className="mt-2 text-2xl font-semibold">420</p>
</Card>`, preview: <div className="grid gap-4 md:grid-cols-3"><Card title="Orders" /><Card title="Revenue"><p className="mt-2 text-2xl font-semibold">$23,522.92</p></Card><Card title="New customers"><p className="mt-2 text-2xl font-semibold">12</p></Card></div> },
      { id: "chart-cards", label: "Chart Cards", code: `<Card title="Orders">
  <BarChart />
</Card>
<Card title="Visitors">
  <LineChart />
</Card>`, preview: <div className="grid gap-4 md:grid-cols-2"><Card title="Orders"><BarChart /></Card><Card title="Visitors"><LineChart /></Card></div> },
    ],
    "empty-states": [
      { id: "empty-state", label: "Empty State", code: `<Card title="No Team Members">
  <p>Invite your team to collaborate on this project.</p>
  <Button>Invite Members</Button>
</Card>`, preview: <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-elevated p-8 text-center"><div className="mx-auto mb-4 flex justify-center"><Avatar>EV</Avatar><Avatar tone="secondary">A</Avatar></div><h3 className="text-lg font-semibold">No Team Members</h3><p className="mt-2 text-sm text-subtle">Invite your team to collaborate on this project.</p><Button className="mt-5" prefixIcon={<Plus size={16} />} suffixIcon={false}>Invite Members</Button></div> },
    ],
    charts: [
      { id: "bar-and-line-charts", label: "Bar And Line Charts", code: `<Card title="Multi Bar Chart"><BarChart /></Card>
<Card title="Line Chart"><LineChart /></Card>`, preview: <div className="grid gap-4 md:grid-cols-2"><Card title="Multi Bar Chart"><BarChart /></Card><Card title="Line Chart"><LineChart /></Card></div> },
      { id: "donut-and-stacked-charts", label: "Donut And Stacked Charts", code: `<Card title="Donut Chart"><DonutChart /></Card>
<Card title="Stacked Bar Chart"><BarChart stacked /></Card>`, preview: <div className="grid gap-4 md:grid-cols-2"><Card title="Donut Chart"><DonutChart /></Card><Card title="Stacked Bar Chart"><BarChart stacked /></Card></div> },
    ],
    tables: [
      { id: "data-table", label: "Data Table", code: `<SearchInput />
<DataTable />`, preview: <div><SearchInput /><DataTable /></div> },
    ],
    navigation: [
      { id: "side-navigation", label: "Side Navigation", code: `<DashboardPreview compact />`, preview: <DashboardPreview compact /> },
    ],
    modals: [
      { id: "confirmation-modal", label: "Confirmation Modal", code: `<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Connect source?</h2>
  <p>Confirm the source details before publishing.</p>
  <Button>Connect</Button>
  <Button variant="outline">Cancel</Button>
</div>`, preview: <div className="mx-auto max-w-md rounded-2xl border border-border bg-elevated p-6 shadow-raised" role="dialog" aria-modal="true" aria-labelledby="modal-title-preview"><h3 id="modal-title-preview" className="text-lg font-semibold">Connect source?</h3><p className="mt-2 text-sm text-subtle">Confirm the source details before publishing.</p><div className="mt-6 flex justify-end gap-3"><Button variant="outline">Cancel</Button><Button>Connect</Button></div></div> },
    ],
    toasts: [
      { id: "toast-feedback", label: "Toast Feedback", code: `<Alert tone="success" variant="soft" title="Source synced" body="Daily sync completed successfully." dismiss />`, preview: <div className="max-w-lg"><Alert tone="success" variant="soft" title="Source synced" body="Daily sync completed successfully." dismiss /></div> },
    ],
    popovers: [
      { id: "popover-trigger", label: "Popover Trigger", code: `<details>
  <summary>Open actions</summary>
  <div role="dialog">View profile, settings, remove</div>
</details>`, preview: <details className="mx-auto w-64 rounded-lg border border-border bg-elevated p-3"><summary className="cursor-pointer font-medium">Open actions</summary><div className="mt-3 grid gap-2 text-sm text-subtle"><button className="text-left">View profile</button><button className="text-left">Settings</button><button className="text-left">Remove access</button></div></details> },
    ],
    dropdowns: [
      { id: "dropdown-menu", label: "Dropdown Menu", code: `<details>
  <summary>More actions</summary>
  <menu>
    <button>Archive</button>
    <button>Report</button>
    <button>Snooze</button>
  </menu>
</details>`, preview: <details className="mx-auto w-56 rounded-lg border border-border bg-elevated p-3"><summary className="cursor-pointer font-medium">More actions</summary><div className="mt-3 grid gap-1 text-sm"><button className="rounded px-2 py-1.5 text-left hover:bg-surface-hover">Archive</button><button className="rounded px-2 py-1.5 text-left hover:bg-surface-hover">Report</button><button className="rounded px-2 py-1.5 text-left hover:bg-surface-hover">Snooze</button></div></details> },
    ],
  };

  return variants[slug] ?? [
    { id: `${slug}-preview`, label: `${labelFromSlug(slug)} Preview`, code: componentExampleCode(slug), preview: <ComponentPreview slug={slug} /> },
  ];
}

function SharedComponentPage({ slug }: { slug: string }) {
  const variantExamples = useMemo(() => componentVariants(slug), [slug]);
  const navItems = useMemo(() => slug === "buttons" ? buttonPageNavItems : [
      { id: "overview", label: "Overview" },
      { id: "usage", label: "Usage" },
      ...variantExamples.map(({ id, label }) => ({ id, label })),
      { id: "properties", label: "Properties" },
      { id: "tokens", label: "Token references" },
    ], [slug, variantExamples]);
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
          <p className="mt-4 text-lg leading-8 text-subtle">{componentDescriptions[slug] ?? `${title} support shared Fraxses product workflows.`}</p>
        </div>

        <section id="overview" className="fx-doc-section fx-doc-section-first">
          <PreviewPanel title="Overview">
            <p className="mb-5 max-w-3xl text-sm leading-7 text-subtle">{componentOverviewCopy(slug)}</p>
            <ComponentPreview slug={slug} />
          </PreviewPanel>
        </section>

        <section id="usage" className="fx-doc-section">
          <div className="grid gap-4 md:grid-cols-2">
            <Guidance title="Accessibility" items={["Keep visible focus states intact.", "Pair colour with labels, icons, or position where status is important.", "Ensure interactive examples can be operated with a keyboard."]} />
            <Guidance title="Usage guidance" items={componentUsageItems(slug)} />
          </div>
          <div className="mt-4">
            <DoDont {...componentDoDont(slug)} />
          </div>
        </section>

        {slug === "buttons" ? <ButtonSections /> : (
          variantExamples.map((variant) => (
            <section id={variant.id} className="fx-doc-section" key={variant.id}>
              <TooltipExampleCard code={variant.code} description={variant.description} title={variant.label}>
                {variant.preview}
              </TooltipExampleCard>
            </section>
          ))
        )}

        <section id="properties" className="fx-doc-section">
          <PreviewPanel title="Properties"><ComponentPropertiesTable slug={slug} /></PreviewPanel>
        </section>

        <section id="tokens" className="fx-doc-section">
          <PreviewPanel title="Token references">
            <ul className="guide-list">
              {componentTokenItems(slug).map((item) => <li key={item}>{item}</li>)}
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
  if (slug === "charts") return null;
  if (slug === "tables") return <DataTable />;
  if (slug === "navigation") return <DashboardPreview compact />;
  return <div className="grid gap-3 md:grid-cols-2"><Card title={labelFromSlug(slug)}><p className="mt-2 text-sm text-subtle">Shared documentation shell with live theme tokens. Needs deeper source examples where the reference did not define exact behaviour.</p></Card><Alert tone="neutral" variant="soft" title="Needs source verification" body="Component-specific motion and edge-case states are pending." /></div>;
}

function ComponentMatrix({ slug }: { slug: string }) {
  if (slug === "buttons") return <ButtonMatrix />;
  if (slug === "badges") return <div className="grid gap-3">{(["solid", "soft", "outline"] as const).map((variant) => <div key={variant} className="flex flex-wrap gap-4"><span className="w-20 text-sm text-subtle">{variant}</span>{(["primary", "secondary", "neutral", "success", "warning", "error"] as const).map((tone) => <Badge key={tone} tone={tone} variant={variant}>{tone}</Badge>)}</div>)}</div>;
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

function ComponentPropertiesTable({ slug }: { slug: string }) {
  const sharedRows = [
    ["tone", '"primary" | "secondary" | "neutral" | status tones', "component default", "Optional", "Maps the component to semantic colour tokens in the active theme."],
    ["variant", "string", "component default", "Optional", "Selects the visual treatment documented in the examples above."],
    ["children", "ReactNode", "undefined", "Optional", "Provides visible content where the component accepts custom content."],
  ];
  const rowsBySlug: Record<string, string[][]> = {
    badges: [["tone", "Tone", '"primary"', "Optional", "Sets the badge tone."], ["variant", '"solid" | "soft" | "outline"', '"solid"', "Optional", "Sets the badge visual treatment."], ["size", '"sm" | "md"', '"md"', "Optional", "Controls compact badge sizing."], ["dot", "boolean", "false", "Optional", "Adds a small leading status dot."]],
    avatars: [["tone", '"primary" | "secondary" | "neutral"', '"primary"', "Optional", "Sets avatar colour treatment."], ["variant", '"solid" | "soft" | "solid-gradient" | "soft-gradient"', '"solid"', "Optional", "Controls fill and gradient treatment."], ["size", '"xs" | "sm" | "md" | "lg" | "xl"', '"md"', "Optional", "Controls avatar dimensions."], ["image", "string", "undefined", "Optional", "Displays an image avatar when provided."]],
    alerts: [["tone", "Tone", '"primary"', "Optional", "Maps alert intent to semantic colour."], ["variant", '"solid" | "soft"', '"solid"', "Optional", "Controls alert emphasis."], ["title", "string", "required", "Required", "Primary alert message."], ["body", "string", "undefined", "Optional", "Supporting alert detail."], ["dismiss", "boolean", "false", "Optional", "Shows a dismiss control."]],
    callouts: [["tone", '"primary" | "secondary" | "neutral"', '"primary"', "Optional", "Sets callout colour treatment."], ["variant", '"solid" | "soft" | "surface" | "outline"', '"solid"', "Optional", "Controls callout emphasis."], ["action", "ReactNode", "built in", "Optional", "Current shared preview uses a feedback action."]],
    "form-controls": [["checked", "boolean", "true", "Optional", "Sets selected state for checkbox, radio, and switch previews."], ["tone", '"primary" | "secondary"', '"primary"', "Optional", "Maps control colour to semantic tokens."], ["label", "string", "component default", "Optional", "Accessible visible label."], ["value", "number", "50", "Optional", "Progress/range completion value."]],
    inputs: [["tone", "Tone | \"default\"", '"primary"', "Optional", "Sets validation or emphasis colour."], ["label", "string", '"Serial number"', "Optional", "Visible input label."], ["helper", "string", "default helper", "Optional", "Helper or validation text below the input."], ["placeholder", "string", '"Serial number"', "Optional", "Supplemental placeholder copy."]],
    selects: [["label", "string", '"Option"', "Optional", "Visible select label."], ["children", "option elements", "required", "Required", "Available choices."], ["value", "string", "undefined", "Optional", "Selected option value."], ["disabled", "boolean", "false", "Optional", "Prevents interaction."]],
    textarea: [["label", "string", '"Notes"', "Optional", "Visible textarea label."], ["placeholder", "string", "undefined", "Optional", "Supplemental hint text."], ["disabled", "boolean", "false", "Optional", "Prevents editing."], ["required", "boolean", "false", "Optional", "Marks the field as required."]],
    tabs: [["tone", '"primary" | "secondary"', '"primary"', "Optional", "Sets active indicator colour."], ["items", "string[]", "My account, Orders, Settings, Notifications", "Optional", "Tab labels in display order."], ["activeIndex", "number", "2 in preview", "Optional", "Needs source verification in the shared implementation."]],
    progress: [["tone", '"primary" | "secondary"', '"primary"', "Optional", "Sets progress fill colour."], ["soft", "boolean", "false", "Optional", "Uses the softer border token as the fill."], ["value", "number", "50", "Optional", "Completion value from 0 to 100."]],
    links: [["href", "string", "required", "Required", "Destination URL or route."], ["children", "ReactNode", "required", "Required", "Visible link text."], ["target", "string", "undefined", "Optional", "Use only when opening external destinations."]],
    cards: [["title", "string", '"Orders"', "Optional", "Card heading."], ["children", "ReactNode", "metric fallback", "Optional", "Card body content."], ["elevation", "token", "--shadow-soft", "Optional", "Needs source verification before exposing as a prop."]],
    "empty-states": [["title", "string", "required", "Required", "Explains the empty condition."], ["description", "string", "required", "Required", "Guides the next step."], ["action", "ReactNode", "undefined", "Optional", "Primary recovery action."]],
    charts: [["type", "ChartType", "required", "Required", "Supports metric cards, bar, multi-bar, stacked-bar, line, sparkline, area, pie, donut, scatter, gauge, radar, heatmap, funnel, and sankey."], ["data", "array", "demo data", "Required", "Values rendered by the chart."], ["tokens", "--chart-*", "theme tokens", "Optional", "Maps series colour to semantic chart tokens."]],
    tables: [["columns", "array", "required", "Required", "Column definitions."], ["rows", "array", "required", "Required", "Records shown in the table."], ["searchable", "boolean", "true in preview", "Optional", "Adds filtering when supported. Needs source verification."]],
    navigation: [["items", "array", "required", "Required", "Navigation destinations."], ["activeItem", "string", "current route", "Optional", "Highlights the active destination."], ["collapsible", "boolean", "true in sidebar", "Optional", "Supports expandable groups."]],
    modals: [["open", "boolean", "required", "Required", "Controls dialog visibility."], ["title", "string", "required", "Required", "Dialog accessible heading."], ["onClose", "function", "required", "Required", "Dismiss handler."], ["actions", "ReactNode", "undefined", "Optional", "Footer actions."]],
    toasts: [["tone", "Tone", '"success"', "Optional", "Maps toast status to semantic colour."], ["title", "string", "required", "Required", "Toast message."], ["body", "string", "undefined", "Optional", "Supporting detail."], ["duration", "number", "Needs source verification", "Optional", "Auto-dismiss timing."]],
    popovers: [["open", "boolean", "uncontrolled in preview", "Optional", "Controls popover visibility."], ["trigger", "ReactNode", "required", "Required", "Element that opens the popover."], ["children", "ReactNode", "required", "Required", "Popover content."], ["placement", "string", "Needs source verification", "Optional", "Preferred popover position."]],
    dropdowns: [["trigger", "ReactNode", "required", "Required", "Element that opens the menu."], ["items", "array", "required", "Required", "Menu actions or options."], ["open", "boolean", "uncontrolled in preview", "Optional", "Controls visibility when supported."], ["onSelect", "function", "undefined", "Optional", "Handles item selection."]],
  };
  const rows = rowsBySlug[slug] ?? sharedRows;
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-subtle">
          <tr><th className="px-4 py-3 font-semibold">Property</th><th className="px-4 py-3 font-semibold">Type</th><th className="px-4 py-3 font-semibold">Default</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Description</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map(([name, type, defaultValue, status, description]) => <tr key={name}><th className="px-4 py-3 font-mono text-xs">{name}</th><td className="px-4 py-3 font-mono text-xs text-subtle">{type}</td><td className="px-4 py-3 text-subtle">{defaultValue}</td><td className="px-4 py-3 text-subtle">{status}</td><td className="px-4 py-3 text-subtle">{description}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
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
