import { ChevronDown } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { designSystems, type DesignSystemId } from "../../content/navigation";

export function Sidebar() {
  const navigate = useNavigate();
  const { designSystem } = useParams();
  const activeDesignSystemId: DesignSystemId = designSystem === "oryx" ? "oryx" : "intenda";
  const activeDesignSystem = designSystems[activeDesignSystemId];

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto bg-canvas px-4 py-6 lg:block">
      <div className="mb-7">
        <label className="mb-2 block px-2 text-xs font-semibold uppercase tracking-[0.08em] text-subtle">
          Design system
        </label>
        <div className="relative">
          <select
            className="h-10 w-full appearance-none rounded-md border border-border bg-surface px-3 pr-9 text-sm font-semibold text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            value={activeDesignSystemId}
            onChange={(event) => navigate(designSystems[event.target.value as DesignSystemId].overviewHref)}
            aria-label="Design system"
          >
            {Object.values(designSystems).map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtle" size={16} />
        </div>
      </div>
      <nav className="space-y-7" aria-label="Design guide">
        <div className="px-2">
          <p className="text-lg font-semibold text-ink">{activeDesignSystem.name}</p>
          <p className="mt-1 text-sm leading-6 text-subtle">{activeDesignSystem.description}</p>
        </div>
        {activeDesignSystem.routes.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.title}>
              <div className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-subtle">
                <Icon size={15} />
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        [
                          "flex items-center justify-between rounded-md px-3 py-2 text-sm transition",
                          isActive
                            ? "bg-primary text-primary-ink shadow-soft"
                            : "text-subtle hover:bg-elevated hover:text-ink",
                        ].join(" ")
                      }
                    >
                      <span>{item.title}</span>
                      {item.status === "placeholder" && (
                        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase">Soon</span>
                      )}
                    </NavLink>
                    {item.children && (
                      <div className="mt-1 space-y-1 border-l border-border pl-3 ml-3">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            className={({ isActive }) =>
                              [
                                "flex items-center justify-between rounded-md px-3 py-1.5 text-[13px] transition",
                                isActive
                                  ? "bg-primary text-primary-ink shadow-soft"
                                  : "text-subtle hover:bg-elevated hover:text-ink",
                              ].join(" ")
                            }
                          >
                            <span>{child.title}</span>
                            {child.status === "new" && (
                              <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase">New</span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
