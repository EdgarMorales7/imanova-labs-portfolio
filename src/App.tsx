import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CotizAiDemo } from './components/CotizAiDemo';
import { TechnologiesSection } from './components/TechnologiesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PortfolioProject, PROJECTS } from './data/projects';

export function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'web' | 'chatbot' | 'saas'>('all');

  const filteredProjects = PROJECTS.filter((project) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'web') return project.accessType === 'public_web';
    if (categoryFilter === 'chatbot') return project.accessType === 'whatsapp_channel';
    if (categoryFilter === 'saas') return project.accessType === 'interactive_demo';
    return true;
  });

  // Modern Web Guidance: IntersectionObserver & Scroll Progress fallbacks for browsers without CSS Scroll-Driven Animations
  useEffect(() => {
    const supportsViewTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: scroll()');

    let observer: IntersectionObserver | null = null;

    if (!supportsViewTimeline && typeof IntersectionObserver !== 'undefined') {
      const elements = document.querySelectorAll<HTMLElement>('.scroll-reveal');
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-revealed', 'true');
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.setAttribute('data-revealed', 'true');
        } else {
          el.setAttribute('data-reveal-ready', 'true');
          observer?.observe(el);
        }
      });
    }

    let handleScroll: (() => void) | null = null;
    if (!supportsScrollTimeline) {
      handleScroll = () => {
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - doc.clientHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        doc.style.setProperty('--scroll-progress', progress.toFixed(4));
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      observer?.disconnect();
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [categoryFilter]);

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100">
      <Header />

      <main>
        <Hero />

        {/* Catalog Section: 6 Projects */}
        <section id="proyectos" className="relative scroll-mt-20 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="scroll-reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-300 uppercase">
                  <Sparkles className="h-3 w-3 text-indigo-400" />
                  Catálogo de Proyectos (01 — 06)
                </div>
                <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Seis soluciones construidas y verificadas
                </h2>
              </div>

              {/* Filter Pills */}
              <div
                role="group"
                aria-label="Filtrar proyectos por tipo"
                className="flex flex-wrap gap-1.5"
              >
                {(
                  [
                    { key: 'all', label: 'Todos (6)' },
                    { key: 'web', label: 'Sitios Web (3)' },
                    { key: 'chatbot', label: 'Chatbots WhatsApp (2)' },
                    { key: 'saas', label: 'SaaS / CRM (1)' }
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setCategoryFilter(tab.key)}
                    className={`interactive-btn rounded-xl px-3.5 py-2 text-xs font-medium transition-colors ${
                      categoryFilter === tab.key
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20'
                        : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:border-indigo-400/30 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column Desktop Grid / 1-Column Mobile Grid */}
            <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priorityImage={index < 3}
                  revealDelayMs={(index % 3) * 70}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Task 4: Interactive Safe Demo of Cotiz AI */}
        <CotizAiDemo />

        {/* Verified Technologies Summary */}
        <TechnologiesSection />

        {/* Author Profile & CV + Brief Context About the Portfolio */}
        <AboutSection />
      </main>

      <Footer />

      {/* Project Detail Modal (<dialog closedby="any">) */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
