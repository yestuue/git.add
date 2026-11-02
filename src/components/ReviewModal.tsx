import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 font-bold">
                  ★
                </div>
                <div>
                  <h2 id="review-modal-title" className="text-base font-semibold text-neutral-900">
                    5.0 Rating Across 24,500+ Reviews
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Independently verified customer satisfaction scores
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close review details"
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Rating summary cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-center">
                  <div className="text-2xl font-bold text-neutral-900">4.98</div>
                  <div className="flex justify-center text-amber-400 my-1">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-500">G2 Crowd (12K+)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-center">
                  <div className="text-2xl font-bold text-neutral-900">5.00</div>
                  <div className="flex justify-center text-amber-400 my-1">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-500">Product Hunt #1</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-center">
                  <div className="text-2xl font-bold text-neutral-900">4.96</div>
                  <div className="flex justify-center text-amber-400 my-1">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-500">Capterra (6.5K+)</div>
                </div>
              </div>

              {/* Verified highlights */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  What teams are saying
                </h3>

                <div className="p-3.5 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                    <span className="font-semibold text-neutral-800">Sarah Chen</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Developer
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-snug">
                    "Reduced our sprint overhead by 40%. It seamlessly integrates with git, Slack, and Linear right out of the box."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 transition-colors">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                    <span className="font-semibold text-neutral-800">Marcus Vance</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> Product Lead
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-snug">
                    "The simplest, cleanest AI copilot we’ve ever deployed. Setup took under 2 minutes."
                  </p>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl text-neutral-600 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>14-day free trial on all plans. No credit card required. Cancel anytime with one click.</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-full transition-all"
              >
                Back to Hero
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
