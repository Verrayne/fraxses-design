import { NavLink } from "react-router-dom";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import { useState } from "react";
import { docsNav } from "../../docs/sharedRegistry";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { useTheme } from "../theme/ThemeProvider";

export function Sidebar() {
  const { activeTheme } = useTheme();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const toggleSection = (title: string) => setCollapsedSections((current) => ({ ...current, [title]: !current[title] }));

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto bg-elevated py-6 lg:block">
      <div className="mb-7 border-b border-border bg-elevated px-4 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Active theme</p>
        <p className="mt-1 text-lg font-semibold text-ink">{activeTheme.name}</p>
        <p className="mt-1 text-sm leading-6 text-subtle">{activeTheme.description}</p>
        <div className="mt-3">
          <ThemeSwitcher />
        </div>
      </div>
      <nav className="space-y-4 px-2" aria-label="Design guide">
        {docsNav.map((section) => {
          const Icon = section.icon;
          const isCollapsed = collapsedSections[section.title] ?? false;
          return (
            <section key={section.title}>
              <button
                className="fx-sidebar-section-button mb-2 flex h-8 w-full items-center gap-2 rounded-lg px-2 text-xs font-semibold uppercase tracking-[0.08em] text-subtle transition"
                type="button"
                aria-expanded={!isCollapsed}
                onClick={() => toggleSection(section.title)}
              >
                <Icon size={15} />
                <span>{section.title}</span>
                <ChevronDown className={isCollapsed ? "ml-auto" : "ml-auto fx-sidebar-chevron-open"} size={14} />
              </button>
              {!isCollapsed && (
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        [
                          "fx-sidebar-link flex h-9 items-center justify-between rounded-lg px-3 py-2 text-sm leading-5 transition",
                          isActive ? "is-active font-semibold" : "text-subtle",
                        ].join(" ")
                      }
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
