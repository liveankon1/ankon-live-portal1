"use client";

import { useMemo, useState } from "react";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderBasicMarkdown = (raw: string) => {
  const escaped = escapeHtml(raw);
  return escaped
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br/>");
};

export default function MarkdownToolPage() {
  const [markdown, setMarkdown] = useState("# Markdown Studio\n\nWrite **markdown** and preview in real-time.");
  const html = useMemo(() => renderBasicMarkdown(markdown), [markdown]);

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.md";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">Markdown Studio</h1>
      <p className="mt-3 text-slate-300">Write markdown and preview instantly.</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Editor</h2>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={16}
            className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 font-mono text-sm text-slate-100"
          />
          <button
            type="button"
            onClick={download}
            className="mt-4 rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-3 py-2 text-sm font-semibold text-cyan-100"
          >
            Export .md
          </button>
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Preview</h2>
          <div
            className="prose prose-invert mt-3 max-w-none rounded-lg border border-slate-700 bg-slate-950 p-4 text-slate-100"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </section>
  );
}
