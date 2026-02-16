"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/types";
import { MagneticButton } from "@/components/ui/MagneticButton";

type ProjectCardProps = {
  project: Project;
  onOpen?: (project: Project) => void;
};

export const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl glass p-5 shadow-card transition"
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-color) 30%, transparent), transparent 60%)" }} />

      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
        <span className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
          {project.status}
        </span>
      </div>

      <p className="text-sm text-slate-300">{project.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-500/35 bg-slate-400/10 px-2.5 py-1 text-xs text-slate-200">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <MagneticButton
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          ariaLabel={`Open ${project.title} demo`}
          className="rounded-xl border border-cyan-300/35 bg-cyan-300/15 px-3 py-2 text-sm font-medium text-cyan-50"
        >
          Live Demo
        </MagneticButton>

        <MagneticButton
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          ariaLabel={`Open ${project.title} source code`}
          className="rounded-xl border border-slate-500/40 bg-slate-300/10 px-3 py-2 text-sm font-medium text-slate-100"
        >
          Source
        </MagneticButton>

        {onOpen ? (
          <MagneticButton
            onClick={() => onOpen(project)}
            ariaLabel={`View details for ${project.title}`}
            className="rounded-xl border border-fuchsia-300/35 bg-fuchsia-300/15 px-3 py-2 text-sm font-medium text-fuchsia-100"
          >
            Details
          </MagneticButton>
        ) : null}
      </div>
    </motion.article>
  );
};