import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'trial' | 'login';
  onClose: () => void;
  brandName?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose, brandName = 'Twinkle.ai' }) => {
  const [email, setEmail] = useState('');
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
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
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Welcome aboard!</h3>
                  <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                    We sent a secure magic link to <strong className="text-neutral-900">{email}</strong>. Check your inbox to get started in seconds.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-sm font-medium transition-all"
                  >
                    Return to Hero
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      <Lock className="w-3.5 h-3.5" />
                      {mode === 'trial' ? 'Instant Activation' : 'Secure Login'}
                    </div>
                    <h2 id="auth-modal-title" className="text-2xl font-bold tracking-tight text-neutral-900">
                      {mode === 'trial' ? `Start your free trial on ${brandName}` : `Welcome back to ${brandName}`}
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      {mode === 'trial' 
                        ? '14-day full access. No credit card required.' 
                        : 'Enter your work email to sign in.'}
                    </p>
                  </div>

                  {/* Social Buttons */}
                  <div className="space-y-2.5 mb-6">
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 transition-all text-sm font-medium text-neutral-700"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      Continue with Google
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 transition-all text-sm font-medium text-neutral-700"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      Continue with GitHub
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center my-5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <span className="relative bg-white px-3 text-xs text-neutral-400 uppercase tracking-wider">
                      Or with email
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Work Email
                      </label>
                      <input
                        id="email-input"
                        ref={inputRef}
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-black hover:bg-neutral-800 text-white font-medium text-sm rounded-full transition-all shadow-sm active:scale-98"
                    >
                      <span>{mode === 'trial' ? 'Get Started' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="text-[11px] text-neutral-400 text-center mt-4">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
