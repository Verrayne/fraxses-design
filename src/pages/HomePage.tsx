import { ArrowRight, Layers3, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { designSystems } from "../content/navigation";

export function HomePage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl px-6 py-14 lg:px-10">
      <section className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Fraxses</p>
        <h1>Fraxses Design</h1>
        <p className="mt-5 text-lg leading-8 text-subtle">
          Design systems, components and interaction patterns for Fraxses product interfaces.
        </p>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <DesignSystemCard systemId="intenda" />
        <DesignSystemCard systemId="oryx" />
      </section>
    </main>
  );
}

function DesignSystemCard({ systemId }: { systemId: "intenda" | "oryx" }) {
  const system = designSystems[systemId];

  return (
    <article className="rounded-lg border border-border bg-surface p-6 shadow-soft transition hover:border-primary">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-5 grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-ink">
            {systemId === "intenda" ? <Palette size={20} /> : <Layers3 size={20} />}
          </div>
          <h2 className="text-2xl">{system.name}</h2>
          <p className="mt-2 font-medium text-ink">{system.description}</p>
        </div>
      </div>
      <p className="mt-5 leading-7 text-subtle">{system.supportingText}</p>
      {system.themes && (
        <div className="mt-6 rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-semibold">Available themes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {system.themes.map((theme) => (
              <span key={theme} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-subtle">
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}
      <Link
        to={system.overviewHref}
        className="mt-7 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-ink transition hover:brightness-95"
      >
        View {system.name}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
