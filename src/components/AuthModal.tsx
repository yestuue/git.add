import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [appType, setAppType] = useState('E-commerce');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSubmitted(false);
      setEmail('');
      setName('');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="advice-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#0c1222] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl z-10 text-white my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button with 44px tap target */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-6 sm:py-8 text-center space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                  We've Received Your Request!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Our mobile app specialists will review your requirements and reach out to <span className="text-blue-400 font-semibold">{email}</span> within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-blue-400">
                    icetudio consultation
                  </span>
                  <h2 id="advice-modal-title" className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Get a Free Advice
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Tell us about your project and we'll craft a tailored mobile app roadmap.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-medium text-slate-300 mb-1">
                      Business Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      ref={inputRef}
                      id="modal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-apptype" className="block text-xs font-medium text-slate-300 mb-1">
                      App Category
                    </label>
                    <select
                      id="modal-apptype"
                      value={appType}
                      onChange={(e) => setAppType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="E-commerce">E-commerce & Retail</option>
                      <option value="SaaS">SaaS & Business Productivity</option>
                      <option value="Booking">Booking & Services</option>
                      <option value="Healthcare">Health & Wellness</option>
                      <option value="Other">Other custom mobile solution</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-[#2f66ee] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold text-sm py-3 rounded-full shadow-lg shadow-blue-500/20 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Request Free Advice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
