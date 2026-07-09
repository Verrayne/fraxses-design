import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ThemeProvider } from "./components/theme/ThemeProvider";

export function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-canvas text-ink">
        <Header />
        <div className={isHome ? "w-full" : "mx-auto grid w-full max-w-[1680px] grid-cols-1 lg:grid-cols-[292px_minmax(0,1fr)]"}>
          {!isHome && <Sidebar />}
          <main className={isHome ? "min-w-0" : "min-w-0 border-l border-border bg-surface/60"}>
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
