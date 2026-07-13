import AlertCircle from "lucide-react/dist/esm/icons/alert-circle.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import Circle from "lucide-react/dist/esm/icons/circle.js";
import Info from "lucide-react/dist/esm/icons/info.js";
import Megaphone from "lucide-react/dist/esm/icons/megaphone.js";
import Search from "lucide-react/dist/esm/icons/search.js";
import User from "lucide-react/dist/esm/icons/user.js";
import X from "lucide-react/dist/esm/icons/x.js";
import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export type Tone = "primary" | "secondary" | "neutral" | "success" | "warning" | "error";
export type Variant = "modern" | "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";

const focusClass = "fx-focus";
const toneStyle = (tone: Tone) => ({
  "--tone": `var(--${tone})`,
  "--tone-hover": `var(--${tone}-hover, var(--${tone}))`,
  "--tone-active": `var(--${tone}-active, var(--${tone}))`,
  "--tone-subtle": `var(--${tone}-subtle)`,
  "--tone-subtle-hover": `var(--${tone}-subtle-hover, var(--${tone}-subtle))`,
  "--tone-border": `var(--${tone}-border)`,
  "--tone-foreground": `var(--${tone}-foreground)`,
} as CSSProperties);

export function Button({ tone = "primary", variant = "solid", size = "md", loading, iconOnly, prefixIcon, suffixIcon, children, className = "", disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; variant?: Variant; size?: "xs" | "sm" | "md" | "lg" | "xl"; loading?: boolean; iconOnly?: boolean; prefixIcon?: ReactNode; suffixIcon?: ReactNode | false }) {
  const sizes = {
    xs: "fx-button-size-xs",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
    xl: "fx-button-size-xl",
  };
  const trailingIcon = suffixIcon === false ? null : suffixIcon ?? <ArrowRight size={16} />;
  return (
    <button
      className={`fx-button fx-button-${variant} ${focusClass} inline-flex items-center justify-center gap-2 rounded-md border font-medium transition disabled:cursor-not-allowed disabled:opacity-45 ${iconOnly ? "h-10 w-10 px-0" : sizes[size]} ${className}`}
      style={toneStyle(tone)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Circle className="animate-spin" size={14} /> : null}
      {!iconOnly && prefixIcon}
      {children}
      {!iconOnly && trailingIcon}
    </button>
  );
}

