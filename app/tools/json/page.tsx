"use client";

import { useState } from "react";

export default function JsonToolPage() {
  const [input, setInput] = useState('{"name":"Ankon","stack":["Next.js","TypeScript"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = (mode: "pretty" | "minify") => {
    try {
      const parsed = JSON.parse(input);
      setOutput(mode === "pretty" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">JSON Formatter</h1>
      <p className="mt-3 text-slate-300">Validate, format, minify, and copy JSON quickly.</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Input</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 font-mono text-sm text-slate-100"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => formatJson("pretty")}
              className="rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-3 py-2 text-sm font-semibold text-cyan-100"
            >
              Format
            </button>
            <button
              type="button"
              onClick={() => formatJson("minify")}
              className="rounded-lg border border-fuchsia-300/35 bg-fuchsia-300/15 px-3 py-2 text-sm font-semibold text-fuchsia-100"
            >
              Minify
            </button>
          </div>
          {error ? <p className="mt-3 text-sm text-rose-300">Invalid JSON: {error}</p> : null}
        </article>

        <article className="rounded-2xl border border-slate-600/50 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Output</h2>
          <textarea
            value={output}
            readOnly
            rows={16}
            className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 font-mono text-sm text-slate-100"
          />
          <button
            type="button"
            onClick={copyOutput}
            disabled={!output}
            className="mt-4 rounded-lg border border-emerald-300/35 bg-emerald-300/15 px-3 py-2 text-sm font-semibold text-emerald-100 disabled:opacity-50"
          >
            Copy Output
          </button>
        </article>
      </div>
    </section>
  );
}
