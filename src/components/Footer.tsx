import React from 'react';
import { ExternalLink, Layers, Mail, MapPin } from 'lucide-react';
import { AUTHOR_PROFILE, PORTFOLIO_METADATA } from '../data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070c] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/35 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 shadow-inner shadow-indigo-500/15">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-display text-sm font-bold tracking-wider text-white">
                {PORTFOLIO_METADATA.brandHeader}
              </span>
              <p className="text-xs text-slate-400">{PORTFOLIO_METADATA.footerText}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            <a href="#proyectos" className="transition-colors hover:text-white">
              Proyectos
            </a>
            <a href="#demo-cotiz-ai" className="transition-colors hover:text-white">
              Demo Cotiz AI
            </a>
            <a href="#tecnologias" className="transition-colors hover:text-white">
              Tecnologías
            </a>
            <a href="#acerca" className="transition-colors hover:text-white">
              Sobre Edgar / CV
            </a>
            <a
              href={PORTFOLIO_METADATA.immanovaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-btn inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.03] px-3.5 py-2 font-medium text-slate-200 transition-colors hover:border-indigo-400/40 hover:text-white"
            >
              <span>IMMANOVA ({PORTFOLIO_METADATA.immanovaUrl.replace('https://', '')})</span>
              <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-slate-400 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300">
            <span className="font-semibold text-white">{AUTHOR_PROFILE.fullName}</span>
            <span className="text-slate-600">·</span>
            <span>{AUTHOR_PROFILE.degree} ({AUTHOR_PROFILE.institution})</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-indigo-400" />
              {AUTHOR_PROFILE.location}
            </span>
            <a
              href={`mailto:${AUTHOR_PROFILE.email}`}
              className="inline-flex items-center gap-1.5 text-indigo-300 transition-colors hover:text-indigo-200"
            >
              <Mail className="h-3.5 w-3.5" />
              {AUTHOR_PROFILE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
