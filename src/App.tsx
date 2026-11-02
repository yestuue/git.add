import React, { useState } from 'react';
import { Navbar, type PageTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { QuickOrientation } from './components/QuickOrientation';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AcademicPlanner } from './components/AcademicPlanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import TopologyField from './components/TopologyField';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId as PageTab);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="dark relative min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black overflow-x-hidden">
      {/* 3D Animated Topology Field Canvas Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <TopologyField className="w-full h-full opacity-70 pointer-events-none" />
      </div>

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-xl focus:outline-none text-sm font-bold"
      >
        Skip to main content
      </a>

      {/* Main Content Layout over Background */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {/* Sticky Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={(tab) => handleNavigate(tab)}
        />

        {/* Main Content Landmark */}
        <main 
          id="main-content" 
          tabIndex={-1} 
          className="flex-1 flex flex-col items-center w-full focus:outline-none pt-[64px] sm:pt-[72px]"
        >
          {/* ① Hero — First Impression & Identity */}
          <Hero onNavigate={handleNavigate} />

          {/* ② Quick Orientation — Roadmap for new visitors */}
          <QuickOrientation onNavigate={handleNavigate} />

          {/* ③ Features / Web Standards Section */}
          <Features />

          {/* ④ About Me — Background, Skills, Multimedia */}
          <AboutSection />

          {/* ⑤ Projects — Sample Work Showcase */}
          <ProjectsSection />

          {/* ⑥ Academic Task Planner — Interactive JS System */}
          <AcademicPlanner />

          {/* ⑦ Contact — Validated Form */}
          <ContactSection />
        </main>

        {/* Site Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
