import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PageTab = 'home' | 'about' | 'projects' | 'planner' | 'contact';

interface NavbarProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'about',    label: 'About'    },
    { id: 'projects', label: 'Projects' },
    { id: 'planner',  label: 'Planner'  },
  ];

  const handleNavClick = (id: PageTab) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/90 backdrop-blur-2xl border-b border-white/[0.08]">
      <nav
        aria-label="Main Navigation"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[58px] sm:h-[66px] flex items-center justify-between"
      >
        {/* ── LEFT: Logo & Student Identity ── */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-md"
            aria-label="Alex Adeleke - Home"
          >
            <span className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shrink-0 font-bold shadow-sm group-hover:bg-neutral-200 transition-colors">
              <Code2 className="w-4 h-4 text-black stroke-[2.5]" />
            </span>
            <div className="flex flex-col text-left">
              <span className="font-headline text-white font-extrabold text-base sm:text-lg tracking-tight leading-none">
                Alex Adeleke
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
                COS 106 · Portfolio
              </span>
            </div>
          </button>
        </div>

        {/* ── CENTER: Desktop Nav Links (Clean Monochrome) ── */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all cursor-pointer ${
                  isActive 
                    ? 'text-black bg-white font-semibold shadow-sm' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: Contact CTA & Mobile Hamburger ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-white text-black hover:bg-neutral-200 text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Clean Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden w-9 h-9 flex items-center justify-center text-white rounded-xl bg-white/[0.06] border border-white/10 active:bg-white/15 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t border-white/[0.08] bg-black/98 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {([
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About & Academics' },
                { id: 'projects', label: 'Sample Projects' },
                { id: 'planner', label: 'Task Planner' },
                { id: 'contact', label: 'Contact Me' },
              ] as { id: PageTab; label: string }[]).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm px-4 py-3 rounded-xl transition-all font-medium cursor-pointer flex items-center justify-between ${
                    activeTab === item.id
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-bold text-sm py-3 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
