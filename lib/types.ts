export type ParticlePreset = "rain" | "sparks" | "galaxy" | "neon-trail";

export type ParticleSettings = {
  preset: ParticlePreset;
  density: number;
  accentColor: string;
  glowIntensity: number;
  speed: number;
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  status: "Live" | "In Progress" | "Planned";
  repoUrl: string;
  demoUrl: string;
  featured?: boolean;
};