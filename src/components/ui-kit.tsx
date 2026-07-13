import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import X from "lucide-react/dist/esm/icons/x.js";
import { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: ReactNode;
};

export function Button({ variant = "primary", icon, className = "", children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-ink hover:brightness-95",
    secondary: "border border-border bg-surface text-ink hover:bg-elevated",
    ghost: "text-subtle hover:bg-elevated hover:text-ink",
    danger: "bg-danger text-white hover:brightness-95",
  };

  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helper?: string;
  error?: string;
  icon?: ReactNode;
};

export function Input({ label, helper, error, icon, className = "", ...props }: InputProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      <span className="relative block">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle">{icon}</span>}
        <input
          className={`h-10 w-full rounded-md border bg-surface px-3 text-sm text-ink outline-none transition placeholder:text-subtle/70 focus:border-primary focus:ring-2 focus:ring-primary/15 ${icon ? "pl-9" : ""} ${error ? "border-danger" : "border-border"} ${className}`}
          {...props}
        />
      </span>
      {(helper || error) && <span className={`mt-1.5 block text-xs ${error ? "text-danger" : "text-subtle"}`}>{error ?? helper}</span>}
    </label>
  );
}

export function SelectPreview() {
  return (
    <label className="block max-w-sm text-sm">
      <span className="mb-1.5 block font-medium">Environment</span>
      <span className="relative block">
        <select className="h-10 w-full appearance-none rounded-md border border-border bg-surface px-3 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15">
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtle" size={16} />
      </span>
    </label>
  );
}

export function TabsPreview({ compact = false }: { compact?: boolean }) {
  const tabs = ["Overview", "Fields", "Lineage", "Settings"];
  return (
    <div className={`inline-flex rounded-md border border-border bg-muted p-1 ${compact ? "text-xs" : "text-sm"}`} role="tablist">
      {tabs.map((tab, index) => (
        <button key={tab} className={`rounded px-3 py-1.5 font-medium ${index === 0 ? "bg-surface text-ink shadow-soft" : "text-subtle"}`} role="tab" aria-selected={index === 0}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export function Badge({ tone = "success", muted = false, children }: PropsWithChildren<{ tone?: "success" | "warning" | "danger"; muted?: boolean }>) {
  const tones = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
  };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${muted ? "bg-muted text-subtle" : tones[tone]}`}>{children}</span>;
}

export function Card({ title, meta, value, tone }: { title: string; meta: string; value: string; tone?: "warning" }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-soft">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-subtle">{meta}</p>
      <p className={`mt-5 text-2xl font-semibold ${tone === "warning" ? "text-warning" : "text-primary"}`}>{value}</p>
    </div>
  );
}

export function ModalPreview({ destructive = false }: { destructive?: boolean }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-5 shadow-lifted">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{destructive ? "Delete data source?" : "Connect data source"}</h3>
          <p className="mt-2 text-sm text-subtle">{destructive ? "This removes the source from the workspace catalogue." : "Confirm the connection settings before syncing objects."}</p>
        </div>
        <button className="rounded-md p-1 text-subtle hover:bg-elevated" aria-label="Close"><X size={16} /></button>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant={destructive ? "danger" : "primary"}>{destructive ? "Delete" : "Connect"}</Button>
      </div>
    </div>
  );
}

export function ToastPreview({ tone = "success", withAction = false }: { tone?: "success" | "warning" | "danger"; withAction?: boolean }) {
  const title = tone === "success" ? "Source synced" : tone === "warning" ? "Sync delayed" : "Sync failed";
  return (
    <div className="flex max-w-md items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-lifted">
      <CheckCircle2 className={tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"} size={18} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm text-subtle">24 data objects refreshed just now.</p>
        {withAction && <button className="mt-2 text-sm font-medium text-primary">View run</button>}
      </div>
    </div>
  );
}
