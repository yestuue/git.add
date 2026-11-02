import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Bot, 
  Workflow, 
  FileText, 
  Layers, 
  Terminal, 
  Briefcase, 
  PenTool, 
  Headphones 
} from 'lucide-react';

interface NavbarProps {
  brandName?: string;
  onOpenTrial: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  brandName = 'Twinkle.ai', 
  onOpenTrial, 
  onOpenLogin 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const productItems = [
    { name: 'AI Workspace Copilot', desc: 'Context-aware intelligence across all your open apps', icon: Bot },
    { name: 'Autonomous Workflows', desc: 'Trigger complex multi-step automations with plain text', icon: Workflow },
    { name: 'Doc & Code Synthesis', desc: 'Instant extraction, summarization, and git pull request drafts', icon: FileText },
    { name: 'Universal Integrations', desc: 'Direct bridge to GitHub, Slack, Notion, Jira, and Figma', icon: Layers },
  ];

  const useCaseItems = [
    { name: 'Engineering Teams', desc: 'Automate PR reviews, code explanations, and CI/CD triage', icon: Terminal },
    { name: 'Product Leaders', desc: 'Generate specs, user stories, and track feature roadmaps', icon: Briefcase },
    { name: 'Content & Strategy', desc: 'Produce research syntheses and customer-facing updates', icon: PenTool },
    { name: 'Support & Ops', desc: 'Resolve complex inquiries with validated internal knowledge', icon: Headphones },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md transition-all border-b border-transparent">
      <nav 
        ref={navRef}
        aria-label="Main Navigation"
        className="max-w-[1240px] mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between"
      >
        {/* Brand Logo & Name */}
        <a 
          href="/" 
          className="flex items-center gap-2 group text-neutral-950 font-bold text-lg sm:text-[19px] tracking-tight focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-md"
        >
          {/* Exact 4-point star icon matching the screenshot */}
          <span className="flex items-center justify-center text-neutral-950 group-hover:scale-105 transition-transform">
            <svg 
              className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-current" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M12 1.5C12 7.298 7.298 12 1.5 12C7.298 12 12 16.702 12 22.5C12 16.702 16.702 12 22.5 12C16.702 12 12 7.298 12 1.5Z" />
            </svg>
          </span>
          <span className="font-bold tracking-tight text-neutral-950">
            {brandName}
          </span>
        </a>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8 text-[14px] font-medium text-neutral-700">
          {/* Products Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              onMouseEnter={() => setActiveDropdown('products')}
              aria-expanded={activeDropdown === 'products'}
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-neutral-950 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-sm cursor-pointer"
            >
              <span>Products</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'products' ? 'rotate-180' : ''
                }`} 
                aria-hidden="true" 
              />
            </button>

            <AnimatePresence>
              {activeDropdown === 'products' && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onMouseLeave={() => setActiveDropdown(null)}
                  role="menu"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-84 bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-2.5 z-50"
                >
                  <div className="p-1 space-y-1">
                    {productItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href="#features"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-neutral-100 text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-neutral-900">{item.name}</div>
                            <div className="text-[11px] text-neutral-500 leading-snug">{item.desc}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Use Cases Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'usecases' ? null : 'usecases')}
              onMouseEnter={() => setActiveDropdown('usecases')}
              aria-expanded={activeDropdown === 'usecases'}
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-neutral-950 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-sm cursor-pointer"
            >
              <span>Use Cases</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'usecases' ? 'rotate-180' : ''
                }`} 
                aria-hidden="true" 
              />
            </button>

            <AnimatePresence>
              {activeDropdown === 'usecases' && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onMouseLeave={() => setActiveDropdown(null)}
                  role="menu"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-84 bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-2.5 z-50"
                >
                  <div className="p-1 space-y-1">
                    {useCaseItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href="#usecases"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-neutral-100 text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-neutral-900">{item.name}</div>
                            <div className="text-[11px] text-neutral-500 leading-snug">{item.desc}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Company Link */}
          <a
            href="#company"
            className="hover:text-neutral-950 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-sm"
          >
            Company
          </a>

          {/* Resources Link */}
          <a
            href="#resources"
            className="hover:text-neutral-950 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-sm"
          >
            Resources
          </a>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4 lg:gap-5">
          <button
            type="button"
            onClick={onOpenLogin}
            className="text-[14px] font-medium text-neutral-800 hover:text-neutral-950 transition-colors px-2 py-1.5 focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-md cursor-pointer"
          >
            Login
          </button>

          <button
            type="button"
            onClick={onOpenTrial}
            className="bg-black hover:bg-neutral-800 text-white rounded-full px-5 py-2 text-[13.5px] font-medium transition-all shadow-sm hover:shadow active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-neutral-950 cursor-pointer"
          >
            Get started free
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-neutral-200 bg-white px-6 py-6 overflow-hidden shadow-lg"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">Navigation</div>
                <button
                  type="button"
                  onClick={() => { setActiveDropdown(activeDropdown === 'mob-prod' ? null : 'mob-prod'); }}
                  className="w-full flex items-center justify-between py-2 text-base font-semibold text-neutral-800"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mob-prod' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mob-prod' && (
                  <div className="pl-4 space-y-2 py-2 border-l border-neutral-100">
                    {productItems.map((item, i) => (
                      <div key={i} className="text-sm text-neutral-600 font-medium py-1">
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => { setActiveDropdown(activeDropdown === 'mob-use' ? null : 'mob-use'); }}
                  className="w-full flex items-center justify-between py-2 text-base font-semibold text-neutral-800"
                >
                  <span>Use Cases</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mob-use' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mob-use' && (
                  <div className="pl-4 space-y-2 py-2 border-l border-neutral-100">
                    {useCaseItems.map((item, i) => (
                      <div key={i} className="text-sm text-neutral-600 font-medium py-1">
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}

                <a 
                  href="#company" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold text-neutral-800"
                >
                  Company
                </a>
                <a 
                  href="#resources" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold text-neutral-800"
                >
                  Resources
                </a>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-neutral-800 border border-neutral-200 rounded-full hover:bg-neutral-50"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrial();
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-black rounded-full hover:bg-neutral-800 shadow-sm"
                >
                  Get started free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
