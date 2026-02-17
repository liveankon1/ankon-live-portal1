"use client";

import { useMemo, useState } from "react";

const rand = (n: number) => Math.floor(Math.random() * n);
const hex = (n: number) => n.toString(16).padStart(2, "0");

const randomColor = () => `#${hex(rand(256))}${hex(rand(256))}${hex(rand(256))}`;

const makePalette = (base: string) => {
  const r = parseInt(base.slice(1, 3), 16);
  const g = parseInt(base.slice(3, 5), 16);
  const b = parseInt(base.slice(5, 7), 16);
  const offsets = [-70, -30, 0, 35, 75];
  return offsets.map((o) => {
    const nr = Math.max(0, Math.min(255, r + o));
    const ng = Math.max(0, Math.min(255, g + o));
    const nb = Math.max(0, Math.min(255, b + o));
    return `#${hex(nr)}${hex(ng)}${hex(nb)}`;
  });
};

export default function PaletteToolPage() {
  const [base, setBase] = useState("#22d3ee");
  const [copied, setCopied] = useState("");
  const palette = useMemo(() => makePalette(base), [base]);

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(""), 1000);
  };

  const randomize = () => setBase(randomColor());

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">Color Palette Lab</h1>
      <p className="mt-3 text-slate-300">Generate cinematic color systems and copy values instantly.</p>

      <div className="mt-7 rounded-2xl border border-cyan-300/25 bg-slate-900/50 p-5">
        <div className="flex flex-wrap items-end gap-4">
          <label className="text-sm text-slate-200">
            Base Color
            <input
              type="color"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="mt-2 h-10 w-32 rounded-lg border border-slate-600 bg-transparent"
            />
          </label>
          <button
            type="button"
            onClick={randomize}
            className="rounded-lg border border-fuchsia-300/35 bg-fuchsia-300/15 px-4 py-2 text-sm font-semibold text-fuchsia-100"
          >
            Randomize
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {palette.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => copy(c)}
              className="group rounded-xl border border-slate-600/40 bg-slate-950/70 p-3 text-left"
            >
              <div className="h-20 rounded-lg" style={{ background: c }} />
              <p className="mt-3 text-sm font-semibold text-slate-100">{c}</p>
              <p className="text-xs text-slate-400">{copied === c ? "Copied" : "Click to copy"}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
