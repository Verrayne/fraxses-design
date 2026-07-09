import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Database,
  Info,
  Navigation,
  Search,
  Square,
} from "lucide-react";
import {
  ColourTokenUsage,
  colourUsageDoDont,
  fixedSystemColours,
  intendaLightGreenColourUsage,
} from "../content/colourUsage";
import { Badge, Button, Input, ToastPreview } from "../components/ui-kit";
import { PreviewCard } from "../components/docs/PreviewCard";

export function IntendaLightGreenColourUsagePage() {
  return (
    <div className="doc-flow">
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2>Overview</h2>
          <p className="mt-3 leading-7 text-subtle">
            Intenda Light - Green is the default light Fraxses theme. It uses deep green as the primary
            brand and action colour, paired with warm sand contrast for selected brand moments and
            entity subtitles. The theme stays quiet by default so operational data, tables and canvas
            workflows remain easy to scan.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-primary p-6 text-primary-ink">
          <p className="text-sm font-medium uppercase tracking-[0.12em]">Theme pair</p>
          <div className="mt-8 flex items-end gap-3">
            <div className="h-20 flex-1 rounded-md bg-[#1A3636] ring-1 ring-white/20" />
            <div className="h-12 w-20 rounded-md bg-[#D6BD98]" />
          </div>
          <p className="mt-5 text-sm leading-6 text-primary-ink/85">Primary #1A3636 with warm sand #D6BD98.</p>
        </div>
      </section>

      {intendaLightGreenColourUsage.map((section) => (
        <section key={section.id} className="space-y-5">
          <div>
            <h2>{section.title}</h2>
            <p className="mt-2 max-w-3xl leading-7 text-subtle">{section.description}</p>
          </div>
          {section.guidance && (
            <div className="rounded-lg border border-border bg-surface p-4">
              <ul className="guide-list">{section.guidance.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
          <div className="grid gap-4 lg:grid-cols-2">
            {section.tokens.map((token) => (
              <ColourSwatch key={`${section.id}-${token.token}`} token={token} />
            ))}
          </div>
          <ColourUsageTable tokens={section.tokens} />
          {section.id === "borders-focus" && <BordersFocusExamples />}
        </section>
      ))}

      <section className="space-y-5">
        <div>
          <h2>System colours</h2>
          <p className="mt-2 max-w-3xl leading-7 text-subtle">
            These fixed system colours do not change per theme unless the global semantic system is
            intentionally updated. Success, Warning, Error and Info should always communicate meaning,
            not brand preference.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {fixedSystemColours.map((token) => (
            <ColourSwatch key={token.token} token={token} />
          ))}
        </div>
        <ColourUsageTable tokens={fixedSystemColours} />
      </section>

      <section className="space-y-5">
        <div>
          <h2>Example component cards</h2>
          <p className="mt-2 max-w-3xl leading-7 text-subtle">
            These examples show how the same tokens should appear in everyday Fraxses components.
          </p>
        </div>
        <ComponentUsageExamples />
      </section>

      <section>
        <DoDontCard doItems={colourUsageDoDont.doItems} dontItems={colourUsageDoDont.dontItems} />
      </section>
    </div>
  );
}

export function ColourSwatch({ token }: { token: ColourTokenUsage }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-soft">
      <div className="grid grid-cols-[120px_minmax(0,1fr)]">
        <div
          className="min-h-[150px] border-r border-border"
          style={swatchStyle(token)}
          aria-label={`${token.token} swatch`}
        />
        <div className="space-y-4 p-4">
          <div>
            <h3 className="font-semibold text-ink">{token.token}</h3>
            <p className="mt-1 font-mono text-xs text-primary">{token.value}</p>
            {token.cssVar && <p className="mt-1 font-mono text-xs text-subtle">{token.cssVar}</p>}
          </div>
          <p className="text-sm leading-6 text-subtle">{token.usage}</p>
          <UsageExample token={token} />
        </div>
      </div>
    </div>
  );
}

export function ColourUsageTable({ tokens }: { tokens: ColourTokenUsage[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-subtle">
          <tr>
            <th className="px-4 py-3">Token</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Used for</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tokens.map((token) => (
            <tr key={`${token.token}-${token.value}`}>
              <td className="px-4 py-3 font-medium text-ink">{token.token}</td>
              <td className="px-4 py-3 font-mono text-xs text-primary">{token.value}</td>
              <td className="px-4 py-3 text-subtle">{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UsageExample({ token }: { token: ColourTokenUsage }) {
  const base = "rounded-md border border-border bg-background px-3 py-2 text-xs";

  if (token.example === "button") {
    return <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-ink">Save changes</button>;
  }

  if (token.example === "hover") {
    return <div className={`${base} border-[#d0d8d8] bg-[#ffffff]`}>Hover surface</div>;
  }

  if (token.example === "selected") {
    return <div className={`${base} border-[#d0d8d8] bg-[#d1d7d7] text-[#1A3636]`}>Selected row</div>;
  }

  if (token.example === "contrast") {
    return <div className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-ink">Primary contrast text</div>;
  }

  if (token.example === "input") {
    return <input className="h-9 w-full rounded-md border border-border bg-white px-3 text-xs outline-none" placeholder="Input field" readOnly />;
  }

  if (token.example === "canvas") {
    return <CanvasMiniPreview />;
  }

  if (token.example === "text") {
    return (
      <div className="space-y-1 rounded-md border border-border bg-white p-3 text-xs">
        <p className="font-semibold text-[#09090b]">Strong heading</p>
        <p className="text-[#18181b]">Normal body text</p>
        <p className="text-[#71717a]">Muted metadata</p>
        <p className="text-[#a1a1aa]">Subtle helper</p>
      </div>
    );
  }

  if (token.example === "border") {
    return <div className="rounded-md border border-[#d0d8d8] bg-white px-3 py-2 text-xs">Strong border example</div>;
  }

  if (token.example === "focus") {
    return <button className="rounded-md border border-[#1A3636] bg-white px-3 py-2 text-xs ring-4 ring-[rgb(26_54_54_/_0.18)]">Focused control</button>;
  }

  if (token.example === "badge") {
    return <SystemBadge token={token.token} />;
  }

  if (token.example === "entity") {
    return <CanvasEntityCard />;
  }

  return <div className={base}>Usage example</div>;
}

export function DoDontCard({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="mb-3 flex items-center gap-2 text-base"><CheckCircle2 size={17} className="text-success" /> Do</h2>
        <ul className="space-y-2 text-sm leading-6 text-subtle">{doItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="mb-3 flex items-center gap-2 text-base"><AlertCircle size={17} className="text-danger" /> Don't</h2>
        <ul className="space-y-2 text-sm leading-6 text-subtle">{dontItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}

function BordersFocusExamples() {
  return (
    <PreviewCard title="Borders and focus examples">
      <div className="grid gap-4 lg:grid-cols-2">
        <Input label="Input default" placeholder="Search objects" icon={<Search size={16} />} />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Input hover</span>
          <input className="h-10 w-full rounded-md border border-[#d0d8d8] bg-white px-3 text-sm outline-none" value="Hover border" readOnly />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Input focus</span>
          <input className="h-10 w-full rounded-md border border-[#1A3636] bg-white px-3 text-sm outline-none ring-4 ring-[rgb(26_54_54_/_0.18)]" value="Focused field" readOnly />
        </label>
        <div className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-ink">
          Selected sidebar item
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-ink ring-4 ring-[rgb(26_54_54_/_0.18)]">
          Focused button
        </button>
      </div>
    </PreviewCard>
  );
}

function ComponentUsageExamples() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <PreviewCard title="Buttons and input">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Primary button</Button>
            <Button variant="secondary">Secondary button</Button>
            <Button variant="ghost">Ghost button</Button>
          </div>
          <Input label="Input field" placeholder="Search data objects" icon={<Search size={16} />} />
        </div>
      </PreviewCard>
      <PreviewCard title="Navigation and table">
        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-ink">
            <Navigation size={16} /> Data sources
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-white">
            <div className="grid grid-cols-3 bg-muted px-4 py-2 text-xs font-medium uppercase text-subtle">
              <span>Object</span><span>Status</span><span>Owner</span>
            </div>
            <div className="grid grid-cols-3 bg-white px-4 py-3 text-sm hover:bg-[#e8ebeb]">
              <span>Customers</span><span>Synced</span><span className="text-subtle">Data team</span>
            </div>
          </div>
        </div>
      </PreviewCard>
      <PreviewCard title="Badges and toasts">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <SystemBadge token="Success" />
            <SystemBadge token="Warning" />
            <SystemBadge token="Error" />
            <SystemBadge token="Info" />
          </div>
          <div className="grid gap-3">
            <ToastPreview />
            <div className="flex max-w-md items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-lifted">
              <Info className="text-[#315C9F]" size={18} />
              <div><p className="text-sm font-medium">Mapping updated</p><p className="mt-1 text-sm text-subtle">Field rules are ready to review.</p></div>
            </div>
          </div>
        </div>
      </PreviewCard>
      <PreviewCard title="Canvas entity card">
        <div className="rounded-lg border border-border p-5" style={canvasBackgroundStyle}>
          <CanvasEntityCard />
        </div>
      </PreviewCard>
    </div>
  );
}

function SystemBadge({ token }: { token: string }) {
  const styles: Record<string, { fg: string; bg: string; label: string; icon: JSX.Element }> = {
    Success: { fg: "#4E7A57", bg: "#E7F1E8", label: "Synced", icon: <CheckCircle2 size={14} /> },
    Warning: { fg: "#8A6A13", bg: "#FFF6DB", label: "Review", icon: <Circle size={14} /> },
    Error: { fg: "#B76E79", bg: "#F8E9EC", label: "Failed", icon: <AlertCircle size={14} /> },
    Info: { fg: "#315C9F", bg: "#E8EEF9", label: "Info", icon: <Info size={14} /> },
  };
  const style = styles[token] ?? styles.Success;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={{ color: style.fg, backgroundColor: style.bg }}>
      {style.icon}
      {style.label}
    </span>
  );
}

function CanvasMiniPreview() {
  return (
    <div className="rounded-md border border-border p-3" style={canvasBackgroundStyle}>
      <div className="h-8 w-24 rounded-md border border-[#d0d8d8] bg-white" />
    </div>
  );
}

function CanvasEntityCard() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-[#d0d8d8] bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-ink">
          <Database size={17} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#09090b]">Customer entity</p>
          <p className="text-xs font-medium text-[#D6BD98]">Core data object</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Badge>Synced</Badge>
        <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-subtle">
          <Square size={11} /> 18 fields
        </span>
      </div>
    </div>
  );
}

function swatchStyle(token: ColourTokenUsage) {
  if (token.token === "Canvas Dot") {
    return canvasBackgroundStyle;
  }

  if (token.value.includes("/")) {
    const [foreground, background] = token.value.split("/").map((value) => value.trim());
    return { background: `linear-gradient(135deg, ${foreground} 0 50%, ${background} 50% 100%)` };
  }

  return { background: token.value };
}

const canvasBackgroundStyle = {
  backgroundColor: "#f7fbfa",
  backgroundImage: "radial-gradient(circle, rgb(26 54 54 / 0.13) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};
