"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Route } from "next";

type ToolCard = {
  title: string;
  description: string;
  href?: Route;
  status: "ready" | "coming-soon";
  badge?: "Top Rated" | "Most Used";
};

type Review = {
  name: string;
  role: string;
  text: string;
  stars: 4 | 5;
};

const toolCards: ToolCard[] = [
  {
    title: "QR Code Maker",
    description: "Create QR codes quickly with color and export controls.",
    href: "/tools/qr",
    status: "ready"
  },
  {
    title: "Link Shortener",
    description: "Make short links with copy/open actions and history.",
    href: "/tools/shortener",
    status: "ready"
  },
  {
    title: "Password Generator",
    description: "Generate strong passwords and check password security level.",
    href: "/tools/password",
    status: "ready",
    badge: "Top Rated"
  },
  {
    title: "Smart Calculator",
    description: "All-in-one calculator with expression mode and graph plotting.",
    href: "/tools/calculator",
    status: "ready",
    badge: "Most Used"
  },
  {
    title: "Ankon Premiume Optimizer C++",
    description: "Cinematic release page with direct package download.",
    href: "/tools/optimizer",
    status: "ready"
  },
  {
    title: "Image Compressor",
    description: "Compress images locally with quality and preview controls.",
    href: "/tools/image-compressor",
    status: "ready"
  },
  {
    title: "Color Palette Generator",
    description: "Generate color palettes and copy hex combinations fast.",
    href: "/tools/palette",
    status: "ready"
  },
  {
    title: "JSON Formatter",
    description: "Validate, format, and minify JSON quickly.",
    href: "/tools/json",
    status: "ready"
  },
  {
    title: "Markdown Editor",
    description: "Write markdown with live preview and clean export flow.",
    href: "/tools/markdown",
    status: "ready"
  },
  {
    title: "Unit Converter",
    description: "Convert distance, speed, temperature, and data units.",
    status: "coming-soon"
  },
  {
    title: "Base64 Toolbox",
    description: "Encode/decode Base64 strings and files.",
    status: "coming-soon"
  },
  {
    title: "UUID + Token Lab",
    description: "Generate UUIDs, IDs, and secure random tokens.",
    status: "coming-soon"
  },
  {
    title: "Regex Playground",
    description: "Test regex and see live match highlights.",
    status: "coming-soon"
  },
  {
    title: "Text Diff Checker",
    description: "Compare two texts and highlight line differences.",
    status: "coming-soon"
  }
];

const reviewPool: Review[] = [
  { name: "Riya S.", role: "Student Developer", text: "Password Generator and JSON Formatter saved me a lot of time.", stars: 5 },
  { name: "Fahim K.", role: "Frontend Builder", text: "The calculator graph mode is surprisingly useful for quick checks.", stars: 5 },
  { name: "Anik D.", role: "Freelancer", text: "Tool layout is clean, fast, and easy to use even on mobile.", stars: 4 },
  { name: "Nadia T.", role: "UI Learner", text: "I use QR maker and link shortener almost every day now.", stars: 5 },
  { name: "Tanmoy R.", role: "Campus Tech Club", text: "Simple tools, premium feel, and no confusion in navigation.", stars: 4 }
];

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [reviewOffset, setReviewOffset] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReviewOffset((prev) => (prev + 1) % reviewPool.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return toolCards;
    return toolCards.filter((tool) => tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q));
  }, [query]);

  const reviews = useMemo(() => {
    const out: Review[] = [];
    for (let i = 0; i < 3; i += 1) out.push(reviewPool[(reviewOffset + i) % reviewPool.length]);
    return out;
  }, [reviewOffset]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="rounded-3xl border border-slate-600/50 bg-slate-900/45 p-5 backdrop-blur-xl md:p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Ankon Systems</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-50">Ankon&apos;s Tool Box</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Practical tools with a premium interface. Ready tools are live and useful now.</p>

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
              tool.status === "ready" ? "border-emerald-300/35 bg-slate-900/55" : "border-rose-500/35 bg-slate-900/40"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 ${
                tool.status === "ready" ? "opacity-0 transition duration-300 group-hover:opacity-100" : "opacity-100"
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
                <div className="flex items-center gap-2">
                  {tool.badge ? (
                    <span className="rounded-full border border-amber-300/40 bg-amber-300/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-100">
                      {tool.badge}
                    </span>
                  ) : null}
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

      <div className="mt-8 rounded-3xl border border-slate-600/50 bg-slate-900/45 p-5 backdrop-blur-xl md:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-50">Community Reviews</h2>
          <span className="rounded-full border border-cyan-300/35 bg-cyan-300/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-cyan-100">
            Live Feed
          </span>
        </div>
        <p className="mb-5 text-xs text-slate-400">Demo rotating reviews for UI showcase.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <article key={`${review.name}-${idx}`} className="rounded-xl border border-slate-700/65 bg-slate-950/75 p-4">
              <p className="text-amber-300">{review.stars === 5 ? "★★★★★" : "★★★★☆"}</p>
              <p className="mt-2 text-sm text-slate-200">{review.text}</p>
              <p className="mt-3 text-sm font-semibold text-slate-100">{review.name}</p>
              <p className="text-xs text-slate-400">{review.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
