export type ColourTokenUsage = {
  token: string;
  value: string;
  cssVar?: string;
  usage: string;
  example: "button" | "hover" | "selected" | "contrast" | "surface" | "input" | "canvas" | "text" | "border" | "focus" | "badge" | "toast" | "entity";
};

export type ColourUsageSection = {
  id: string;
  title: string;
  description: string;
  guidance?: string[];
  tokens: ColourTokenUsage[];
};

export const intendaLightGreenColourUsage: ColourUsageSection[] = [
  {
    id: "primary",
    title: "Primary colour",
    description:
      "Deep green is the primary brand and action colour. It anchors selected navigation, main calls to action, control accents and focus states.",
    guidance: [
      "Use Primary for main actions, active navigation, selected states, focus states and brand marks.",
      "Use Primary for checkbox, radio and range accent colour.",
      "Use Primary Contrast only on top of Primary where the intended contrast is sufficient.",
    ],
    tokens: [
      {
        token: "Primary / Accent",
        value: "#1A3636",
        cssVar: "--color-primary / --color-accent",
        usage: "Main actions, active navigation, focus colour, selected control accents and brand marks.",
        example: "button",
      },
      {
        token: "Primary Hover",
        value: "#234848",
        cssVar: "--color-primary-hover",
        usage: "Hover state for filled primary actions and high-emphasis green surfaces.",
        example: "hover",
      },
      {
        token: "Primary Subtle Hover",
        value: "#e8ebeb",
        cssVar: "--color-primary-subtle-hover",
        usage: "Subtle hover background for ghost buttons, table rows and low-emphasis navigation.",
        example: "surface",
      },
      {
        token: "Primary Active / Selected",
        value: "#d1d7d7",
        cssVar: "--color-primary-active",
        usage: "Selected rows, active filter chips and pressed states.",
        example: "selected",
      },
      {
        token: "Primary Contrast",
        value: "#D6BD98",
        cssVar: "--color-primary-contrast",
        usage: "Warm sand text or detail on deep primary surfaces only.",
        example: "contrast",
      },
    ],
  },
  {
    id: "background-surfaces",
    title: "Background and surfaces",
    description:
      "Light neutral surfaces create the Fraxses page hierarchy. Use them for structure before reaching for colour.",
    tokens: [
      {
        token: "Background",
        value: "#ffffff",
        cssVar: "--color-background",
        usage: "App and page base.",
        example: "surface",
      },
      {
        token: "Surface",
        value: "#f3f5f5",
        cssVar: "--color-surface",
        usage: "Cards, panels, forms and grouped UI.",
        example: "surface",
      },
      {
        token: "Surface Hover",
        value: "#ffffff",
        cssVar: "--color-surface-hover",
        usage: "Hoverable rows, buttons and floating surfaces.",
        example: "hover",
      },
      {
        token: "Input",
        value: "#ffffff",
        usage: "Input fields use the Background token with Border and Focus states.",
        example: "input",
      },
      {
        token: "Canvas Background",
        value: "#f7fbfa",
        cssVar: "--color-canvas",
        usage: "Reserved for canvas and data-object workspaces.",
        example: "canvas",
      },
    ],
  },
  {
    id: "text",
    title: "Text colours",
    description:
      "Text colour should express hierarchy. Strong labels and headings need more contrast than descriptions and helper text.",
    tokens: [
      {
        token: "Text Strong",
        value: "#09090b",
        cssVar: "--color-text-strong",
        usage: "Page titles, section headings and high-emphasis labels.",
        example: "text",
      },
      {
        token: "Text",
        value: "#18181b",
        cssVar: "--color-ink",
        usage: "Normal body text and default labels.",
        example: "text",
      },
      {
        token: "Text Muted",
        value: "#71717a",
        cssVar: "--color-text-muted",
        usage: "Supporting metadata, timestamps and descriptions.",
        example: "text",
      },
      {
        token: "Text Subtle",
        value: "#a1a1aa",
        cssVar: "--color-subtle",
        usage: "Placeholders, low-emphasis helper text and disabled-adjacent copy.",
        example: "text",
      },
    ],
  },
  {
    id: "borders-focus",
    title: "Borders and focus",
    description:
      "Borders define structure without adding visual noise. Focus states use the same deep green as primary actions.",
    tokens: [
      {
        token: "Border",
        value: "#e3e7e7",
        cssVar: "--color-border",
        usage: "Default borders, dividers, input outlines and table separators.",
        example: "border",
      },
      {
        token: "Border Strong",
        value: "#d0d8d8",
        cssVar: "--color-border-strong",
        usage: "Higher-emphasis boundaries, selected outlines and dense UI separation.",
        example: "border",
      },
      {
        token: "Focus",
        value: "#1A3636",
        cssVar: "--color-focus",
        usage: "Focused input borders, keyboard focus and control accents.",
        example: "focus",
      },
      {
        token: "Focus Ring",
        value: "rgb(26 54 54 / 0.18)",
        cssVar: "--color-focus-ring",
        usage: "Accessible focus ring around controls.",
        example: "focus",
      },
    ],
  },
  {
    id: "canvas",
    title: "Canvas colours",
    description:
      "Canvas colours are reserved for canvas-style interfaces and data-object workspaces. They should not be used randomly across standard documentation or app pages.",
    tokens: [
      {
        token: "Canvas Background",
        value: "#f7fbfa",
        cssVar: "--color-canvas",
        usage: "Canvas and node-editor workspace base.",
        example: "canvas",
      },
      {
        token: "Canvas Dot",
        value: "rgb(26 54 54 / 0.13)",
        cssVar: "--color-canvas-dot",
        usage: "Subtle canvas grid or dotted workspace texture.",
        example: "canvas",
      },
      {
        token: "Canvas Wash",
        value: "#f7fbfa",
        usage: "A reserved alias of Canvas Background for broad canvas wash areas.",
        example: "canvas",
      },
      {
        token: "Entity Subtitle",
        value: "#D6BD98",
        cssVar: "--color-entity-subtitle",
        usage: "Subtitle accent on canvas entity cards.",
        example: "entity",
      },
    ],
  },
];

export const fixedSystemColours: ColourTokenUsage[] = [
  {
    token: "Success",
    value: "#4E7A57 / #E7F1E8",
    cssVar: "--color-success / --color-success-bg",
    usage: "Completed, healthy or positive system state.",
    example: "badge",
  },
  {
    token: "Warning",
    value: "#8A6A13 / #FFF6DB",
    cssVar: "--color-warning / --color-warning-bg",
    usage: "Caution, delayed syncs or states that need review.",
    example: "badge",
  },
  {
    token: "Error",
    value: "#B76E79 / #F8E9EC",
    cssVar: "--color-danger / --color-danger-bg",
    usage: "Errors, destructive states and failed operations.",
    example: "badge",
  },
  {
    token: "Info",
    value: "#315C9F / #E8EEF9",
    cssVar: "--color-info / --color-info-bg",
    usage: "Neutral informational notices and guidance.",
    example: "badge",
  },
];

export const colourUsageDoDont = {
  doItems: [
    "Use Primary for selected navigation.",
    "Use Error for destructive states.",
    "Use muted text for metadata.",
    "Use canvas colours only in canvas-style workspaces.",
  ],
  dontItems: [
    "Do not use Primary for success messages.",
    "Do not use Error just because something needs attention.",
    "Do not use subtle text for important labels.",
    "Do not use Canvas Dot as decoration on standard pages.",
  ],
};
