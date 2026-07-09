import { NavLink } from "react-router-dom";
import { routes } from "../../content/navigation";

export function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto bg-canvas px-4 py-6 lg:block">
      <nav className="space-y-7" aria-label="Design guide">
        {routes.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.title}>
              <div className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-subtle">
                <Icon size={15} />
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
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
                ))}
              </div>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
