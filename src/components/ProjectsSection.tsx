import React, { useState } from 'react';
import { ExternalLink, Github, Eye, CheckCircle, Code2, Terminal } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'web' | 'javascript' | 'threejs';
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  features: string[];
}

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'javascript' | 'threejs'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'miva-portal',
      title: 'MIVA Academic Management Portal',
      subtitle: 'Course Registration, GPA Tracker & Student Dashboard',
      description: 'A responsive academic management platform designed for university students to track credit units, compute cumulative GPA, manage course schedules, and view semester progress reports.',
      category: 'web',
      tags: ['HTML5 Semantic', 'CSS Grid', 'JavaScript DOM', 'Responsive'],
      liveUrl: 'https://miva-academic-portal.edu.ng/demo',
      githubUrl: 'https://github.com/miva-student/academic-management-portal',
      features: [
        'Real-time semester GPA computation algorithm',
        'Persistent course registration with LocalStorage',
        'W3C-compliant semantic HTML5 table structure',
        'Mobile-friendly responsive CSS Grid layout'
      ]
    },
    {
      id: 'nexus-topology',
      title: 'Nexus 3D Academic Topology Field',
      subtitle: 'WebGL Three.js Curriculum Knowledge Constellation',
      description: 'An interactive 3D WebGL data visualization that maps university course prerequisites, student research nodes, and computer science learning graphs in real-time with ambient physics.',
      category: 'threejs',
      tags: ['Three.js', 'WebGL', 'JavaScript ES6+', 'Canvas 2D/3D'],
      liveUrl: 'https://nexus-topology.web.app',
      githubUrl: 'https://github.com/miva-student/nexus-3d-topology',
      features: [
        'Interactive particle constellation with 120+ animated nodes',
        'Dynamic depth of field & additive blending lines',
        'Hardware-accelerated 60 FPS WebGL rendering',
        'Touch-optimized rotational inertia for mobile'
      ]
    },
    {
      id: 'study-optimizer',
      title: 'Campus Study Schedule & Task Optimizer',
      subtitle: 'Intelligent Academic Task Engine & Calendar Sync',
      description: 'An interactive web app with DOM manipulation and array-based task management. Allows students to organize assignments by course code, set countdown timers, and track deadlines.',
      category: 'javascript',
      tags: ['JavaScript Arrays', 'Event Handling', 'HTML5 Forms', 'CSS Flexbox'],
      liveUrl: 'https://campus-task-optimizer.vercel.app',
      githubUrl: 'https://github.com/miva-student/study-task-optimizer',
      features: [
        'Strict JavaScript form validation before submission',
        'Array methods (filter, map, reduce) for task states',
        'Instant audio and visual feedback upon completion',
        'Custom status tags (High, Medium, Low Priority)'
      ]
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      aria-labelledby="projects-heading"
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2">
        <h2 
          id="projects-heading" 
          className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Featured Sample Projects
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
          Demonstrating technical proficiency in HTML5 semantic architecture, responsive CSS styling, and dynamic JavaScript execution.
        </p>

        {/* Category Filters (Clean B&W Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-black shadow-sm font-bold'
                : 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            All Projects (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter('web')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'web'
                ? 'bg-white text-black shadow-sm font-bold'
                : 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Web Systems
          </button>
          <button
            type="button"
            onClick={() => setFilter('javascript')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'javascript'
                ? 'bg-white text-black shadow-sm font-bold'
                : 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            JavaScript DOM
          </button>
          <button
            type="button"
            onClick={() => setFilter('threejs')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === 'threejs'
                ? 'bg-white text-black shadow-sm font-bold'
                : 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            3D WebGL
          </button>
        </div>
      </div>

      {/* Projects Grid: 3 Responsive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {filteredProjects.map((project) => (
          <article 
            key={project.id}
            aria-labelledby={`project-${project.id}-title`}
            className="flex flex-col rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-xl hover:border-white/30 transition-all duration-300 group overflow-hidden"
          >
            {/* Sleek Terminal/Browser Preview Header */}
            <div className="relative w-full h-40 sm:h-44 bg-neutral-900/60 p-4 flex flex-col justify-between border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] text-neutral-300 border border-white/10">
                  COS 106 Certified
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto text-neutral-500 gap-1.5">
                <Terminal className="w-6 h-6 stroke-[1.5]" />
                <span className="text-[11px] font-mono">Live Demo Screenshot Placeholder</span>
              </div>

              <div className="text-[10px] font-mono text-neutral-400 truncate">
                ~/{project.id}.tsx
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 
                  id={`project-${project.id}-title`}
                  className="font-headline text-lg sm:text-xl font-bold text-white group-hover:text-neutral-200 transition-colors"
                >
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-neutral-400">
                  {project.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tags List */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-1.5" aria-label="Technology tags">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-medium text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hyperlinks: Live Demo & GitHub Repo */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline transition-all cursor-pointer py-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Code</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Project Preview Modal */}
      {activeModalProject && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative w-full max-w-xl rounded-3xl bg-neutral-950 border border-white/15 p-6 sm:p-8 shadow-2xl text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 id="modal-project-title" className="font-headline text-xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-neutral-400 font-medium mt-0.5">
                  {activeModalProject.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {activeModalProject.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                Key Technical Implementations:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {activeModalProject.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={activeModalProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Simulated Live Environment</span>
              </a>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/[0.06] border border-white/15 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
