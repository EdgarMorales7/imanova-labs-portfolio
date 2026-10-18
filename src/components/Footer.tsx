import React from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import { PORTFOLIO_METADATA } from '../data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <span className="font-display text-sm font-bold tracking-wider text-white">
              {PORTFOLIO_METADATA.brandHeader}
            </span>
            <p className="text-xs text-slate-400">{PORTFOLIO_METADATA.footerText}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <a href="#proyectos" className="transition-colors hover:text-white">
            Proyectos
          </a>
          <a href="#demo-cotiz-ai" className="transition-colors hover:text-white">
            Demo Cotiz AI
          </a>
          <a href="#tecnologias" className="transition-colors hover:text-white">
            Tecnologías
          </a>
          <a
            href={PORTFOLIO_METADATA.immanovaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-medium text-slate-200 transition-colors hover:border-indigo-400/40 hover:text-white"
          >
            <span>IMMANOVA ({PORTFOLIO_METADATA.immanovaUrl.replace('https://', '')})</span>
            <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
