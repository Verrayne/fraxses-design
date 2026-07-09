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
      "The default Fraxses documentation theme. It uses a quiet light canvas, crisp ink, and a restrained green accent for selected, active and confirming states.",
    status: "default",
    className: "theme-intenda-green",
    tokens: [
      { label: "Canvas", value: "#f6f8f5", cssVar: "--color-canvas", description: "Application background" },
      { label: "Surface", value: "#ffffff", cssVar: "--color-surface", description: "Primary content panels" },
      { label: "Elevated", value: "#f0f5ee", cssVar: "--color-elevated", description: "Preview wells and subtle bands" },
      { label: "Border", value: "#d8e2d4", cssVar: "--color-border", description: "Dividers, strokes and inputs" },
      { label: "Muted", value: "#e8efe5", cssVar: "--color-muted", description: "Secondary controls and table headers" },
      { label: "Ink", value: "#122017", cssVar: "--color-ink", description: "Primary text" },
      { label: "Subtle", value: "#5c6c61", cssVar: "--color-subtle", description: "Secondary text" },
      { label: "Primary", value: "#266b46", cssVar: "--color-primary", description: "Primary actions and active states" },
      { label: "Primary ink", value: "#f7fff8", cssVar: "--color-primary-ink", description: "Text on primary surfaces" },
      { label: "Accent", value: "#8fbf50", cssVar: "--color-accent", description: "Supporting emphasis" },
      { label: "Success", value: "#18794e", cssVar: "--color-success", description: "Positive status" },
      { label: "Warning", value: "#ad6b00", cssVar: "--color-warning", description: "Caution status" },
      { label: "Danger", value: "#b42318", cssVar: "--color-danger", description: "Destructive status" },
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
