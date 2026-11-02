import React from 'react';
import { GraduationCap, Laptop, ListChecks, Mail, ArrowRight } from 'lucide-react';

interface QuickOrientationProps {
  onNavigate: (sectionId: string) => void;
}

export const QuickOrientation: React.FC<QuickOrientationProps> = ({ onNavigate }) => {
  const pillars = [
    {
      id: 'about',
      title: 'About Me & Academics',
      code: 'Req 2',
      icon: GraduationCap,
      description: 'Educational background with semantic HTML tables, CGPA (4.85), career trajectory, skills, and project defense.',
      badge: 'Coursework Table',
    },
    {
      id: 'projects',
      title: 'Sample Projects',
      code: 'Req 3',
      icon: Laptop,
      description: 'Featured sample web applications with project breakdowns, semantic structures, and GitHub code repositories.',
      badge: '3 Case Studies',
    },
    {
      id: 'planner',
      title: 'Academic Task Planner',
      code: 'Req 4',
      icon: ListChecks,
      description: 'Interactive JavaScript task engine: add tasks, mark as complete, delete, and filter with LocalStorage persistence.',
      badge: 'Interactive JS',
    },
    {
      id: 'contact',
      title: 'Validated Contact Form',
      code: 'Req 5',
      icon: Mail,
      description: 'Client-side validated inquiry form enforcing non-empty fields, RFC email structure, and digit constraints.',
      badge: 'Strict Regex',
    },
  ];

  return (
    <section 
      aria-label="Quick Navigation"
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
        <h2 className="font-headline text-2xl xs:text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore The Platform at a Glance
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
          Direct navigation to all essential sections mandated by the MIVA Open University COS 106 specification.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={() => onNavigate(pillar.id)}
              className="group cursor-pointer rounded-3xl bg-neutral-950/80 hover:bg-neutral-900/90 backdrop-blur-2xl border border-white/10 hover:border-white/30 p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">
                    {pillar.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-headline text-base sm:text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                <span className="text-[11px] text-neutral-400 font-medium">
                  {pillar.badge}
                </span>
                <span className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-all">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickOrientation;
