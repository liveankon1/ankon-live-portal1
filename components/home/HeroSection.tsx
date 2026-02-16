"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParallax } from "@/lib/useParallax";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const HeroSection = () => {
  const { ref, transform } = useParallax(8);

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-6">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100">
          <span className="live-dot" aria-hidden="true" />
          LIVE
        </div>

        <h1 className="text-4xl font-bold leading-tight text-slate-50 sm:text-5xl md:text-6xl">
          Ankon <span className="text-gradient">Projects Universe</span>
        </h1>

        <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
          I build cinematic, high-performance web products where design, motion, and engineering align like a spacecraft control panel.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <MagneticButton
            href="/Ankon-Resume.pdf"
            ariaLabel="Download resume"
            className="rounded-xl border border-cyan-300/40 bg-cyan-300/20 px-5 py-3 text-sm font-semibold text-cyan-50 shadow-glow"
          >
            Download
          </MagneticButton>

          <MagneticButton
            href="/projects"
            ariaLabel="View projects page"
            className="rounded-xl border border-slate-500/45 bg-slate-500/10 px-5 py-3 text-sm font-semibold text-slate-100"
          >
            View Projects
          </MagneticButton>
        </div>
      </div>

      <motion.div
        ref={ref}
        style={{ transform }}
        className="glow-border rounded-3xl p-[1px] mobile-reduced-motion"
      >
        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 via-transparent to-fuchsia-300/12" />
          <div className="relative z-10 mx-auto flex max-w-[320px] items-center justify-center rounded-full bg-cyan-300/5 p-2 ring-1 ring-cyan-200/20">
            <Image
              src="/ankon-hero.gif"
              alt="Ankon hero portrait"
              width={320}
              height={320}
              priority
              unoptimized
              className="h-auto w-full rounded-full object-contain"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
