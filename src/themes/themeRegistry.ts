export const semanticTokenNames = [
  "background",
  "background-subtle",
  "surface",
  "surface-raised",
  "surface-hover",
  "surface-active",
  "surface-selected",
  "surface-disabled",
  "foreground",
  "foreground-strong",
  "foreground-muted",
  "foreground-subtle",
  "foreground-disabled",
  "foreground-inverse",
  "border",
  "border-subtle",
  "border-strong",
  "divider",
  "primary",
  "primary-hover",
  "primary-active",
  "primary-subtle",
  "primary-subtle-hover",
  "primary-border",
  "primary-foreground",
  "secondary",
  "secondary-hover",
  "secondary-active",
  "secondary-subtle",
  "secondary-subtle-hover",
  "secondary-border",
  "secondary-foreground",
  "neutral",
  "neutral-subtle",
  "neutral-border",
  "neutral-foreground",
  "success",
  "success-hover",
  "success-subtle",
  "success-border",
  "success-foreground",
  "warning",
  "warning-hover",
  "warning-subtle",
  "warning-border",
  "warning-foreground",
  "error",
  "error-hover",
  "error-subtle",
  "error-border",
  "error-foreground",
  "info",
  "info-hover",
  "info-subtle",
  "info-border",
  "info-foreground",
  "focus",
  "focus-ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "shadow-soft",
  "shadow-raised",
] as const;

export type SemanticTokenName = (typeof semanticTokenNames)[number];
export type SemanticTokens = Record<SemanticTokenName, string>;
export type Shade = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950";
export type PaletteFamily = {
  name: string;
  role: string;
  base: Shade;
  shades: Record<Shade, string>;
};

export type ThemeDefinition = {
  id: "forest" | "oryx" | "midnight" | "ocean";
  name: string;
  description: string;
  status: "Available" | "In progress";
  intent: string;
  palettes: PaletteFamily[];
  tokens: SemanticTokens;
  accessibilityStatus: string;
};

const forestPalettes: PaletteFamily[] = [
  { name: "Nandor", role: "Primary", base: "600", shades: { "50": "#F8FBFB", "100": "#F3F6F6", "200": "#E2E9E5", "300": "#CED9D3", "400": "#97AFA2", "500": "#648072", "600": "#40534C", "700": "#374941", "800": "#212C24", "900": "#141F19", "950": "#070E0A" } },
  { name: "Brandy", role: "Secondary", base: "300", shades: { "50": "#FAF7F2", "100": "#F3EDE1", "200": "#E7D9C1", "300": "#D6BD98", "400": "#C69F71", "500": "#BA8755", "600": "#AC744A", "700": "#8F5D3F", "800": "#744C38", "900": "#5E4030", "950": "#322018" } },
  { name: "Amazon", role: "Success", base: "500", shades: { "50": "#F2F7F2", "100": "#E0EBE0", "200": "#C3D7C5", "300": "#9BBA9F", "400": "#6F9876", "500": "#4E7A57", "600": "#3B6043", "700": "#2F4D37", "800": "#273E2D", "900": "#213326", "950": "#121C15" } },
  { name: "Brandy Punch", role: "Warning", base: "400", shades: { "50": "#FAF5EC", "100": "#F4E6CD", "200": "#EACD9E", "300": "#DDAB67", "400": "#D28C3C", "500": "#C3782F", "600": "#A85B26", "700": "#864322", "800": "#703723", "900": "#603023", "950": "#381710" } },
  { name: "Matrix", role: "Error", base: "600", shades: { "50": "#FBF6F5", "100": "#F8EAE8", "200": "#F2DAD6", "300": "#E9BFB8", "400": "#DA998F", "500": "#C9776A", "600": "#B76457", "700": "#964B3F", "800": "#7D4037", "900": "#693A33", "950": "#381B17" } },
];

