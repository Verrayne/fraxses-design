import { PropsWithChildren } from "react";

export function PreviewCard({ title = "Live Preview", children }: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-soft">
      <div className="border-b border-border px-4 py-3 text-sm font-medium text-subtle">{title}</div>
      <div className="preview-gradient p-5">
        {children}
      </div>
    </div>
  );
}
