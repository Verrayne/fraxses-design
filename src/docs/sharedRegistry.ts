import { Box, Component, Layers, Palette, Shapes } from "lucide-react";

export const foundationItems = [
  "colours",
  "typography",
  "spacing",
  "radius",
  "shadows",
  "iconography",
  "accessibility",
];

export const componentItems = [
  "buttons",
  "badges",
  "avatars",
  "alerts",
  "callouts",
  "form-controls",
  "inputs",
  "selects",
  "textarea",
  "tabs",
  "progress",
  "links",
  "cards",
  "empty-states",
  "charts",
  "tables",
  "navigation",
  "modals",
  "toasts",
  "tooltips",
  "popovers",
  "dropdowns",
];

export const patternItems = [
  "dashboard",
  "forms",
  "data-tables",
  "settings",
  "empty-states",
  "feedback",
  "data-sources",
  "data-objects",
  "query-builder",
  "canvas",
];

export const docsNav = [
  { title: "Overview", icon: Box, items: [{ title: "Overview", href: "/docs/overview" }] },
  { title: "Foundations", icon: Palette, items: foundationItems.map((slug) => ({ title: labelFromSlug(slug), href: `/docs/foundations/${slug}` })) },
  { title: "Components", icon: Component, items: [{ title: "Overview", href: "/docs/components/overview" }, ...componentItems.map((slug) => ({ title: labelFromSlug(slug), href: `/docs/components/${slug}` }))] },
  { title: "Patterns", icon: Layers, items: patternItems.map((slug) => ({ title: labelFromSlug(slug), href: `/docs/patterns/${slug}` })) },
  { title: "Themes", icon: Shapes, items: ["forest", "oryx", "midnight", "ocean"].map((slug) => ({ title: labelFromSlug(slug), href: `/themes/${slug}` })) },
];

export function labelFromSlug(slug: string) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function redirectLegacyPath(pathname: string) {
  const match = pathname.match(/^\/docs\/(?:intenda|oryx)(?:\/(.+))?$/);
  if (!match) return null;
  const rest = match[1];
  if (!rest || rest === "overview") return "/docs/overview";
  const parts = rest.split("/");
  if (parts[0] === "themes") return parts[2] ? `/docs/foundations/colours` : "/themes/forest";
  return `/docs/${rest}`;
}
