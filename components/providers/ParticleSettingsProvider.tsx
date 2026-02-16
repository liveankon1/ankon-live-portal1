"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { PARTICLE_DEFAULTS, PARTICLE_STORAGE_KEY } from "@/lib/particleConfig";
import { ParticleSettings } from "@/lib/types";

type ParticleSettingsContextType = {
  settings: ParticleSettings;
  setSettings: (patch: Partial<ParticleSettings>) => void;
};

const ParticleSettingsContext = createContext<ParticleSettingsContextType | null>(null);

export const ParticleSettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setState] = useState<ParticleSettings>(PARTICLE_DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PARTICLE_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<ParticleSettings>;
      setState((prev) => ({ ...prev, ...parsed }));
    } catch {
      setState(PARTICLE_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", settings.accentColor);
    document.documentElement.style.setProperty("--glow-intensity", String(settings.glowIntensity));
    localStorage.setItem(PARTICLE_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      setSettings: (patch: Partial<ParticleSettings>) =>
        setState((prev) => ({ ...prev, ...patch }))
    }),
    [settings]
  );

  return <ParticleSettingsContext.Provider value={value}>{children}</ParticleSettingsContext.Provider>;
};

export const useParticleSettings = () => {
  const ctx = useContext(ParticleSettingsContext);
  if (!ctx) {
    throw new Error("useParticleSettings must be used inside ParticleSettingsProvider");
  }
  return ctx;
};