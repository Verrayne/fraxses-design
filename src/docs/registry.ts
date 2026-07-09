import { Blocks, BookOpen, Component, Layers3, Palette } from "lucide-react";

export type DesignSystemId = "intenda" | "oryx";
export type DocSectionId = "overview" | "foundations" | "themes" | "components" | "patterns";
export type DocumentationStatus = "documented" | "not-documented-yet" | "source-identified" | "coming-soon" | "placeholder" | "new";

export type SystemRegistryMeta = {
  title?: string;
  status?: DocumentationStatus;
  sourceSection?: string;
  summary?: string;
  aliases?: string[];
};

export type RegistryItem = {
  title: string;
  slug: string;
  status?: DocumentationStatus;
  children?: RegistryItem[];
  systems?: Partial<Record<DesignSystemId, SystemRegistryMeta>>;
};

export type RegistrySection = {
  id: DocSectionId;
  title: string;
  icon: typeof BookOpen;
  items: RegistryItem[];
};

export const foundationRegistry: RegistryItem[] = [
  {
    title: "Colours",
    slug: "colours",
    systems: {
      oryx: {
        status: "source-identified",
        sourceSection: "Colours",
        summary: "Oryx colour foundations from the source design guide.",
      },
    },
  },
  {
    title: "Typography",
    slug: "typography",
    systems: {
      oryx: {
        title: "Fonts and Text Styling",
        status: "source-identified",
        sourceSection: "Fonts and Text Styling",
        aliases: ["Typography"],
        summary: "Oryx font choices, text styles and type hierarchy.",
      },
    },
  },
  {
    title: "Spacing",
    slug: "spacing",
    systems: {
      oryx: {
        title: "Padding and Styling",
        status: "source-identified",
        sourceSection: "Padding and Styling",
        aliases: ["Spacing"],
        summary: "Oryx padding, spacing and styling conventions.",
      },
    },
  },
  { title: "Radius", slug: "radius" },
  { title: "Shadows", slug: "shadows" },
  { title: "Iconography", slug: "iconography" },
];

export const themeRegistry: RegistryItem[] = [
  {
    title: "Intenda Light - Green",
    slug: "intenda-light-green",
    children: [{ title: "Colour Usage", slug: "colour-usage" }],
  },
  { title: "Midnight", slug: "midnight" },
  { title: "Intenda Light - Blue", slug: "intenda-light-blue", status: "coming-soon" },
];

export const componentRegistry: RegistryItem[] = [
  { title: "Buttons", slug: "buttons" },
  { title: "Inputs", slug: "inputs" },
  { title: "Selects", slug: "selects" },
  { title: "Tabs", slug: "tabs" },
  { title: "Tables", slug: "tables" },
  { title: "Cards", slug: "cards" },
  { title: "Badges", slug: "badges" },
  { title: "Modals", slug: "modals" },
  { title: "Toasts", slug: "toasts" },
  { title: "Navigation", slug: "navigation" },
  {
    title: "Explorer",
    slug: "explorer",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Explorer",
        summary: "Oryx explorer navigation and browsing interface patterns.",
      },
    },
  },
  {
    title: "Main Menu",
    slug: "main-menu",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Main Menu",
        summary: "Oryx main menu structure and navigation behaviour.",
      },
    },
  },
  {
    title: "Buttons and Lists",
    slug: "buttons-and-lists",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Buttons and Lists",
        aliases: ["Buttons", "Lists"],
        summary: "Oryx button treatments and list component conventions.",
      },
    },
  },
  {
    title: "Input Fields",
    slug: "input-fields",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Input Fields",
        aliases: ["Inputs"],
        summary: "Oryx text entry, field states and input layout conventions.",
      },
    },
  },
  {
    title: "Grids and Lists",
    slug: "grids-and-lists",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Grids and Lists",
        aliases: ["Tables", "Lists"],
        summary: "Oryx grid, table and list presentation patterns.",
      },
    },
  },
  {
    title: "Graphs and Charts",
    slug: "graphs-and-charts",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Graphs and Charts",
        summary: "Oryx chart and graph display patterns.",
      },
    },
  },
];

export const patternRegistry: RegistryItem[] = [
  { title: "Dashboard", slug: "dashboard" },
  { title: "Data Sources", slug: "data-sources" },
  { title: "Data Objects", slug: "data-objects" },
  { title: "Query Builder", slug: "query-builder" },
  {
    title: "Fullscreen Pages",
    slug: "fullscreen-pages",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Fullscreen Pages",
        summary: "Oryx full-screen page patterns for focused workflows.",
      },
    },
  },
  {
    title: "Blank",
    slug: "blank",
    systems: {
      intenda: { status: "not-documented-yet" },
      oryx: {
        status: "source-identified",
        sourceSection: "Blank",
        summary: "Oryx blank-state and empty page patterns.",
      },
    },
  },
];

export const docsRegistry: RegistrySection[] = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    items: [{ title: "Overview", slug: "overview" }],
  },
  {
    id: "foundations",
    title: "Foundations",
    icon: Layers3,
    items: foundationRegistry,
  },
  {
    id: "themes",
    title: "Themes",
    icon: Palette,
    items: themeRegistry,
  },
  {
    id: "components",
    title: "Components",
    icon: Component,
    items: componentRegistry,
  },
  {
    id: "patterns",
    title: "Patterns",
    icon: Blocks,
    items: patternRegistry,
  },
];

export function getRegistryItem(sectionId: DocSectionId, slug?: string) {
  const section = docsRegistry.find((item) => item.id === sectionId);
  return section?.items.find((item) => item.slug === slug);
}

export function getChildRegistryItem(sectionId: DocSectionId, slug?: string, childSlug?: string) {
  return getRegistryItem(sectionId, slug)?.children?.find((item) => item.slug === childSlug);
}

export function getSystemItemMeta(systemId: DesignSystemId, item?: RegistryItem) {
  return item?.systems?.[systemId];
}

export function getSystemItemTitle(systemId: DesignSystemId, item?: RegistryItem) {
  return getSystemItemMeta(systemId, item)?.title ?? item?.title;
}

export function getSystemItemStatus(systemId: DesignSystemId, item?: RegistryItem) {
  return getSystemItemMeta(systemId, item)?.status ?? item?.status;
}
