import { Blocks, BookOpen, Component, Layers3, Palette } from "lucide-react";

export type DesignSystemId = "intenda" | "oryx";
export type DocSectionId = "overview" | "foundations" | "themes" | "components" | "patterns";
export type DocumentationStatus = "documented" | "not-documented-yet" | "coming-soon" | "placeholder" | "new";

export type RegistryItem = {
  title: string;
  slug: string;
  status?: DocumentationStatus;
  children?: RegistryItem[];
};

export type RegistrySection = {
  id: DocSectionId;
  title: string;
  icon: typeof BookOpen;
  items: RegistryItem[];
};

export const foundationRegistry: RegistryItem[] = [
  { title: "Colours", slug: "colours" },
  { title: "Typography", slug: "typography" },
  { title: "Spacing", slug: "spacing" },
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
];

export const patternRegistry: RegistryItem[] = [
  { title: "Dashboard", slug: "dashboard" },
  { title: "Data Sources", slug: "data-sources" },
  { title: "Data Objects", slug: "data-objects" },
  { title: "Query Builder", slug: "query-builder" },
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
