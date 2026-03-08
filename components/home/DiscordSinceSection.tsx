"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type LiveStats = {
  highestRank: string;
  hours: number;
  matches: number;
  wins: number;
  kos: number;
  assists: number;
  viewers: number;
  ping: number;
};

const rankPool = ["Heroic", "Grandmaster", "Diamond IV", "Elite Master"];

const buildLiveStats = (): LiveStats => ({
  highestRank: rankPool[Math.floor(Math.random() * rankPool.length)],
  hours: Math.floor(Math.random() * 1200) + 220,
  matches: Math.floor(Math.random() * 9000) + 1400,
  wins: Math.floor(Math.random() * 3200) + 450,
  kos: Math.floor(Math.random() * 25000) + 3200,
  assists: Math.floor(Math.random() * 14000) + 1800,
  viewers: Math.floor(Math.random() * 200) + 40,
  ping: Math.floor(Math.random() * 60) + 18
});

const quoteLines = [
  "? Welcome to my profile ?",
  "?------------?",
  "? ? [ My Self Ankon ] ¡! ?",
  "?---------?",
  "? ?Change the world by being yourself.? ´?-??@liveankon",
  "Get to know me https://guns.lol/def_ankon"
];

export const DiscordSinceSection = () => {
  const liveStats = useMemo(() => buildLiveStats(), []);
  const [bannerSrc, setBannerSrc] = useState("/car-banner.gif");

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.2, 0.65, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-slate-950/70 p-4 shadow-[0_0_40px_rgba(34,211,238,0.2)] md:p-6"
      >
        <div className="pointer-events-none absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/90">Community</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-50 md:text-3xl">
              Ankon Discord <span className="text-gradient">Since 2022</span>
            </h2>
          </div>
          <span className="rounded-full border border-cyan-200/35 bg-cyan-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
            Premium Profile
          </span>
        </div>

        <div className="grid h-[760px] gap-4 md:grid-cols-[0.43fr_0.57fr]">
          <article className="relative h-full overflow-hidden rounded-3xl border border-slate-500/30 bg-black/55">
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={bannerSrc}
                alt="Ankon profile banner"
                fill
                priority={false}
                unoptimized
                className="object-cover opacity-80"
                onError={() => setBannerSrc("/ankon-hero.gif")}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
            </div>

            <div className="relative -mt-12 px-5 pb-5">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-black bg-slate-900 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                <Image src="/ankon-hero.gif" alt="Ankon avatar" width={96} height={96} unoptimized className="h-full w-full object-cover" />
              </div>

              <h3 className="text-3xl font-black tracking-wide text-slate-100">Def Ankon ii</h3>
              <p className="mt-2 text-sm text-slate-300">liveankon - Unapologetic - Unmatched - Future-focused</p>

              <div className="mt-4 rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm text-cyan-100">
                Welcome to my profile. Building, designing, and leveling up every day.
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-xl border border-slate-500/30 bg-slate-900/50 p-3">
                  <p className="text-slate-400">Member Since</p>
                  <p className="font-semibold text-slate-100">2022</p>
                </div>
                <div className="rounded-xl border border-slate-500/30 bg-slate-900/50 p-3">
                  <p className="text-slate-400">Discord Username</p>
                  <p className="font-semibold text-slate-100">liveankon</p>
                </div>
                <div className="rounded-xl border border-slate-500/30 bg-slate-900/50 p-3">
                  <p className="text-slate-400">Status</p>
                  <p className="font-semibold text-amber-300">Idle</p>
                </div>
              </div>
            </div>
          </article>

          <article className="relative h-full overflow-hidden rounded-3xl border border-slate-500/35 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-xl font-black tracking-wide text-transparent [text-shadow:0_0_20px_rgba(34,211,238,0.45)]">
                Activity Board
              </h3>
              <button
                type="button"
                className="rounded-xl border border-cyan-300/35 bg-cyan-300/15 px-3 py-1.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
              >
                + Add Widget
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-500/35 bg-slate-950/65 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="bg-gradient-to-r from-cyan-100 to-fuchsia-200 bg-clip-text text-sm font-black uppercase tracking-[0.08em] text-transparent [text-shadow:0_0_18px_rgba(56,189,248,0.35)]">
                    Featured Game: FreeFire
                  </p>
                  <span className="text-xs font-bold text-emerald-300">Live update</span>
                </div>
                <p className="text-xs font-semibold text-cyan-200">Refresh with new fake stats on each reload</p>
                <div className="my-3 flex items-center gap-2 text-cyan-200/80">
                  <span>?</span>
                  <hr className="h-px flex-1 border-0 bg-gradient-to-r from-cyan-300/80 via-fuchsia-300/70 to-cyan-300/80" />
                  <span>?</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-100">{liveStats.viewers} watching now - ping {liveStats.ping}ms</p>
                  </div>
                  <div className="h-20 w-28 rounded-xl bg-gradient-to-br from-fuchsia-400/30 to-cyan-300/20" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Highest Rank", liveStats.highestRank],
                  ["Hours", `${liveStats.hours}`],
                  ["Matches", `${liveStats.matches}`],
                  ["Wins", `${liveStats.wins}`],
                  ["KOs", `${liveStats.kos}`],
                  ["Assists", `${liveStats.assists}`]
                ].map(([item, value]) => (
                  <div key={item} className="rounded-xl border border-slate-500/30 bg-slate-950/55 p-3">
                    <p className="bg-gradient-to-r from-cyan-100 to-fuchsia-100 bg-clip-text text-sm font-black text-transparent [text-shadow:0_0_14px_rgba(56,189,248,0.35)]">
                      {value}
                    </p>
                    <div className="my-1 flex items-center gap-2 text-cyan-200/70">
                      <span className="text-[10px]">?</span>
                      <hr className="h-px flex-1 border-0 bg-cyan-300/40" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-300/12 to-slate-900/70 p-4 backdrop-blur-sm">
                <span className="absolute right-4 top-3 text-xs font-bold tracking-[0.2em] text-cyan-200/90">C__</span>
                {[...Array(8)].map((_, idx) => (
                  <span
                    key={idx}
                    className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-200/40"
                    style={{
                      left: `${12 + idx * 11}%`,
                      top: `${20 + (idx % 3) * 22}%`,
                      filter: "blur(0.3px)"
                    }}
                  />
                ))}
                <pre className="relative z-10 whitespace-pre-wrap font-semibold leading-relaxed text-cyan-50">
{quoteLines.join("\n")}
                </pre>
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
};

