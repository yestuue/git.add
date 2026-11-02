/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReviewModal } from './components/ReviewModal';
import { AuthModal } from './components/AuthModal';
import { ReferenceComparison } from './components/ReferenceComparison';

export default function App() {
  const [brandName, setBrandName] = useState<string>('Twinkle.ai');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'trial' | 'login'>('trial');

  const handleOpenTrial = () => {
    setAuthMode('trial');
    setIsAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans flex flex-col relative selection:bg-neutral-950 selection:text-white overflow-x-hidden">
      {/* WCAG 2.1 AAA Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-950 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-2 focus:outline-offset-2 focus:outline-neutral-900 text-sm font-medium transition-all"
      >
        Skip to main content
      </a>

      {/* Top Navigation Bar: 1:1 replica */}
      <Navbar
        brandName={brandName}
        onOpenTrial={handleOpenTrial}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main Landmark Containing the 1:1 Hero Design */}
      <main 
        id="main-content" 
        tabIndex={-1} 
        className="flex-1 flex flex-col items-center justify-center focus:outline-none"
      >
        <Hero
          onOpenReviews={() => setIsReviewModalOpen(true)}
          onOpenTrial={handleOpenTrial}
        />
      </main>

      {/* Accessible Modals */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        mode={authMode}
        brandName={brandName}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* 1:1 Replica Inspector & Verification Tools */}
      <ReferenceComparison
        currentBrand={brandName}
        onBrandChange={setBrandName}
      />
    </div>
  );
}
