import { ArrowRight, Database, GitBranch } from "lucide-react";
import { Badge, Button, Card, Input } from "../components/ui-kit";
import { PreviewCard } from "../components/docs/PreviewCard";

export const patternDocs: Record<string, { title: string; description: string; preview: JSX.Element; guidance: string[] }> = {
  dashboard: {
    title: "Dashboard",
    description: "Operational summary pages that help teams understand sync health, catalogue growth and attention areas.",
    guidance: ["Lead with the current state.", "Use cards for repeated metrics only.", "Keep secondary charts below high-signal tables."],
    preview: (
      <PreviewCard>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Sources online" meta="Today" value="12 / 13" />
          <Card title="Objects synced" meta="Last run" value="248" />
          <Card title="Issues" meta="Needs review" value="3" tone="warning" />
        </div>
      </PreviewCard>
    ),
  },
  "data-sources": {
    title: "Data Sources",
    description: "Connection setup and monitoring views for databases, warehouses and application sources.",
    guidance: ["Separate connection state from data object state.", "Show last sync time.", "Keep credentials actions scoped and explicit."],
    preview: (
      <PreviewCard>
        <div className="space-y-3">
          {["Postgres warehouse", "Salesforce", "Billing lake"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center gap-3"><Database size={18} className="text-primary" /><div><p className="font-medium">{item}</p><p className="text-sm text-subtle">Synced 12 minutes ago</p></div></div>
              <Badge tone="success">Healthy</Badge>
            </div>
          ))}
        </div>
      </PreviewCard>
    ),
  },
  "data-objects": {
    title: "Data Objects",
    description: "Catalogue objects that describe business-ready entities, ownership and schema mapping.",
    guidance: ["Use object names that business users recognise.", "Show mapped fields and ownership.", "Make review states prominent."],
    preview: (
      <PreviewCard>
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Customer" meta="18 fields mapped" value="Ready" />
          <Card title="Invoice" meta="7 fields need review" value="Review" tone="warning" />
        </div>
      </PreviewCard>
    ),
  },
  "query-builder": {
    title: "Query Builder",
    description: "Composable filtering and joining patterns for building trusted queries from governed objects.",
    guidance: ["Make each clause readable as a sentence.", "Use progressive disclosure for advanced logic.", "Preserve a visible run/preview action."],
    preview: (
      <PreviewCard>
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input label="Object" value="Customers" readOnly />
            <Input label="Condition" value="Region is EMEA" readOnly />
            <Button icon={<ArrowRight size={16} />}>Run</Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-subtle"><GitBranch size={16} /> Query preview uses governed fields only.</div>
        </div>
      </PreviewCard>
    ),
  },
};
