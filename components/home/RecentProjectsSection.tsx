import projectsData from "@/data/projects.json";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/lib/types";

const recentProjects = (projectsData as Project[]).slice(0, 6);

export const RecentProjectsSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6" id="recent-projects">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Recent</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-50">Recent Projects & Works</h2>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};