const oryxPalettes: PaletteFamily[] = [
  { name: "Baltic Sea", role: "Primary", base: "800", shades: { "50": "#FAFAFA", "100": "#F3F3F6", "200": "#E2E1EA", "300": "#D1D0DC", "400": "#9A97B4", "500": "#6A6784", "600": "#4B4865", "700": "#3A384D", "800": "#272630", "900": "#16151E", "950": "#08070D" } },
  { name: "Gossamer", role: "Secondary", base: "600", shades: { "50": "#E2FEF3", "100": "#C2FAE4", "200": "#8BF4D0", "300": "#30E3B1", "400": "#25C69E", "500": "#09AA87", "600": "#008F73", "700": "#007561", "800": "#035E4F", "900": "#044E43", "950": "#012D28" } },
  { name: "Gallery", role: "Neutral", base: "100", shades: { "50": "#FAFAFA", "100": "#EFEFEF", "200": "#E6E6E6", "300": "#D6D6D6", "400": "#A5A5A5", "500": "#767676", "600": "#575757", "700": "#434343", "800": "#292929", "900": "#1A1A1A", "950": "#0A0A0A" } },
  { name: "Gossamer", role: "Success", base: "600", shades: { "50": "#EBFEF7", "100": "#D0FBEA", "200": "#A4F6DA", "300": "#6AEBC7", "400": "#2FD8AE", "500": "#0ABF98", "600": "#009F80", "700": "#007C67", "800": "#036252", "900": "#045045", "950": "#012D28" } },
  { name: "Ecstasy", role: "Warning", base: "500", shades: { "50": "#FFF7ED", "100": "#FEEDD6", "200": "#FCD8AC", "300": "#F9BC78", "400": "#F69541", "500": "#F37A21", "600": "#E45D12", "700": "#BD4611", "800": "#963816", "900": "#793015", "950": "#411609" } },
  { name: "Valencia", role: "Error", base: "600", shades: { "50": "#FEF2F2", "100": "#FEE2E2", "200": "#FFC9C9", "300": "#FDA5A4", "400": "#FA706F", "500": "#F14342", "600": "#E03231", "700": "#BB1B1A", "800": "#9A1B1A", "900": "#801D1C", "950": "#460909" } },
];

const p = (families: PaletteFamily[], role: string) => families.find((family) => family.role === role)!.shades;

function buildForestTokens(): SemanticTokens {
  const primary = p(forestPalettes, "Primary");
  const secondary = p(forestPalettes, "Secondary");
  const success = p(forestPalettes, "Success");
  const warning = p(forestPalettes, "Warning");
  const error = p(forestPalettes, "Error");
  return {
    "background": "#FFFDF8", "background-subtle": primary[100], "surface": primary[100], "surface-raised": "#FFFDF8", "surface-hover": primary[50], "surface-active": primary[200], "surface-selected": primary[300], "surface-disabled": primary[100],
    "foreground": primary[800], "foreground-strong": primary[800], "foreground-muted": primary[800], "foreground-subtle": primary[800], "foreground-disabled": primary[400], "foreground-inverse": "#FFFFFF",
    "border": primary[200], "border-subtle": primary[100], "border-strong": primary[300], "divider": primary[200],
    "primary": primary[600], "primary-hover": primary[700], "primary-active": primary[800], "primary-subtle": primary[50], "primary-subtle-hover": primary[100], "primary-border": primary[300], "primary-foreground": secondary[300],
    "secondary": secondary[300], "secondary-hover": secondary[400], "secondary-active": secondary[500], "secondary-subtle": secondary[100], "secondary-subtle-hover": secondary[200], "secondary-border": secondary[300], "secondary-foreground": primary[900],
    "neutral": primary[800], "neutral-subtle": primary[100], "neutral-border": primary[300], "neutral-foreground": secondary[300],
    "success": success[500], "success-hover": success[600], "success-subtle": success[50], "success-border": success[200], "success-foreground": success[700],
    "warning": warning[400], "warning-hover": warning[500], "warning-subtle": warning[50], "warning-border": warning[200], "warning-foreground": warning[700],
    "error": error[600], "error-hover": error[700], "error-subtle": error[50], "error-border": error[200], "error-foreground": error[600],
    "info": secondary[700], "info-hover": secondary[800], "info-subtle": secondary[50], "info-border": secondary[200], "info-foreground": secondary[700],
    "focus": primary[600], "focus-ring": "64 83 76 / 0.2",
    "chart-1": primary[500], "chart-2": secondary[300], "chart-3": primary[700], "chart-4": primary[300], "chart-5": secondary[500],
    "shadow-soft": "0 8px 24px rgba(18, 32, 23, 0.08)", "shadow-raised": "0 18px 54px rgba(18, 32, 23, 0.14)",
  };
}

