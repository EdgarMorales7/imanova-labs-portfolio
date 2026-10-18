import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100">
      <Header />

      <main>
        <Hero />

        {/* Catalog Section: 6 Projects */}
        <section id="proyectos" className="scroll-mt-20 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                  Catálogo de Proyectos (01 — 06)
                </span>
                <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
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
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      categoryFilter === tab.key
                        ? 'bg-indigo-500 text-white'
                        : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column Desktop Grid / 1-Column Mobile Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priorityImage={index < 3}
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

        {/* Brief Context About the Portfolio */}
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
