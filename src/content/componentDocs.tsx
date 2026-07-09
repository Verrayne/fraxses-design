import {
  CheckCircle2,
  Database,
  Download,
  Filter,
  Plus,
  Search,
  Settings2,
} from "lucide-react";
import { CodeBlock } from "../components/docs/CodeBlock";
import { DoDont } from "../components/docs/DoDont";
import { PreviewCard } from "../components/docs/PreviewCard";
import { Badge, Button, Card, Input, ModalPreview, SelectPreview, TabsPreview, ToastPreview } from "../components/ui-kit";

export type ComponentDoc = {
  title: string;
  description: string;
  guidance: string[];
  preview: JSX.Element;
  variants: JSX.Element;
  states: JSX.Element;
  code: string;
  doItems?: string[];
  dontItems?: string[];
};

export const componentDocs: Record<string, ComponentDoc> = {
  buttons: {
    title: "Buttons",
    description: "Actions for creating, saving, filtering and moving through Fraxses workflows.",
    guidance: [
      "Use one primary action per surface.",
      "Pair action labels with familiar icons when the icon improves scan speed.",
      "Keep destructive actions visually distinct and away from routine actions.",
    ],
    preview: (
      <PreviewCard>
        <div className="flex flex-wrap gap-3">
          <Button icon={<Plus size={16} />}>Add source</Button>
          <Button variant="secondary" icon={<Filter size={16} />}>Filter</Button>
          <Button variant="ghost" icon={<Download size={16} />}>Export</Button>
        </div>
      </PreviewCard>
    ),
    variants: (
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Delete</Button>
      </div>
    ),
    states: (
      <div className="flex flex-wrap gap-3">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" icon={<Settings2 size={16} />}>Icon</Button>
      </div>
    ),
    code: `<Button icon={<Plus size={16} />}>Add source</Button>
<Button variant="secondary">Filter</Button>
<Button variant="danger">Delete</Button>`,
    doItems: ["Use concise verbs.", "Keep primary buttons visually scarce."],
    dontItems: ["Do not use multiple primary buttons in one preview.", "Do not rely on colour alone for destructive actions."],
  },
  inputs: {
    title: "Inputs",
    description: "Text inputs for naming, filtering and configuring data objects.",
    guidance: ["Label every input.", "Use helper text for validation or format guidance.", "Keep placeholder text short."],
    preview: <PreviewCard><Input label="Data source name" placeholder="Revenue warehouse" helper="Use the business-facing name." /></PreviewCard>,
    variants: (
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Default" placeholder="Search datasets" />
        <Input label="With icon" placeholder="Search" icon={<Search size={16} />} />
      </div>
    ),
    states: (
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Focused style" value="Customers" readOnly />
        <Input label="Error" placeholder="schema.table" error="Use schema.table format." />
      </div>
    ),
    code: `<Input label="Data source name" placeholder="Revenue warehouse" helper="Use the business-facing name." />
<Input label="Search" icon={<Search size={16} />} />`,
    doItems: ["Keep labels visible.", "Use helper copy for constraints."],
    dontItems: ["Do not make placeholders carry essential meaning."],
  },
  selects: {
    title: "Selects",
    description: "Selection controls for scoped choices like environments, roles and object types.",
    guidance: ["Use select controls when options are known.", "Keep default values explicit.", "Avoid long option labels."],
    preview: <PreviewCard><SelectPreview /></PreviewCard>,
    variants: <SelectPreview />,
    states: (
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Disabled select" value="Production" readOnly />
        <Input label="Error select" value="Choose a schema" readOnly error="Schema is required." />
      </div>
    ),
    code: `<label>
  Environment
  <select>
    <option>Production</option>
    <option>Staging</option>
  </select>
</label>`,
  },
  tabs: {
    title: "Tabs",
    description: "Horizontal switching for related views inside the same context.",
    guidance: ["Use tabs for sibling views.", "Keep labels short.", "Avoid hiding primary actions inside inactive tabs."],
    preview: <PreviewCard><TabsPreview /></PreviewCard>,
    variants: <TabsPreview />,
    states: <TabsPreview compact />,
    code: `<div role="tablist">
  <button aria-selected="true">Overview</button>
  <button>Fields</button>
  <button>Lineage</button>
</div>`,
  },
  tables: {
    title: "Tables",
    description: "Dense data presentation for sources, objects, fields and sync runs.",
    guidance: ["Use clear column headers.", "Keep status and actions aligned consistently.", "Prefer compact rows for operational screens."],
    preview: <PreviewCard><TablePreview /></PreviewCard>,
    variants: <TablePreview />,
    states: <TablePreview empty />,
    code: `<table>
  <thead><tr><th>Name</th><th>Status</th><th>Owner</th></tr></thead>
  <tbody><tr><td>Orders</td><td>Synced</td><td>Data team</td></tr></tbody>
</table>`,
    doItems: ["Keep repeated row actions in the same final column.", "Use badges for status."],
    dontItems: ["Do not center-align long operational data."],
  },
  cards: {
    title: "Cards",
    description: "Compact surfaces for grouped metrics, source summaries and catalogue entries.",
    guidance: ["Use cards for individual repeated items.", "Keep radius at 8px or below unless the system says otherwise.", "Do not nest cards inside cards."],
    preview: <PreviewCard><Card title="Revenue warehouse" meta="Postgres source" value="24 objects" /></PreviewCard>,
    variants: (
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Source health" meta="Last 24 hours" value="99.9%" />
        <Card title="Fields mapped" meta="Customer object" value="18 / 22" />
      </div>
    ),
    states: (
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Active" meta="Ready" value="Synced" />
        <Card title="Needs attention" meta="Credential expired" value="Fix" tone="warning" />
      </div>
    ),
    code: `<Card title="Revenue warehouse" meta="Postgres source" value="24 objects" />`,
    doItems: ["Use for repeated objects.", "Keep metadata concise."],
    dontItems: ["Do not use cards as generic page section wrappers."],
  },
  badges: {
    title: "Badges",
    description: "Small status indicators for sync state, role, priority and lifecycle.",
    guidance: ["Use badges for short categorical labels.", "Use semantic colour sparingly.", "Pair status with table or card context."],
    preview: <PreviewCard><div className="flex flex-wrap gap-2"><Badge>Synced</Badge><Badge tone="warning">Pending</Badge><Badge tone="danger">Failed</Badge></div></PreviewCard>,
    variants: <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Danger</Badge></div>,
    states: <div className="flex flex-wrap gap-2"><Badge>Enabled</Badge><Badge muted>Muted</Badge></div>,
    code: `<Badge tone="success">Synced</Badge>
<Badge tone="danger">Failed</Badge>`,
  },
  modals: {
    title: "Modals",
    description: "Focused overlays for confirmation and short setup tasks.",
    guidance: ["Use modals for blocking decisions.", "Keep content short.", "Always provide a clear cancel path."],
    preview: <PreviewCard><ModalPreview /></PreviewCard>,
    variants: <ModalPreview />,
    states: <ModalPreview destructive />,
    code: `<div role="dialog" aria-modal="true">
  <h2>Connect data source</h2>
  <p>Confirm credentials before continuing.</p>
</div>`,
    doItems: ["Use direct titles.", "Keep actions predictable."],
    dontItems: ["Do not use modals for long data-entry flows."],
  },
  toasts: {
    title: "Toasts",
    description: "Non-blocking feedback for saves, syncs and background actions.",
    guidance: ["Use toasts for confirmation after an action.", "Keep messages short.", "Avoid using toasts for critical errors that require action."],
    preview: <PreviewCard><ToastPreview /></PreviewCard>,
    variants: <div className="grid gap-3"><ToastPreview /><ToastPreview tone="warning" /><ToastPreview tone="danger" /></div>,
    states: <ToastPreview withAction />,
    code: `<Toast tone="success" title="Source synced" description="24 objects refreshed." />`,
    doItems: ["Name the completed action.", "Keep actions optional."],
    dontItems: ["Do not hide blocking validation inside a toast."],
  },
  navigation: {
    title: "Navigation",
    description: "Sidebar and header patterns for moving through catalogue and app workspaces.",
    guidance: ["Show active location clearly.", "Keep global navigation stable.", "Reserve icons for high-frequency destinations."],
    preview: <PreviewCard><NavigationPreview /></PreviewCard>,
    variants: <NavigationPreview />,
    states: <NavigationPreview compact />,
    code: `<nav aria-label="Primary">
  <a aria-current="page">Dashboard</a>
  <a>Data sources</a>
</nav>`,
  },
};

