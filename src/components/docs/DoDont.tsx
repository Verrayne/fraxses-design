import Check from "lucide-react/dist/esm/icons/check.js";
import X from "lucide-react/dist/esm/icons/x.js";

export function DoDont({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base"><Check size={17} className="text-success" /> Do</h2>
        <ul className="space-y-2 text-sm text-subtle">{doItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base"><X size={17} className="text-danger" /> Don't</h2>
        <ul className="space-y-2 text-sm text-subtle">{dontItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
  );
}
