import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

interface HeroProps {
  onOpenReviews: () => void;
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReviews, onOpenTrial }) => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants optimized for silky 60fps performance and WCAG compliance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      aria-labelledby="hero-heading"
      className="relative w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 sm:pb-28 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6"
    >
      {/* Subtle background ambient radial gradient for clean atmospheric depth */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-60"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-b from-neutral-100/80 via-neutral-50/30 to-transparent blur-3xl rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Rating Badge: 1:1 replica of "★ 5.0 over 24.5K + Reviews" */}
        <motion.div variants={itemVariants} className="mb-7 sm:mb-8">
          <button
            type="button"
            onClick={onOpenReviews}
            aria-label="5.0 rating over 24,500 plus verified reviews. Click to view detailed reviews"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200/90 bg-white/95 backdrop-blur-xs shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-xs sm:text-[13px] font-medium text-neutral-800 hover:border-neutral-300 hover:shadow-sm hover:bg-neutral-50/80 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-neutral-900"
          >
            {/* Crisp Star Icon */}
            <span 
              className="text-neutral-950 font-bold text-xs group-hover:scale-110 transition-transform duration-200"
              aria-hidden="true"
            >
              ★
            </span>
            <span className="tracking-tight text-neutral-800">
              5.0 over 24.5K + Reviews
            </span>
          </button>
        </motion.div>

        {/* Main Headline: 1:1 replica with exact wording and dual-tone visual hierarchy */}
        <motion.div variants={itemVariants} className="max-w-3xl">
          <h1 
            id="hero-heading" 
            className="text-[2.65rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.038em] leading-[1.07] sm:leading-[1.04]"
          >
            {/* First line: deep solid black */}
            <span className="block text-neutral-950">
              Do More. Stress Less.
            </span>
            {/* Second line: subtle soft charcoal tone as in original design */}
            <span className="block text-neutral-600 sm:text-neutral-600/90 mt-1 sm:mt-1.5">
              Let AI Handle It.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / Paragraph */}
        <motion.div variants={itemVariants} className="mt-5 sm:mt-6 max-w-xl">
          <p className="text-neutral-500 text-[15px] sm:text-base md:text-[17px] font-normal leading-relaxed tracking-[-0.01em]">
            <span className="block sm:inline">Our AI connects with your favorite tools to help you write,</span>{' '}
            <span className="block sm:inline">organize, and work faster everywhere.</span>
          </p>
        </motion.div>

        {/* CTA Button: 1:1 replica of "Start Free Trial" */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-9">
          <button
            type="button"
            onClick={onOpenTrial}
            className="group relative inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-[14px] sm:text-[15px] rounded-full px-7 sm:px-8 py-3.5 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            aria-label="Start Free Trial - 14-day full access, no credit card required"
          >
            <span>Start Free Trial</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