function TablePreview({ empty = false }: { empty?: boolean }) {
  if (empty) {
    return <div className="rounded-lg border border-dashed border-border bg-elevated p-8 text-center text-sm text-subtle">No data objects match this filter.</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-subtle">
          <tr><th className="px-4 py-3">Object</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Owner</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {["Customers", "Orders", "Invoices"].map((name, index) => (
            <tr key={name}>
              <td className="px-4 py-3 font-medium">{name}</td>
              <td className="px-4 py-3"><Badge tone={index === 2 ? "warning" : "success"}>{index === 2 ? "Review" : "Synced"}</Badge></td>
              <td className="px-4 py-3 text-subtle">Data team</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NavigationPreview({ compact = false }: { compact?: boolean }) {
  const items = ["Dashboard", "Data sources", "Data objects", "Query builder"];
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "w-full max-w-xs rounded-lg border border-border bg-surface p-2"}>
      {items.map((item, index) => (
        <div key={item} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${index === 1 ? "bg-primary text-primary-ink" : "text-subtle"}`}>
          {index === 1 ? <Database size={16} /> : <CheckCircle2 size={16} />}
          {item}
        </div>
      ))}
    </div>
  );
}

export function ComponentDocSections({ doc }: { doc: ComponentDoc }) {
  return (
    <div className="space-y-8">
      {doc.preview}
      <section>
        <h2>Usage Guidance</h2>
        <ul className="guide-list">{doc.guidance.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <PreviewCard title="Variants">{doc.variants}</PreviewCard>
        <PreviewCard title="States">{doc.states}</PreviewCard>
      </section>
      {(doc.doItems || doc.dontItems) && <DoDont doItems={doc.doItems ?? []} dontItems={doc.dontItems ?? []} />}
      <CodeBlock code={doc.code} />
    </div>
  );
}
