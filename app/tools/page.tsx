"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type ToolCard = {
  title: string;
  description: string;
  href?: string;
  status: "ready" | "coming-soon";
};

const toolCards: ToolCard[] = [
  {
    title: "QR Code Generator",
    description: "Generate downloadable QR codes with color, size, and correction control.",
    href: "/tools/qr",
    status: "ready"
  },
  {
    title: "URL Shortener",
    description: "Create local short links, copy quickly, and keep a recent history.",
    href: "/tools/shortener",
    status: "ready"
  },
  {
    title: "Image Compressor",
    description: "Coming soon: compress images with quality presets and instant preview.",
    status: "coming-soon"
  },
  {
    title: "Color Palette Lab",
    description: "Coming soon: generate and export cinematic palette systems.",
    status: "coming-soon"
  },
  {
    title: "JSON Formatter",
    description: "Coming soon: format, validate, and compare JSON payloads.",
    status: "coming-soon"
  },
  {
    title: "Markdown Studio",
    description: "Coming soon: write markdown with live render and export options.",
    status: "coming-soon"
  }
];

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return toolCards;
    return toolCards.filter(
      (tool) => tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="rounded-3xl border border-slate-600/50 bg-slate-900/45 p-5 backdrop-blur-xl md:p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Tools Deck</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-50">Futuristic Utility Hub</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Launch practical tools with a premium interface. Ready tools are live, locked tiles are staged for upcoming releases.
        </p>

        <label className="mt-6 block text-sm text-slate-200">
          Search tools
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or feature..."
            className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-cyan-300/30 transition focus:ring-2"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <motion.article
            key={tool.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={tool.status === "ready" ? { y: -6 } : {}}
            className={`group relative overflow-hidden rounded-2xl border p-5 shadow-card ${
              tool.status === "ready"
                ? "border-cyan-300/30 bg-slate-900/55"
                : "border-slate-600/35 bg-slate-900/35 opacity-75"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 ${
                tool.status === "ready" ? "opacity-0 transition duration-300 group-hover:opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-color) 34%, transparent), transparent 60%)"
              }}
            />

            <div className="relative z-10">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-slate-100">{tool.title}</h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                    tool.status === "ready"
                      ? "border border-emerald-300/40 bg-emerald-300/15 text-emerald-100"
                      : "border border-slate-500/40 bg-slate-500/15 text-slate-200"
                  }`}
                >
                  {tool.status === "ready" ? "Ready" : "Locked"}
                </span>
              </div>

              <p className="text-sm text-slate-300">{tool.description}</p>

              {tool.href ? (
                <Link
                  href={tool.href}
                  className="mt-5 inline-flex rounded-lg border border-cyan-300/35 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:shadow-glow"
                >
                  Open Tool
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 inline-flex cursor-not-allowed rounded-lg border border-slate-500/40 bg-slate-600/20 px-4 py-2 text-sm font-semibold text-slate-300"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