export function Badge({ tone = "primary", variant = "solid", size = "md", dot, children }: { tone?: Tone; variant?: "solid" | "soft" | "surface" | "outline"; size?: "sm" | "md"; dot?: boolean; children: ReactNode }) {
  return (
    <span className={`fx-badge fx-badge-${variant} inline-flex items-center gap-1.5 rounded-full border font-medium ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`} style={toneStyle(tone)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Avatar({ tone = "primary", variant = "solid", size = "md", children = "EV", image }: { tone?: "primary" | "secondary" | "neutral"; variant?: "solid" | "soft" | "solid-gradient" | "soft-gradient"; size?: "xs" | "sm" | "md" | "lg" | "xl"; children?: ReactNode; image?: string }) {
  const sizes = { xs: "h-7 w-7 text-xs", sm: "h-8 w-8 text-sm", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base", xl: "h-16 w-16 text-lg" };
  return (
    <span className={`fx-avatar fx-avatar-${variant} grid shrink-0 place-items-center overflow-hidden rounded-full font-medium ${sizes[size]}`} style={toneStyle(tone)}>
      {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : children === "icon" ? <User size={18} /> : children}
    </span>
  );
}

const alertIcon = (tone: Tone) => tone === "success" ? <CheckCircle2 size={17} /> : tone === "warning" ? <AlertCircle size={17} /> : tone === "error" ? <AlertCircle size={17} /> : <Info size={17} />;

export function Alert({ tone = "primary", variant = "solid", title, body, action, dismiss }: { tone?: Tone; variant?: "solid" | "soft"; title: string; body?: string; action?: string; dismiss?: boolean }) {
  return (
    <div className={`fx-alert fx-alert-${variant} flex items-center gap-3 rounded-lg px-4 py-3 text-sm`} style={toneStyle(tone)}>
      {alertIcon(tone)}
      <div className="min-w-0 flex-1">
        <p className="font-medium">{title}</p>
        {body && <p className="mt-0.5 opacity-85">{body}</p>}
      </div>
      {action && <button className="rounded-full border border-current/25 px-3 py-1 font-medium">{action}</button>}
      {dismiss && <button aria-label="Dismiss"><X size={16} /></button>}
    </div>
  );
}

export function Callout({ tone = "primary", variant = "solid" }: { tone?: "primary" | "secondary" | "neutral"; variant?: "solid" | "soft" | "surface" | "outline" }) {
  return (
    <div className={`fx-callout fx-callout-${variant} flex items-center gap-4 rounded-2xl border px-5 py-4`} style={toneStyle(tone)}>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-current/10"><Megaphone size={18} /></span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">Got feedback?</p>
        <p className="text-sm">We'd love to know what you think about Fraxses Design.</p>
      </div>
      <button className="rounded-full border border-current/30 px-4 py-2 text-sm font-medium">Share Feedback</button>
    </div>
  );
}

export function TextInput({ tone = "primary", label = "Serial number", helper = "Serial number starts with UIC", className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { tone?: Tone | "default"; label?: string; helper?: string }) {
  const cssTone = tone === "default" ? "neutral" : tone;
  return (
    <label className="block text-sm" style={toneStyle(cssTone)}>
      <span className="mb-1.5 block text-subtle">{label}</span>
      <span className="relative block">
        <input className={`fx-input ${focusClass} h-10 w-full rounded-md border bg-elevated px-3 pr-9 text-ink placeholder:text-subtle ${className}`} placeholder="Serial number" {...props} />
        <Info className="absolute right-3 top-1/2 -translate-y-1/2" size={15} />
      </span>
      <span className="mt-1.5 block" style={{ color: "var(--tone)" }}>{helper}</span>
    </label>
  );
}

export function Select({ label = "Option", children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-subtle">{label}</span>
      <span className="relative block">
        <select className={`h-10 w-full appearance-none rounded-md border border-border bg-elevated px-3 pr-9 text-ink ${focusClass}`} {...props}>{children}</select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle" size={15} />
      </span>
    </label>
  );
}

export function Textarea({ label = "Notes", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return <label className="block text-sm"><span className="mb-1.5 block text-subtle">{label}</span><textarea className={`min-h-24 w-full rounded-md border border-border bg-elevated px-3 py-2 text-ink ${focusClass}`} {...props} /></label>;
}

export function Checkbox({ tone = "primary", label = "Checkbox", checked = true }: { tone?: "primary" | "secondary"; label?: string; checked?: boolean }) {
  return <label className="flex items-center gap-3 text-sm" style={toneStyle(tone)}><span className={`fx-control-box grid h-4 w-4 place-items-center rounded border ${checked ? "is-checked" : "border-border"}`}>{checked && <Check size={12} />}</span>{label}</label>;
}

export function Radio({ tone = "primary", label = "Radio", checked = true }: { tone?: "primary" | "secondary"; label?: string; checked?: boolean }) {
  return <label className="flex items-center gap-3 text-sm" style={toneStyle(tone)}><span className="grid h-4 w-4 place-items-center rounded-full border border-border"><span className={`fx-radio-dot h-2 w-2 rounded-full ${checked ? "is-checked" : ""}`} /></span>{label}</label>;
}

export function Switch({ tone = "primary", checked = true }: { tone?: "primary" | "secondary"; checked?: boolean }) {
  return <span className={`fx-switch relative inline-flex h-6 w-11 rounded-full ${checked ? "is-checked" : ""}`} style={toneStyle(tone)}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} /></span>;
}

export function Progress({ tone = "primary", soft = false, value = 50 }: { tone?: "primary" | "secondary"; soft?: boolean; value?: number }) {
  return <div className="h-2 w-60 overflow-hidden rounded-full bg-muted" style={toneStyle(tone)}><div className="h-full rounded-full" style={{ width: `${value}%`, background: soft ? "var(--tone-border)" : "var(--tone)" }} /></div>;
}

export function Tabs({ tone = "primary", items = ["My account", "Orders", "Settings", "Notifications"] }: { tone?: "primary" | "secondary"; items?: string[] }) {
  return <div className="flex gap-8 border-b border-border text-sm" style={toneStyle(tone)}>{items.map((item, index) => <button key={item} className={`fx-tab pb-3 ${index === 2 ? "is-active" : "text-subtle"}`}>{item}</button>)}</div>;
}

export function Card({ title = "Orders", children }: { title?: string; children?: ReactNode }) {
  return <div className="rounded-2xl border border-border bg-elevated p-5 shadow-soft"><h3 className="text-base font-semibold">{title}</h3>{children ?? <p className="mt-2 text-2xl font-semibold">420</p>}</div>;
}

const bars = [52, 64, 48, 76, 46, 78, 58, 82];
export function BarChart({ stacked = false }: { stacked?: boolean }) {
  return <div className="flex h-48 items-end gap-4 border-b border-border pt-8">{bars.map((height, i) => <div key={i} className="flex w-8 items-end gap-1">{stacked ? <><span className="w-3" style={{ height: `${height * 0.55}%`, background: "var(--chart-1)" }} /><span className="w-3" style={{ height: `${height * 0.35}%`, background: "var(--chart-2)" }} /><span className="w-3" style={{ height: `${height * 0.2}%`, background: "var(--chart-3)" }} /></> : <><span className="w-3 rounded-t" style={{ height: `${height}%`, background: "var(--chart-1)" }} /><span className="w-3 rounded-t" style={{ height: `${height * 0.65}%`, background: "var(--chart-2)" }} /><span className="w-3 rounded-t" style={{ height: `${height * 0.35}%`, background: "var(--chart-3)" }} /></>}</div>)}</div>;
}

export function LineChart() {
  return <svg viewBox="0 0 420 180" className="h-48 w-full"><path d="M10 140 L45 100 L72 128 L105 68 L132 112 L170 50 L210 82 L248 42 L292 70 L328 38 L372 58 L410 48" fill="none" stroke="var(--chart-1)" strokeWidth="2" /><path d="M10 118 L45 104 L72 116 L105 92 L132 106 L170 74 L210 96 L248 70 L292 92 L328 76 L372 54 L410 76" fill="none" stroke="var(--chart-2)" strokeWidth="2" /><path d="M10 158 L45 126 L72 128 L105 140 L132 124 L170 98 L210 116 L248 104 L292 122 L328 104 L372 112 L410 92" fill="none" stroke="var(--chart-3)" strokeWidth="2" /></svg>;
}

export function DonutChart() {
  return <div className="mx-auto h-40 w-40 rounded-full" style={{ background: "conic-gradient(var(--chart-1) 0 48%, white 48% 51%, var(--chart-2) 51% 80%, white 80% 83%, var(--chart-3) 83% 100%)" }}><div className="relative left-8 top-8 grid h-24 w-24 place-items-center rounded-full bg-elevated font-semibold">$14,919</div></div>;
}

export function SearchInput() {
  return <label className="relative block max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" size={16} /><input className={`h-10 w-full rounded-md border border-border bg-elevated pl-10 pr-3 text-sm ${focusClass}`} placeholder="Search orders..." /></label>;
}
