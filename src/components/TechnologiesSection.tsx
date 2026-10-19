import React from 'react';
import { Bot, Cpu, Database, Server, Sparkles } from 'lucide-react';
import { VERIFIED_TECH_CATEGORIES } from '../data/projects';

export const TechnologiesSection: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Cpu className="h-4 w-4 text-indigo-400" />;
      case 'ai-automation':
        return <Bot className="h-4 w-4 text-violet-400" />;
      case 'backend-data':
        return <Database className="h-4 w-4 text-emerald-400" />;
      default:
        return <Server className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <section
      id="tecnologias"
      className="relative scroll-mt-20 border-t border-white/[0.07] bg-[#06080f] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-300 uppercase">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            Stack Técnico Comprobado
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Tecnologías verificadas en los repositorios
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
            Resumen compacto de las herramientas e integraciones que realmente operan dentro de los
            seis proyectos, verificadas directamente en código, esquemas SQL y contenedores de
            producción.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {VERIFIED_TECH_CATEGORIES.map((category, idx) => (
            <div
              key={category.id}
              style={{ animationDelay: `${idx * 70}ms` }}
              className="surface-card interactive-card scroll-reveal rounded-2xl p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 shadow-inner shadow-indigo-500/10">
                  {getCategoryIcon(category.id)}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-slate-400">{category.subtitle}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-white/[0.07] bg-[#080b13]/90 p-3.5 transition-colors hover:border-indigo-500/25"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-white">
                        {item.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.usedIn.map((proj) => (
                          <span
                            key={proj}
                            className="rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-200"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
