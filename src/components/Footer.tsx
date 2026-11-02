import React from 'react';
import { Code2, Github, Linkedin, Twitter, ArrowUpRight, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scroll = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const columns = [
    {
      heading: 'Portfolio',
      links: [
        { label: 'Home',     action: () => scroll('home')     },
        { label: 'About',    action: () => scroll('about')    },
        { label: 'Projects', action: () => scroll('projects') },
        { label: 'Planner',  action: () => scroll('planner')  },
      ],
    },
    {
      heading: 'Skills',
      links: [
        { label: 'HTML5 Semantic' },
        { label: 'CSS3 Grid / Flex' },
        { label: 'JavaScript ES6+' },
        { label: 'W3C Standards' },
      ],
    },
    {
      heading: 'Academic',
      links: [
        { label: 'MIVA Open University' },
        { label: 'COS 106 – Web Tech' },
        { label: 'Term Project (20 Marks)' },
        { label: 'Contact', action: () => scroll('contact') },
      ],
    },
  ];

  const socials = [
    { icon: Twitter,  href: 'https://twitter.com',  label: 'Twitter'  },
    { icon: Github,   href: 'https://github.com',   label: 'GitHub'   },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:alex@example.com', label: 'Email' },
  ];

  return (
    <footer className="w-full">
      {/* ── Top CTA Band (Clean Monochrome) ── */}
      <div className="relative w-full bg-black overflow-hidden py-16 sm:py-24 flex flex-col items-center text-center px-4">
        {/* Subtle monochrome radial glow behind text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[500px] h-[260px] bg-white/[0.04] rounded-full blur-[90px]" />
        </div>

        <h2 className="relative font-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-xl leading-tight">
          Ready to review my project work?
        </h2>
        <p className="relative mt-3 text-neutral-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
          Explore my sample projects, academic milestones, and an interactive task planner — all in one place.
        </p>
        <button
          type="button"
          onClick={() => scroll('projects')}
          className="relative mt-7 inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 font-bold text-xs sm:text-sm px-7 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-lg"
        >
          <span>Explore Projects</span>
          <ArrowUpRight className="w-4 h-4 text-black stroke-[2.2]" />
        </button>
      </div>

      {/* ── Bottom Card Footer ── */}
      <div className="bg-black px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1280px] mx-auto bg-neutral-950/80 border border-white/10 rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand block */}
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => scroll('home')}
                className="flex items-center gap-2.5 cursor-pointer w-fit"
                aria-label="Back to top"
              >
                <span className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4 text-black stroke-[2.5]" />
                </span>
                <span className="font-headline text-white font-black text-lg tracking-tight">
                  Alex Adeleke
                </span>
              </button>

              <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed max-w-[240px]">
                Computer Science undergraduate at MIVA Open University, building
                modern web applications with semantic HTML5, CSS3 Grid, and
                dynamic JavaScript.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2.5 mt-1">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/10 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.action ? (
                        <button
                          type="button"
                          onClick={link.action}
                          className="text-neutral-400 hover:text-white text-xs sm:text-[13px] transition-colors cursor-pointer text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <span className="text-neutral-500 text-xs sm:text-[13px]">
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
            <span>© 2025 Alex Adeleke. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <span>COS 106 Term Project · MIVA Open University</span>
              <span className="hidden sm:inline">·</span>
              <button
                type="button"
                onClick={() => scroll('contact')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
