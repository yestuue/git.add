import React from 'react';
import { GraduationCap, Award, Briefcase, Heart, Play, Volume2, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      aria-labelledby="about-heading"
      className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-8 sm:gap-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2">
        <h2 
          id="about-heading" 
          className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Educational Background & Aspirations
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
          Academic coursework profile at MIVA Open University, technical competencies in modern web systems, and professional roadmap.
        </p>
      </div>

      {/* Grid: 2 Columns for Bio/Aspirations & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Educational Background & Academic Transcript Table */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
          {/* Academic Background Card with Semantic HTML Table */}
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
            <CardContent className="p-5 xs:p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                      Educational Background
                    </h3>
                    <p className="text-xs text-neutral-400">
                      MIVA Open University · Department of Computer Science
                    </p>
                  </div>
                </div>

                <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>CGPA: 4.85 / 5.00</span>
                </div>
              </div>

              {/* Required Semantic HTML Table — Responsive Container */}
              <div className="w-full overflow-x-auto pb-2">
                <table className="w-full min-w-[500px] text-left text-xs sm:text-sm border-collapse" aria-label="Coursework Academic Records">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-400 font-semibold tracking-wider uppercase text-[11px]">
                      <th scope="col" className="py-3 px-3">Code</th>
                      <th scope="col" className="py-3 px-3">Course Title</th>
                      <th scope="col" className="py-3 px-3 text-center">Units</th>
                      <th scope="col" className="py-3 px-3 text-center">Sem</th>
                      <th scope="col" className="py-3 px-3 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-200">
                    <tr className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">COS 106</td>
                      <td className="py-3 px-3 font-medium text-white">Introduction to Web Technologies</td>
                      <td className="py-3 px-3 text-center text-neutral-400">3</td>
                      <td className="py-3 px-3 text-center text-neutral-400">1st</td>
                      <td className="py-3 px-3 text-right font-bold text-white">A (94%)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">COS 101</td>
                      <td className="py-3 px-3 font-medium text-white">Introduction to Computer Science</td>
                      <td className="py-3 px-3 text-center text-neutral-400">3</td>
                      <td className="py-3 px-3 text-center text-neutral-400">1st</td>
                      <td className="py-3 px-3 text-right font-bold text-white">A (91%)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">MTH 101</td>
                      <td className="py-3 px-3 font-medium text-white">Elementary Mathematics I</td>
                      <td className="py-3 px-3 text-center text-neutral-400">3</td>
                      <td className="py-3 px-3 text-center text-neutral-400">1st</td>
                      <td className="py-3 px-3 text-right font-bold text-white">A (89%)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">GST 101</td>
                      <td className="py-3 px-3 font-medium text-white">Use of English & Communication</td>
                      <td className="py-3 px-3 text-center text-neutral-400">2</td>
                      <td className="py-3 px-3 text-center text-neutral-400">1st</td>
                      <td className="py-3 px-3 text-right font-bold text-white">A (90%)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">PHY 101</td>
                      <td className="py-3 px-3 font-medium text-white">General Physics I</td>
                      <td className="py-3 px-3 text-center text-neutral-400">3</td>
                      <td className="py-3 px-3 text-center text-neutral-400">1st</td>
                      <td className="py-3 px-3 text-right font-bold text-white">A (87%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-neutral-400 pt-2 border-t border-white/10">
                <span>Total Registered Units: <strong className="text-white">14 Credits</strong></span>
                <span className="text-white font-medium">Standing: First Class Honors</span>
              </div>
            </CardContent>
          </Card>

          {/* Career Aspirations Card */}
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <CardContent className="p-5 xs:p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Briefcase className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                    Career Aspirations
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Vision & Professional Trajectory
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
                <p>
                  My goal is to evolve into a <strong className="text-white">Lead Full-Stack Web Architect</strong> and software engineer, 
                  building resilient, accessible, and high-performance digital platforms that solve real-world problems.
                </p>

                {/* Ordered List of Milestones (Semantic HTML requirement) */}
                <ol className="space-y-3 list-decimal list-inside text-neutral-300 text-xs sm:text-sm pl-1 marker:text-white marker:font-bold">
                  <li>
                    <strong className="text-white">Short-Term:</strong> Master advanced JavaScript ecosystems, TypeScript, and semantic Web Component design patterns.
                  </li>
                  <li>
                    <strong className="text-white">Medium-Term:</strong> Contribute to global open-source software, design resilient RESTful microservices, and earn cloud architecture certifications.
                  </li>
                  <li>
                    <strong className="text-white">Long-Term:</strong> Architect scalable educational technologies and enterprise web platforms empowering universities across Africa.
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Technical Skills, Hobbies & Interests, and Multimedia Video */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
          {/* Technical Skills Card (Semantic HTML List requirement) */}
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <CardContent className="p-5 xs:p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Code className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                    Technical Skills
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Languages & Core Web Standards
                  </p>
                </div>
              </div>

              {/* Semantic Unordered List with Monochrome Proficiency Bars */}
              <ul className="space-y-4" aria-label="Technical skill proficiency list">
                <li className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white">HTML5 & Semantic Web Elements</span>
                    <span className="text-neutral-400 font-mono">98%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '98%' }} />
                  </div>
                </li>

                <li className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white">CSS3 (Grid, Flexbox, Responsive)</span>
                    <span className="text-neutral-400 font-mono">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '95%' }} />
                  </div>
                </li>

                <li className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white">JavaScript ES6+ (DOM, Async, Regex)</span>
                    <span className="text-neutral-400 font-mono">92%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '92%' }} />
                  </div>
                </li>

                <li className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white">W3C Validation & WCAG Accessibility</span>
                    <span className="text-neutral-400 font-mono">96%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '96%' }} />
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Hobbies and Interests Card */}
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <CardContent className="p-5 xs:p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Heart className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
                    Hobbies & Interests
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Personal Passions Outside Academia
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-neutral-200" aria-label="Hobbies list">
                <li className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span>♟️</span>
                  <span>Competitive Chess</span>
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span>🌐</span>
                  <span>Open Source</span>
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span>📚</span>
                  <span>Algorithm Design</span>
                </li>
                <li className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <span>🎧</span>
                  <span>Tech Podcasts</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Multimedia Demonstration Card */}
          <Card className="rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
            <CardContent className="p-5 xs:p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white">
                  <Play className="w-4 h-4 fill-current" />
                  <span className="font-headline text-sm font-bold text-white uppercase tracking-wider">
                    Multimedia Demonstration
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 border border-white/10">
                  HTML5 Video &amp; Audio
                </span>
              </div>

              {/* HTML5 Video Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 aspect-video flex flex-col items-center justify-center gap-2 text-neutral-500">
                <video
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover hidden"
                >
                  Your browser does not support the video tag.
                </video>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-xs font-medium">Video demo placeholder</span>
              </div>

              <div className="space-y-1 text-left">
                <h4 className="font-headline text-xs sm:text-sm font-bold text-white">
                  COS 106 Student Project Overview &amp; Defense
                </h4>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  Video defense demonstrating HTML5 landmarks, CSS Grid implementation, and interactive JS.
                </p>
              </div>

              {/* Semantic HTML5 Audio Player */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-semibold">
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                  <span>Audio Self-Introduction Memo:</span>
                </div>
                <audio
                  controls
                  className="w-full h-9 rounded-lg"
                  preload="none"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
