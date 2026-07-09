export function CodeBlock({ code }: { code: string }) {
  return (
    <section>
      <h2>Example Code</h2>
      <pre className="overflow-x-auto rounded-lg border border-border bg-ink p-4 text-sm text-canvas shadow-soft">
        <code>{code}</code>
      </pre>
    </section>
  );
}
