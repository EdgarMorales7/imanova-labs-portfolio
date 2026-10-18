import React from 'react';
import { Bot, Cpu, Database, Server } from 'lucide-react';
import { VERIFIED_TECH_CATEGORIES } from '../data/projects';

export const TechnologiesSection: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Cpu className="h-4 w-4 text-indigo-400" />;
      case 'ai-automation':
        return <Bot className="h-4 w-4 text-indigo-400" />;
      case 'backend-data':
        return <Database className="h-4 w-4 text-emerald-400" />;
      default:
        return <Server className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <section
      id="tecnologias"
      className="scroll-mt-20 border-t border-white/[0.07] bg-[#090b10] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Stack Técnico Comprobado
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Tecnologías verificadas en los repositorios
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
            Resumen compacto de las herramientas e integraciones que realmente operan dentro de los
            seis proyectos, verificadas directamente en código, esquemas SQL y contenedores.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {VERIFIED_TECH_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-white/[0.08] bg-[#0e121b] p-5 sm:p-6"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  {getCategoryIcon(category.id)}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-slate-400">{category.subtitle}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-white/[0.06] bg-[#0a0d14] p-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-white">
                        {item.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.usedIn.map((proj) => (
                          <span
                            key={proj}
                            className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-300"
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
