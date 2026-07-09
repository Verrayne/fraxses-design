export type ThemeToken = {
  label: string;
  value: string;
  cssVar: string;
  description: string;
};

export type ThemeDefinition = {
  id: "intenda-green" | "midnight" | "intenda-blue";
  name: string;
  description: string;
  status: "default" | "available" | "placeholder";
  className: string;
  tokens: ThemeToken[];
};

export const themes: ThemeDefinition[] = [
  {
    id: "intenda-green",
    name: "Intenda Light - Green",
    description:
      "The default Fraxses documentation theme. It uses deep green as the primary brand and action colour with warm sand contrast.",
    status: "default",
    className: "theme-intenda-green",
    tokens: [
      { label: "Canvas", value: "#f7fbfa", cssVar: "--color-canvas", description: "Canvas/data-object workspace background" },
      { label: "Background", value: "#ffffff", cssVar: "--color-background", description: "Application and page base" },
      { label: "Surface", value: "#f3f5f5", cssVar: "--color-surface", description: "Cards, panels, forms and grouped UI" },
      { label: "Surface hover", value: "#ffffff", cssVar: "--color-surface-hover", description: "Hoverable rows, buttons and floating surfaces" },
      { label: "Border", value: "#e3e7e7", cssVar: "--color-border", description: "Default dividers, strokes and inputs" },
      { label: "Border strong", value: "#d0d8d8", cssVar: "--color-border-strong", description: "High-emphasis borders and selected outlines" },
      { label: "Text strong", value: "#09090b", cssVar: "--color-text-strong", description: "Page titles and high-emphasis labels" },
      { label: "Text", value: "#18181b", cssVar: "--color-ink", description: "Normal body text" },
      { label: "Text muted", value: "#71717a", cssVar: "--color-text-muted", description: "Metadata and descriptions" },
      { label: "Text subtle", value: "#a1a1aa", cssVar: "--color-subtle", description: "Placeholders and low-emphasis helper text" },
      { label: "Primary", value: "#1A3636", cssVar: "--color-primary", description: "Main actions, active navigation and focus" },
      { label: "Primary hover", value: "#234848", cssVar: "--color-primary-hover", description: "Primary action hover state" },
      { label: "Primary subtle hover", value: "#e8ebeb", cssVar: "--color-primary-subtle-hover", description: "Subtle hover on green-tinted controls" },
      { label: "Primary active", value: "#d1d7d7", cssVar: "--color-primary-active", description: "Selected and active surfaces" },
      { label: "Primary contrast", value: "#D6BD98", cssVar: "--color-primary-contrast", description: "Warm sand contrast on primary surfaces" },
      { label: "Accent", value: "#1A3636", cssVar: "--color-accent", description: "Accent maps to primary in this theme" },
      { label: "Focus", value: "#1A3636", cssVar: "--color-focus", description: "Focus border and control accent" },
      { label: "Entity subtitle", value: "#D6BD98", cssVar: "--color-entity-subtitle", description: "Entity card subtitle accent" },
      { label: "Success", value: "#4E7A57", cssVar: "--color-success", description: "Fixed success foreground" },
      { label: "Warning", value: "#8A6A13", cssVar: "--color-warning", description: "Fixed warning foreground" },
      { label: "Danger", value: "#B76E79", cssVar: "--color-danger", description: "Fixed error/destructive foreground" },
    ],
  },
  {
    id: "midnight",
    name: "Midnight",
    description:
      "The dark Fraxses theme for dense operational screens and low-light work. It keeps green as the recognisable product accent while shifting contrast and elevation for dark surfaces.",
    status: "available",
    className: "theme-midnight",
    tokens: [
      { label: "Canvas", value: "#0c1110", cssVar: "--color-canvas", description: "Application background" },
      { label: "Surface", value: "#111817", cssVar: "--color-surface", description: "Primary content panels" },
      { label: "Elevated", value: "#17211f", cssVar: "--color-elevated", description: "Preview wells and subtle bands" },
      { label: "Border", value: "#273632", cssVar: "--color-border", description: "Dividers, strokes and inputs" },
      { label: "Muted", value: "#1e2b28", cssVar: "--color-muted", description: "Secondary controls and table headers" },
      { label: "Ink", value: "#edf5ef", cssVar: "--color-ink", description: "Primary text" },
      { label: "Subtle", value: "#9aaba1", cssVar: "--color-subtle", description: "Secondary text" },
      { label: "Primary", value: "#7cc58d", cssVar: "--color-primary", description: "Primary actions and active states" },
      { label: "Primary ink", value: "#08120c", cssVar: "--color-primary-ink", description: "Text on primary surfaces" },
      { label: "Accent", value: "#b7d77c", cssVar: "--color-accent", description: "Supporting emphasis" },
      { label: "Success", value: "#69d391", cssVar: "--color-success", description: "Positive status" },
      { label: "Warning", value: "#f0b35a", cssVar: "--color-warning", description: "Caution status" },
      { label: "Danger", value: "#ff8a80", cssVar: "--color-danger", description: "Destructive status" },
    ],
  },
  {
    id: "intenda-blue",
    name: "Intenda Light - Blue",
    description:
      "Placeholder for the planned blue variant. The route and page exist so implementation can be added once the final app tokens are approved.",
    status: "placeholder",
    className: "theme-intenda-green",
    tokens: [],
  },
];

export const spacingTokens = ["2", "4", "6", "8", "12", "16", "20", "24", "32", "40", "48", "64"];

export const radiusTokens = [
  { label: "sm", value: "4px", use: "Inputs, small tags" },
  { label: "md", value: "6px", use: "Buttons, controls, default cards" },
  { label: "lg", value: "8px", use: "Preview panels and larger cards" },
  { label: "xl", value: "12px", use: "Dialogs and empty states" },
];

export const shadowTokens = [
  { label: "soft", value: "0 8px 24px rgba(18, 32, 23, 0.08)", use: "Floating header and preview cards" },
  { label: "lifted", value: "0 18px 54px rgba(18, 32, 23, 0.14)", use: "Modals, popovers and toasts" },
];
