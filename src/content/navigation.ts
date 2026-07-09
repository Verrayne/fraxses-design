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

export const routes: NavSection[] = [
  {
    title: "Overview",
    icon: BookOpen,
    items: [{ title: "Overview", href: "/docs/overview" }],
  },
  {
    title: "Foundations",
    icon: Layers3,
    items: [
      { title: "Typography", href: "/docs/foundations/typography" },
      { title: "Spacing", href: "/docs/foundations/spacing" },
      { title: "Radius", href: "/docs/foundations/radius" },
      { title: "Shadows", href: "/docs/foundations/shadows" },
    ],
  },
  {
    title: "Themes",
    icon: Palette,
    items: [
      {
        title: "Intenda Light - Green",
        href: "/docs/themes/intenda-light-green",
        children: [
          {
            title: "Colour Usage",
            href: "/docs/themes/intenda-light-green/colour-usage",
            status: "new",
          },
        ],
      },
      { title: "Midnight", href: "/docs/themes/midnight" },
      {
        title: "Intenda Light - Blue",
        href: "/docs/themes/intenda-light-blue",
        status: "placeholder",
      },
    ],
  },
  {
    title: "Components",
    icon: Component,
    items: [
      { title: "Buttons", href: "/docs/components/buttons" },
      { title: "Inputs", href: "/docs/components/inputs" },
      { title: "Selects", href: "/docs/components/selects" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Tables", href: "/docs/components/tables" },
      { title: "Cards", href: "/docs/components/cards" },
      { title: "Badges", href: "/docs/components/badges" },
      { title: "Modals", href: "/docs/components/modals" },
      { title: "Toasts", href: "/docs/components/toasts" },
      { title: "Navigation", href: "/docs/components/navigation" },
    ],
  },
  {
    title: "Patterns",
    icon: Blocks,
    items: [
      { title: "Dashboard", href: "/docs/patterns/dashboard" },
      { title: "Data Sources", href: "/docs/patterns/data-sources" },
      { title: "Data Objects", href: "/docs/patterns/data-objects" },
      { title: "Query Builder", href: "/docs/patterns/query-builder" },
    ],
  },
  {
    title: "Resources",
    icon: GalleryVerticalEnd,
    items: [
      { title: "Figma Source", href: "/docs/resources/figma-source" },
      { title: "Contribution Notes", href: "/docs/resources/contribution-notes" },
    ],
  },
];

export const sectionIcons = {
  overview: Sparkles,
  foundations: Layers3,
  themes: Palette,
  components: Box,
  patterns: Blocks,
  resources: GalleryVerticalEnd,
};
