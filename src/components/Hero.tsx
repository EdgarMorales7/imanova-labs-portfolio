import React from 'react';
import { ArrowDownRight, Bot, CheckCircle2, Globe, ShieldCheck, Sparkles } from 'lucide-react';
import { PORTFOLIO_METADATA } from '../data/projects';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] pt-10 pb-14 sm:pt-16 sm:pb-20">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Status & Project Count Indicator */}
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              {PORTFOLIO_METADATA.totalProjects} Proyectos Documentados y Verificados
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-400">
              Desde {PORTFOLIO_METADATA.sinceDate}
            </span>
          </div>

          {/* Exact Main Title */}
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
            {PORTFOLIO_METADATA.heroTitle}
          </h1>

          {/* Exact Description */}
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            {PORTFOLIO_METADATA.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Explorar los 6 proyectos
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <a
              href="#demo-cotiz-ai"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.08] hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              Probar Demo de Cotiz AI
            </a>
          </div>
        </div>

        {/* Summary Metrics Bar */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/[0.07] bg-[#0e121b] p-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Catálogo del Portafolio</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">6 Proyectos</p>
            <p className="mt-0.5 text-xs text-slate-400">
              3 sitios e-commerce, 2 chatbots de WhatsApp y 1 SaaS/CRM central.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#0e121b] p-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Servicios Web Activos</span>
              <Globe className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">HTTP 200 En Vivo</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Desplegados en EasyPanel con contenedores Docker y dominios HTTPS.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#0e121b] p-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Automatización e IA</span>
              <Bot className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">OpenAI + n8n</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Visión DTG, extracción estructurada, transcripción Whisper y agentes.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#0e121b] p-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Gobernanza y Precisión</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">100% Determinista</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Precios en centavos, políticas RLS en Supabase y revisión humana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
