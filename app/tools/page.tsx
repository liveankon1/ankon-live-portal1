"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Route } from "next";

type ToolCard = {
  title: string;
  description: string;
  href?: Route;
  status: "ready" | "coming-soon";
};

const toolCards: ToolCard[] = [
  {
    title: "Quantum QR Forge",
    description: "Generate high-fidelity QR codes with styling controls and instant export.",
    href: "/tools/qr",
    status: "ready"
  },
  {
    title: "Nebula Link Shortener",
    description: "Create ultra-fast local short links with copy/open actions and history.",
    href: "/tools/shortener",
    status: "ready"
  },
  {
    title: "Ankon Premiume Optimizer C++",
    description: "Brutal-cool release page with cinematic artwork and direct package download.",
    href: "/tools/optimizer",
    status: "ready"
  },
  {
    title: "Photon Image Compressor",
    description: "Compress images locally with quality presets and side-by-side visual preview.",
    href: "/tools/image-compressor",
    status: "ready"
  },
  {
    title: "Prism Palette Lab",
    description: "Generate cinematic color systems and copy production-ready hex palettes.",
    href: "/tools/palette",
    status: "ready"
  },
  {
    title: "Syntax JSON Forge",
    description: "Validate, format, minify, and clean JSON payloads in one panel.",
    href: "/tools/json",
    status: "ready"
  },
  {
    title: "Markdown Command Deck",
    description: "Write markdown with live preview and export workflow for notes/docs.",
    href: "/tools/markdown",
    status: "ready"
  },
  {
    title: "Password Generator",
    description: "Generate strong passwords with custom length and symbol policies.",
    status: "coming-soon"
  },
  {
    title: "Unit Converter",
    description: "Instantly convert length, weight, speed, temperature, and data units.",
    status: "coming-soon"
  },
  {
    title: "Base64 Toolbox",
    description: "Encode/decode Base64 strings and files for quick dev workflows.",
    status: "coming-soon"
  },
  {
    title: "UUID + Token Lab",
    description: "Generate UUID v4, nano IDs, and random secure tokens.",
    status: "coming-soon"
  },
  {
    title: "Regex Playground",
    description: "Test regex patterns live with match highlights and explanations.",
    status: "coming-soon"
  },
  {
    title: "Text Diff Checker",
    description: "Compare two text blocks and highlight exact line-level differences.",
    status: "coming-soon"
  },
  {
    title: "Meta Tag Preview",
    description: "Preview Open Graph, Twitter card, and SEO meta snippets.",
    status: "coming-soon"
  },
  {
    title: "Color Contrast Checker",
    description: "Check WCAG contrast ratios for text/background color pairs.",
    status: "coming-soon"
  },
  {
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to local/UTC date-time and back.",
    status: "coming-soon"
  },
  {
    title: "Cron Builder",
    description: "Build and validate cron expressions with human-readable output.",
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
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Ankon Systems</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-50">Ankon Futuristic Utility Hub</h1>
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
            whileHover={tool.status === "ready" ? { y: -7 } : { y: -2 }}
            className={`group relative overflow-hidden rounded-2xl border p-5 shadow-card ${
              tool.status === "ready"
                ? "border-emerald-300/35 bg-slate-900/55"
                : "border-rose-500/35 bg-slate-900/40"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 ${
                tool.status === "ready"
                  ? "opacity-0 transition duration-300 group-hover:opacity-100"
                  : "opacity-100"
              }`}
              style={{
                background:
                  tool.status === "ready"
                    ? "radial-gradient(circle at top right, rgba(16,185,129,0.34), rgba(16,185,129,0.05), transparent 60%)"
                    : "linear-gradient(120deg, rgba(244,63,94,0.20), rgba(127,29,29,0.06), rgba(244,63,94,0.20))"
              }}
            />

            <div className="relative z-10">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-slate-100">{tool.title}</h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                    tool.status === "ready"
                      ? "border border-emerald-300/45 bg-emerald-300/20 text-emerald-100"
                      : "border border-rose-300/45 bg-rose-400/20 text-rose-100"
                  }`}
                >
                  {tool.status === "ready" ? "Ready" : "Locked"}
                </span>
              </div>

              <p className="text-sm text-slate-300">{tool.description}</p>

              {tool.href ? (
                <Link
                  href={tool.href}
                  className="mt-5 inline-flex rounded-lg border border-emerald-300/40 bg-emerald-300/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                >
                  Open Tool
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 inline-flex cursor-not-allowed rounded-lg border border-rose-300/35 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-100"
                >
                  Locked - Coming Soon
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
