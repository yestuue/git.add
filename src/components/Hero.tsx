import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRight, Code2, Award, CheckCircle2, FolderGit2 } from 'lucide-react';

interface HeroProps {
  onNavigate?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const handleLinkClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      aria-labelledby="hero-title"
      className="w-full max-w-[1280px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-10 flex flex-col gap-6 sm:gap-8"
    >
      {/* Main Hero Card Stage — Sleek Obsidian Glassmorphism */}
      <div className="relative w-full rounded-[24px] xs:rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 xs:p-7 sm:p-12 md:p-16 lg:p-20 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="pointer-events-none absolute -top-24 -left-24 w-80 sm:w-96 h-80 sm:h-96 bg-white/[0.04] rounded-full blur-3xl"
          aria-hidden="true" 
        />


        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-start text-left max-w-4xl"
        >
          {/* Headline with Clean White Doodle around "web apps" */}
          <motion.div variants={itemVariants} className="w-full">
            <h1
              id="hero-title"
              className="font-headline text-[32px] xs:text-[40px] sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white tracking-[-0.038em] leading-[1.12]"
            >
              <span className="block">
                Building modern{' '}
                <span className="relative inline-block px-2.5 xs:px-3 py-0.5 mx-0.5 sm:mx-1 align-baseline">
                  {/* Word text */}
                  <span className="relative z-10 text-white font-bold italic tracking-tight">
                    web apps
                  </span>

                  {/* Clean Monochrome Hand-Drawn Doodle Oval */}
                  <svg
                    className="absolute -inset-x-2 -inset-y-1.5 w-[calc(100%+16px)] h-[calc(100%+12px)] pointer-events-none text-white/90 overflow-visible drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    viewBox="0 0 220 70"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 38 12 C 78 5, 142 5, 185 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.45"
                    />
                    <path
                      d="M 16 35 C 10 12, 60 4, 110 4 C 170 4, 210 12, 210 34 C 210 54, 160 66, 105 66 C 45 66, 10 54, 14 32 C 18 16, 68 8, 120 7 C 170 6, 204 18, 198 38"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
              </span>
              <span className="block mt-1 sm:mt-2 text-neutral-300">
                & digital experiences
              </span>
            </h1>
          </motion.div>

          {/* Biography & Personal Value Proposition */}
          <motion.div variants={itemVariants} className="mt-4 sm:mt-6 max-w-2xl">
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Hi, I'm <strong className="text-white">Alex Adeleke</strong> — an aspiring software engineer and computer science undergraduate. 
              I design and develop responsive, accessible, and high-performance web applications using semantic HTML5, modern CSS Grid/Flexbox, 
              and dynamic JavaScript. Explore my sample projects, academic milestones, and interactive study planner below.
            </p>
          </motion.div>

          {/* Action Row: Clean Black & White Buttons (Responsive Stack on Mobile) */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full"
          >
            {/* Primary Action Button: View Projects */}
            <button
              type="button"
              onClick={() => handleLinkClick('projects')}
              className="group inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 active:scale-[0.98] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer min-h-[46px]"
            >
              <FolderGit2 className="w-4 h-4 text-black stroke-[2.2]" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action: Interactive Task Planner */}
            <button
              type="button"
              onClick={() => handleLinkClick('planner')}
              className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/15 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-200 cursor-pointer min-h-[46px]"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Interactive Planner</span>
            </button>

            {/* Tertiary Action: Contact Me */}
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center justify-center text-neutral-400 hover:text-white font-medium text-xs sm:text-sm py-2 px-3 transition-colors cursor-pointer"
            >
              <span>Get in Touch →</span>
            </button>
          </motion.div>

          {/* Standards note */}
          <motion.div variants={itemVariants} className="mt-3 flex items-center text-neutral-400 text-xs sm:text-sm font-normal">
            <span>Designed with </span>
            <span className="text-white font-medium underline underline-offset-4 decoration-white/40 ml-1">
              W3C semantic standards & responsive design
            </span>
          </motion.div>

          {/* Stats Bar Floating Card (Clean Monochrome) */}
          <motion.div
            variants={itemVariants}
            className="mt-7 sm:mt-10 lg:mt-12 w-full max-w-2xl"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="grid grid-cols-3 divide-x divide-white/10 text-left">
                {/* Stat 1: Completed Projects */}
                <div className="pr-3 sm:pr-5">
                  <div className="flex items-center gap-1.5 text-neutral-300 mb-0.5">
                    <FolderGit2 className="w-4 h-4 hidden xs:inline" />
                    <span className="font-headline text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      15+
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-medium leading-tight">
                    Projects Delivered
                  </div>
                </div>

                {/* Stat 2: CGPA */}
                <div className="px-3 sm:px-5">
                  <div className="flex items-center gap-1.5 text-neutral-300 mb-0.5">
                    <Award className="w-4 h-4 hidden xs:inline" />
                    <span className="font-headline text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      4.85
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-medium leading-tight">
                    First Class CGPA
                  </div>
                </div>

                {/* Stat 3: Web Standards */}
                <div className="pl-3 sm:pl-5">
                  <div className="flex items-center gap-1.5 text-neutral-300 mb-0.5">
                    <Code2 className="w-4 h-4 hidden xs:inline" />
                    <span className="font-headline text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      100%
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-medium leading-tight">
                    W3C Valid Markup
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Stack Bar Below Card */}
      <div 
        aria-label="Core Technology Pillars"
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-6 px-1 sm:px-4 py-2"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-1 h-6 sm:h-8 bg-white rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
            aria-hidden="true"
          />
          <p className="text-neutral-300 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
            Specialized in{' '}
            <span className="font-headline inline-block px-2 sm:px-2.5 py-0.5 rounded-full border border-white/20 text-white font-semibold text-xs sm:text-sm bg-white/[0.04]">
              Modern Web Systems
            </span>{' '}
            & client-side application architecture.
          </p>
        </div>

        {/* Technical Badges — 2x2 on Mobile, Inline on Desktop */}
        <div className="grid grid-cols-2 xs:grid-cols-4 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 text-neutral-400 w-full md:w-auto">
          {/* HTML5 */}
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
              alt="HTML5"
              className="w-4 h-4 shrink-0"
            />
            <span className="font-bold">HTML5</span>
          </div>
          {/* CSS3 */}
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
              alt="CSS3"
              className="w-4 h-4 shrink-0"
            />
            <span className="font-bold">CSS3</span>
          </div>
          {/* JavaScript */}
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
              alt="JavaScript"
              className="w-4 h-4 shrink-0 rounded-[2px]"
            />
            <span className="font-bold">JS ES6+</span>
          </div>
          {/* W3C */}
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white">
            <span className="font-mono text-[10px] bg-white text-black px-1 rounded font-bold">W3C</span>
            <span className="font-bold">Valid</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
