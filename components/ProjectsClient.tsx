"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/lib/types";

const allProjects = projectsData as Project[];

export const ProjectsClient = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();
    allProjects.forEach((project) => project.tags.forEach((projectTag) => uniqueTags.add(projectTag)));
    return ["All", ...Array.from(uniqueTags)];
  }, []);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchQuery =
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchTag = tag === "All" || project.tags.includes(tag);
      return matchQuery && matchTag;
    });
  }, [query, tag]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-slate-50">Projects</h1>
      <p className="mt-3 text-slate-300">Browse all experiments, production systems, and in-progress builds.</p>

      <div className="mt-7 grid gap-4 rounded-2xl glass p-4 md:grid-cols-[2fr_1fr]">
        <label className="text-sm">
          <span className="mb-1 block text-slate-300">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100"
            placeholder="Search by title or description"
            aria-label="Search projects"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-slate-300">Filter Tag</span>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100"
            aria-label="Filter projects by tag"
          >
            {tags.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-slate-950/75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-2xl glass p-6"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.title} details`}
            >
              <h2 className="text-2xl font-semibold text-slate-50">{activeProject.title}</h2>
              <p className="mt-4 text-slate-300">{activeProject.longDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.tags.map((projectTag) => (
                  <span key={projectTag} className="rounded-full border border-slate-500/45 px-2.5 py-1 text-xs text-slate-200">
                    {projectTag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="mt-6 rounded-lg border border-slate-500/45 px-4 py-2 text-sm text-slate-100"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};