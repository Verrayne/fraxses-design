import {
  Blocks,
  BookOpen,
  Box,
  Component,
  GalleryVerticalEnd,
  Layers3,
  Palette,
  Sparkles,
} from "lucide-react";

export type DesignSystemId = "intenda" | "oryx";

export type NavItem = {
  title: string;
  href: string;
  status?: "placeholder" | "new";
  children?: NavItem[];
};

export type NavSection = {
  title: string;
  icon: typeof BookOpen;
  items: NavItem[];
};

export type DesignSystemDefinition = {
  id: DesignSystemId;
  name: string;
  description: string;
  supportingText: string;
  overviewHref: string;
  sourceUrl?: string;
  themes?: string[];
  routes: NavSection[];
};

export const intendaRoutes: NavSection[] = [
  {
    title: "Overview",
    icon: BookOpen,
    items: [{ title: "Overview", href: "/docs/intenda/overview" }],
  },
  {
    title: "Foundations",
    icon: Layers3,
    items: [
      { title: "Colours", href: "/docs/intenda/foundations/colours" },
      { title: "Typography", href: "/docs/intenda/foundations/typography" },
      { title: "Spacing", href: "/docs/intenda/foundations/spacing" },
      { title: "Radius", href: "/docs/intenda/foundations/radius" },
      { title: "Shadows", href: "/docs/intenda/foundations/shadows" },
    ],
  },
  {
    title: "Themes",
    icon: Palette,
    items: [
      {
        title: "Intenda Light - Green",
        href: "/docs/intenda/themes/intenda-light-green",
        children: [
          {
            title: "Colour Usage",
            href: "/docs/intenda/themes/intenda-light-green/colour-usage",
            status: "new",
          },
        ],
      },
      { title: "Midnight", href: "/docs/intenda/themes/midnight" },
      {
        title: "Intenda Light - Blue",
        href: "/docs/intenda/themes/intenda-light-blue",
        status: "placeholder",
      },
    ],
  },
  {
    title: "Components",
    icon: Component,
    items: [
      { title: "Buttons", href: "/docs/intenda/components/buttons" },
      { title: "Inputs", href: "/docs/intenda/components/inputs" },
      { title: "Selects", href: "/docs/intenda/components/selects" },
      { title: "Tabs", href: "/docs/intenda/components/tabs" },
      { title: "Tables", href: "/docs/intenda/components/tables" },
      { title: "Cards", href: "/docs/intenda/components/cards" },
      { title: "Badges", href: "/docs/intenda/components/badges" },
      { title: "Modals", href: "/docs/intenda/components/modals" },
      { title: "Toasts", href: "/docs/intenda/components/toasts" },
      { title: "Navigation", href: "/docs/intenda/components/navigation" },
    ],
  },
  {
    title: "Patterns",
    icon: Blocks,
    items: [
      { title: "Dashboard", href: "/docs/intenda/patterns/dashboard" },
      { title: "Data Sources", href: "/docs/intenda/patterns/data-sources" },
      { title: "Data Objects", href: "/docs/intenda/patterns/data-objects" },
      { title: "Query Builder", href: "/docs/intenda/patterns/query-builder" },
    ],
  },
];

export const oryxRoutes: NavSection[] = [
  {
    title: "Overview",
    icon: BookOpen,
    items: [{ title: "Overview", href: "/docs/oryx/overview" }],
  },
  {
    title: "Foundations",
    icon: Layers3,
    items: [
      { title: "Colours", href: "/docs/oryx/foundations/colours" },
      { title: "Typography", href: "/docs/oryx/foundations/typography" },
      { title: "Spacing", href: "/docs/oryx/foundations/spacing" },
      { title: "Radius", href: "/docs/oryx/foundations/radius" },
      { title: "Shadows", href: "/docs/oryx/foundations/shadows" },
      { title: "Iconography", href: "/docs/oryx/foundations/iconography" },
    ],
  },
  {
    title: "Components",
    icon: Component,
    items: [
      { title: "Buttons", href: "/docs/oryx/components/buttons" },
      { title: "Inputs", href: "/docs/oryx/components/inputs" },
      { title: "Selects", href: "/docs/oryx/components/selects" },
      { title: "Tabs", href: "/docs/oryx/components/tabs" },
      { title: "Tables", href: "/docs/oryx/components/tables" },
      { title: "Cards", href: "/docs/oryx/components/cards" },
      { title: "Badges", href: "/docs/oryx/components/badges" },
      { title: "Modals", href: "/docs/oryx/components/modals" },
      { title: "Toasts", href: "/docs/oryx/components/toasts" },
      { title: "Navigation", href: "/docs/oryx/components/navigation" },
    ],
  },
  {
    title: "Patterns",
    icon: Blocks,
    items: [
      { title: "Dashboard", href: "/docs/oryx/patterns/dashboard" },
      { title: "Data Sources", href: "/docs/oryx/patterns/data-sources" },
      { title: "Data Objects", href: "/docs/oryx/patterns/data-objects" },
    ],
  },
];

export const designSystems: Record<DesignSystemId, DesignSystemDefinition> = {
  intenda: {
    id: "intenda",
    name: "Intenda",
    description: "The modern Fraxses design system.",
    supportingText:
      "A token-driven design system focused on clear enterprise interfaces, data-heavy workflows and consistent theming.",
    overviewHref: "/docs/intenda/overview",
    themes: ["Intenda Light - Green", "Midnight", "Intenda Light - Blue (Coming soon)"],
    routes: intendaRoutes,
  },
  oryx: {
    id: "oryx",
    name: "Oryx",
    description: "The established Fraxses design system.",
    supportingText:
      "The existing Fraxses visual language and component library documented from the Oryx design guide.",
    overviewHref: "/docs/oryx/overview",
    sourceUrl:
      "https://www.figma.com/design/swjGUNj0dztirocm1n5e7j/Design-Guide?node-id=36-2&p=f&t=R74OpPXpqIYKdHuZ-0",
    routes: oryxRoutes,
  },
};

export const sectionIcons = {
  overview: Sparkles,
  foundations: Layers3,
  themes: Palette,
  components: Box,
  patterns: Blocks,
  resources: GalleryVerticalEnd,
};