function buildOryxTokens(): SemanticTokens {
  const primary = p(oryxPalettes, "Primary");
  const secondary = p(oryxPalettes, "Secondary");
  const neutral = p(oryxPalettes, "Neutral");
  const success = p(oryxPalettes, "Success");
  const warning = p(oryxPalettes, "Warning");
  const error = p(oryxPalettes, "Error");
  return {
    "background": "#FFFFFF", "background-subtle": neutral[50], "surface": neutral[50], "surface-raised": "#FFFFFF", "surface-hover": primary[100], "surface-active": primary[200], "surface-selected": primary[200], "surface-disabled": neutral[100],
    "foreground": primary[900], "foreground-strong": primary[950], "foreground-muted": primary[600], "foreground-subtle": neutral[600], "foreground-disabled": neutral[400], "foreground-inverse": "#FFFFFF",
    "border": neutral[200], "border-subtle": neutral[100], "border-strong": primary[300], "divider": neutral[200],
    "primary": primary[600], "primary-hover": primary[700], "primary-active": primary[800], "primary-subtle": primary[100], "primary-subtle-hover": primary[200], "primary-border": primary[400], "primary-foreground": "#FFFFFF",
    "secondary": secondary[500], "secondary-hover": secondary[600], "secondary-active": secondary[700], "secondary-subtle": secondary[100], "secondary-subtle-hover": secondary[200], "secondary-border": secondary[400], "secondary-foreground": "#031D1A",
    "neutral": neutral[600], "neutral-subtle": neutral[100], "neutral-border": neutral[300], "neutral-foreground": neutral[900],
    "success": success[600], "success-hover": success[700], "success-subtle": success[100], "success-border": success[300], "success-foreground": success[700],
    "warning": warning[500], "warning-hover": warning[600], "warning-subtle": warning[100], "warning-border": warning[300], "warning-foreground": warning[700],
    "error": error[600], "error-hover": error[700], "error-subtle": error[100], "error-border": error[300], "error-foreground": error[600],
    "info": primary[600], "info-hover": primary[700], "info-subtle": primary[100], "info-border": primary[300], "info-foreground": primary[700],
    "focus": primary[600], "focus-ring": "75 72 101 / 0.22",
    "chart-1": primary[500], "chart-2": secondary[500], "chart-3": primary[700], "chart-4": primary[300], "chart-5": secondary[300],
    "shadow-soft": "0 8px 24px rgba(39, 38, 48, 0.08)", "shadow-raised": "0 18px 54px rgba(39, 38, 48, 0.14)",
  };
}

