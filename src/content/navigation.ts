import { Blocks, Box, GalleryVerticalEnd, Layers3, Palette, Sparkles } from "lucide-react";
import {
  docsRegistry,
  type DesignSystemId,
  type DocumentationStatus,
  type RegistryItem,
  type RegistrySection,
} from "../docs/registry";

export type { DesignSystemId };

export type NavItem = {
  title: string;
  href: string;
  status?: DocumentationStatus;
  children?: NavItem[];
};

export type NavSection = {
  title: string;
  icon: RegistrySection["icon"];
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

function itemToNavItem(systemId: DesignSystemId, sectionId: string, item: RegistryItem): NavItem {
  const href =
    sectionId === "overview"
      ? `/docs/${systemId}/overview`
      : `/docs/${systemId}/${sectionId}/${item.slug}`;

  return {
    title: item.title,
    href,
    status: item.status,
    children: item.children?.map((child) => ({
      title: child.title,
      href: `${href}/${child.slug}`,
      status: child.status,
    })),
  };
}

export function buildDesignSystemRoutes(systemId: DesignSystemId): NavSection[] {
  return docsRegistry.map((section) => ({
    title: section.title,
    icon: section.icon,
    items: section.items.map((item) => itemToNavItem(systemId, section.id, item)),
  }));
}

export const designSystems: Record<DesignSystemId, DesignSystemDefinition> = {
  intenda: {
    id: "intenda",
    name: "Intenda",
    description: "The modern Fraxses design system.",
    supportingText:
      "A token-driven design system focused on clear enterprise interfaces, data-heavy workflows and consistent theming.",
    overviewHref: "/docs/intenda/overview",
    themes: ["Intenda Light - Green", "Midnight", "Intenda Light - Blue (Coming soon)"],
    routes: buildDesignSystemRoutes("intenda"),
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
    routes: buildDesignSystemRoutes("oryx"),
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
