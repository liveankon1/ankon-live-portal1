"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PARTICLE_DEFAULTS, PARTICLE_PRESET_LABELS } from "@/lib/particleConfig";
import { ParticlePreset } from "@/lib/types";
import { useParticleSettings } from "@/components/providers/ParticleSettingsProvider";

export const ControlRoomDrawer = () => {
  const [open, setOpen] = useState(false);
  const { settings, setSettings } = useParticleSettings();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-40 rounded-full border border-cyan-300/45 bg-cyan-300/20 px-4 py-2 text-sm font-semibold text-cyan-50 shadow-glow"
        aria-label="Toggle control room"
      >
        Control Room
      </button>

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : 350 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="fixed right-0 top-0 z-40 h-full w-[330px] border-l border-slate-600/45 bg-slate-950/88 p-5 backdrop-blur-xl"
        aria-label="Particle controls"
      >
        <h2 className="text-lg font-semibold text-slate-100">Control Room</h2>
        <p className="mt-1 text-sm text-slate-400">Tune the universe in real time.</p>

        <div className="mt-5 space-y-4 text-sm">
          <label className="block">
            <span className="mb-1 block text-slate-300">Preset</span>
            <select
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2"
              value={settings.preset}
              onChange={(event) => setSettings({ preset: event.target.value as ParticlePreset })}
            >
              {(Object.keys(PARTICLE_PRESET_LABELS) as ParticlePreset[]).map((key) => (
                <option key={key} value={key}>{PARTICLE_PRESET_LABELS[key]}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-slate-300">Density ({settings.density})</span>
            <input
              type="range"
              min={20}
              max={160}
              value={settings.density}
              onChange={(event) => setSettings({ density: Number(event.target.value) })}
              className="w-full"
              aria-label="Particle density"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-slate-300">Accent Color</span>
            <input
              type="color"
              value={settings.accentColor}
              onChange={(event) => setSettings({ accentColor: event.target.value })}
              className="h-10 w-full rounded border border-slate-600 bg-transparent"
              aria-label="Accent color"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-slate-300">Glow Intensity ({settings.glowIntensity.toFixed(2)})</span>
            <input
              type="range"
              min={0.2}
              max={1}
              step={0.05}
              value={settings.glowIntensity}
              onChange={(event) => setSettings({ glowIntensity: Number(event.target.value) })}
              className="w-full"
              aria-label="Glow intensity"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-slate-300">Animation Speed ({settings.speed.toFixed(1)}x)</span>
            <input
              type="range"
              min={0.3}
              max={2.5}
              step={0.1}
              value={settings.speed}
              onChange={(event) => setSettings({ speed: Number(event.target.value) })}
              className="w-full"
              aria-label="Particle speed"
            />
          </label>

          <button
            type="button"
            onClick={() => setSettings(PARTICLE_DEFAULTS)}
            className="mt-2 w-full rounded-lg border border-slate-500 bg-slate-800 px-4 py-2 font-medium text-slate-100"
          >
            Reset Defaults
          </button>
        </div>
      </motion.aside>
    </>
  );
};