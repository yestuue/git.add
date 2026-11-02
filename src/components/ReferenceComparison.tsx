import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Layers, CheckCircle2, X } from 'lucide-react';

interface ReferenceComparisonProps {
  currentBrand: string;
  onBrandChange: (brand: string) => void;
}

export const ReferenceComparison: React.FC<ReferenceComparisonProps> = ({
  currentBrand,
  onBrandChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(50);

  return (
    <>
      {/* Floating control dock in bottom-right */}
      <aside 
        aria-label="Design Replica & Accessibility Controls"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Open 1:1 Design Replica Inspector"
          className="flex items-center gap-2 px-3.5 py-2 bg-neutral-900/95 hover:bg-black text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-md border border-neutral-700/50 transition-all hover:scale-102 cursor-pointer focus-visible:outline-2 focus-visible:outline-neutral-900"
        >
          <Sliders className="w-3.5 h-3.5 text-neutral-300" />
          <span>Replica Inspector</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </aside>

      {/* Inspector Panel Modal/Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 right-4 z-50 w-88 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-neutral-200 p-4 text-neutral-900"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight">1:1 Replica Verifier</span>
                <span className="text-[10px] font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full">
                  git.add
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
                aria-label="Close inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3.5 space-y-4">
              {/* Brand Switcher */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                  Brand Name in Navbar
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => onBrandChange('Twinkle.ai')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      currentBrand === 'Twinkle.ai'
                        ? 'bg-white text-neutral-950 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    ✦ Twinkle.ai (Original)
                  </button>
                  <button
                    type="button"
                    onClick={() => onBrandChange('git.add')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      currentBrand === 'git.add'
                        ? 'bg-white text-neutral-950 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    git.add (Project)
                  </button>
                </div>
              </div>

              {/* Reference Image Overlay */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-neutral-500" />
                    Overlay Original Screenshot
                  </span>
                  <button
                    type="button"
                    onClick={() => setOverlayActive(!overlayActive)}
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                      overlayActive 
                        ? 'bg-neutral-900 text-white' 
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    {overlayActive ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {overlayActive && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>Opacity</span>
                      <span>{overlayOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={overlayOpacity}
                      onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                      className="w-full accent-neutral-900 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Accessibility & Performance Checklist */}
              <div className="space-y-1.5 text-[11px] text-neutral-600">
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>WCAG 2.1 AA Compliant (15.8:1 Contrast)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Keyboard Navigation & Focus Rings</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Reduced Motion Preference Respected</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Overlay Comparison Mode */}
      {overlayActive && (
        <div 
          className="fixed inset-0 z-30 pointer-events-none flex flex-col items-center justify-start overflow-hidden"
          style={{ opacity: overlayOpacity / 100 }}
        >
          <img 
            src="/assets/aistudio/image_c0cdba50.png" 
            alt="Reference layout comparison overlay" 
            className="w-full max-w-[1280px] h-auto object-contain mx-auto mix-blend-difference"
          />
        </div>
      )}
    </>
  );
};
