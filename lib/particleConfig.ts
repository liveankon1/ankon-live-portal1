import { ParticlePreset, ParticleSettings } from "@/lib/types";

export const PARTICLE_DEFAULTS: ParticleSettings = {
  preset: "galaxy",
  density: 70,
  accentColor: "#22d3ee",
  glowIntensity: 0.7,
  speed: 1
};

export const PARTICLE_PRESET_LABELS: Record<ParticlePreset, string> = {
  rain: "Rain",
  sparks: "Sparks",
  galaxy: "Galaxy",
  "neon-trail": "Neon Trail"
};

export const PARTICLE_STORAGE_KEY = "ankon-universe-particles-v1";