const midnightTokens: SemanticTokens = {
  ...buildOryxTokens(),
  "background": "#0C1110", "background-subtle": "#111817", "surface": "#111817", "surface-raised": "#17211F", "surface-hover": "#1E2B28", "surface-active": "#273632", "surface-selected": "#273632", "surface-disabled": "#17211F",
  "foreground": "#EDF5EF", "foreground-strong": "#FFFFFF", "foreground-muted": "#C1D0C6", "foreground-subtle": "#9AABA1", "foreground-disabled": "#65756C", "foreground-inverse": "#08120C",
  "border": "#273632", "border-subtle": "#1E2B28", "border-strong": "#3A514A", "divider": "#273632",
  "primary": "#7CC58D", "primary-hover": "#69B87C", "primary-active": "#4E9A61", "primary-subtle": "#13281A", "primary-subtle-hover": "#193520", "primary-border": "#345D3D", "primary-foreground": "#08120C",
  "secondary": "#B7D77C", "secondary-hover": "#A6C86A", "secondary-active": "#8BAE4F", "secondary-subtle": "#283018", "secondary-subtle-hover": "#343D20", "secondary-border": "#5C7031", "secondary-foreground": "#08120C",
  "neutral": "#9AABA1", "neutral-subtle": "#17211F", "neutral-border": "#3A514A", "neutral-foreground": "#EDF5EF",
  "focus": "#7CC58D", "focus-ring": "124 197 141 / 0.28",
  "chart-1": "#7CC58D", "chart-2": "#B7D77C", "chart-3": "#69D391", "chart-4": "#8AA399", "chart-5": "#F0B35A",
  "shadow-soft": "0 8px 24px rgba(0, 0, 0, 0.28)", "shadow-raised": "0 18px 54px rgba(0, 0, 0, 0.42)",
};

// Final Ocean palette values are pending. These temporary blue-led tokens are isolated here.
const oceanTokens: SemanticTokens = {
  ...buildOryxTokens(),
  "primary": "#2563EB", "primary-hover": "#1D4ED8", "primary-active": "#1E40AF", "primary-subtle": "#EFF6FF", "primary-subtle-hover": "#DBEAFE", "primary-border": "#93C5FD",
  "secondary": "#0F766E", "secondary-hover": "#0F5F59", "secondary-active": "#134E4A", "secondary-subtle": "#ECFEFF", "secondary-subtle-hover": "#CFFAFE", "secondary-border": "#67E8F9",
  "focus": "#2563EB", "focus-ring": "37 99 235 / 0.22", "chart-1": "#2563EB", "chart-2": "#0EA5E9", "chart-3": "#0F766E", "chart-4": "#93C5FD", "chart-5": "#67E8F9",
};

export const themes: ThemeDefinition[] = [
  { id: "forest", name: "Forest", description: "A calm, natural light theme using deep green and warm neutral accents.", status: "Available", intent: "Natural, restrained and compact for enterprise data workflows.", palettes: forestPalettes, tokens: buildForestTokens(), accessibilityStatus: "Reference screenshots show labelled status treatment; exact contrast scores are not calculated in this project." },
  { id: "oryx", name: "Oryx", description: "A vivid light theme combining violet, turquoise and neutral supporting colours.", status: "Available", intent: "Violet-led identity with bright turquoise accents and dedicated neutral tones.", palettes: oryxPalettes, tokens: buildOryxTokens(), accessibilityStatus: "Reference screenshots show visible focus/status affordances; exact contrast scores are not calculated in this project." },
  { id: "midnight", name: "Midnight", description: "A moody and dark blue coloured theme with no light colours for dark environments.", status: "Available", intent: "Dark operational theme mapped into the shared semantic contract.", palettes: [], tokens: midnightTokens, accessibilityStatus: "Preserved from the existing dark theme and mapped to the shared token contract." },
  { id: "ocean", name: "Ocean", description: "A calm, natural light theme using deep blue and cool neutral accents", status: "In progress", intent: "Temporary blue-led implementation while final Ocean values are pending.", palettes: [], tokens: oceanTokens, accessibilityStatus: "Needs source verification: final Ocean palette and contrast review are pending." },
];

export function getTheme(id?: string) {
  return themes.find((theme) => theme.id === id) ?? themes[0];
}

export function validateThemeTokens() {
  const missing = themes.flatMap((theme) => semanticTokenNames.filter((token) => !theme.tokens[token]).map((token) => `${theme.name}: --${token}`));
  if (missing.length) {
    throw new Error(`Theme semantic token contract is incomplete:\n${missing.join("\n")}`);
  }
}
