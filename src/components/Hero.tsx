import React from 'react';
import {
  ArrowDownRight,
  Bot,
  CheckCircle2,
  Cpu,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AUTHOR_PROFILE, PORTFOLIO_METADATA } from '../data/projects';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-architectural-grid pt-10 pb-14 sm:pt-16 sm:pb-20">
      {/* Multi-layer ambient aurora lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 -z-10 h-[460px] w-[780px] -translate-x-1/2 rounded-full bg-indigo-500/[0.11] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 -z-10 h-[360px] w-[520px] rounded-full bg-cyan-500/[0.07] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Main Portfolio Message */}
          <div className="hero-entrance lg:col-span-7">
            {/* Status & Project Count Indicator */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/35 bg-indigo-500/12 px-3.5 py-1 text-xs font-semibold text-indigo-200 shadow-[0_0_20px_-6px_rgba(99,102,241,0.5)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {PORTFOLIO_METADATA.totalProjects} Proyectos Documentados y Verificados
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">
                {PORTFOLIO_METADATA.brandHeader} · Desde {PORTFOLIO_METADATA.sinceDate}
              </span>
            </div>

            {/* Exact Main Title */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                {PORTFOLIO_METADATA.heroTitle}
              </span>
            </h1>

            {/* Exact Description */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {PORTFOLIO_METADATA.heroDescription}
            </p>

            {/* Author Attribution Inline Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 font-medium text-white">
                <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                Desarrollado por <strong>{AUTHOR_PROFILE.fullName}</strong>
              </span>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
                Ing. en Sistemas Automotrices (UPIITA - IPN)
              </span>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#proyectos"
                className="interactive-btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-6px_rgba(99,102,241,0.55)] hover:from-indigo-400 hover:to-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Explorar los 6 proyectos
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="#demo-cotiz-ai"
                className="interactive-btn inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" />
                Probar Demo de Cotiz AI
              </a>
              <a
                href="#acerca"
                className="interactive-btn inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
              >
                Ver trayectoria y CV
              </a>
            </div>
          </div>

          {/* Right Column: Executive Author Card */}
          <div className="hero-entrance lg:col-span-5" style={{ '--entrance-delay': '120ms' } as React.CSSProperties}>
            <div className="surface-card-elevated interactive-card relative overflow-hidden rounded-2xl border border-white/12 p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-2xl"
              />

              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={AUTHOR_PROFILE.avatarUrl}
                    alt={AUTHOR_PROFILE.fullName}
                    className="h-16 w-16 rounded-2xl object-cover object-top ring-2 ring-indigo-400/50 sm:h-20 sm:w-20"
                  />
                  <span
                    title="Disponible para proyectos de IA y Automatización"
                    className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0a0e1a] ring-2 ring-[#0a0e1a]"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                </div>

                <div className="min-w-0">
                  <span className="inline-block font-mono text-[10px] font-semibold tracking-widest text-indigo-300 uppercase">
                    Arquitecto & Desarrollador Principal
                  </span>
                  <h2 className="truncate font-display text-lg font-bold text-white sm:text-xl">
                    {AUTHOR_PROFILE.fullName}
                  </h2>
                  <p className="mt-0.5 text-xs leading-snug text-slate-300">
                    {AUTHOR_PROFILE.headline}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-300">
                Especializado en diseñar e implementar <strong>chatbots comerciales en n8n</strong>,{' '}
                <strong>motores deterministas de cotización web</strong> y soluciones asistidas por IA que
                automatizan la atención y las ventas reales en talleres y marcas textiles.
              </p>

              {/* Key Credentials Badges */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                  <span className="block font-mono text-[10px] text-slate-400">Rol Actual (2026)</span>
                  <span className="font-semibold text-white">Dev Web, Automatización e IA</span>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                  <span className="block font-mono text-[10px] text-slate-400">Formación</span>
                  <span className="font-semibold text-white">UPIITA - IPN (2020–2025)</span>
                </div>
              </div>

              {/* Contact & Location Footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-3.5 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                  {AUTHOR_PROFILE.location}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${AUTHOR_PROFILE.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-indigo-400/40 hover:text-white"
                  >
                    <Mail className="h-3 w-3 text-indigo-400" />
                    Contacto
                  </a>
                  <a
                    href="#acerca"
                    className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
                  >
                    Perfil completo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Metrics Bar */}
        <div className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="surface-card interactive-card scroll-reveal rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Catálogo del Portafolio</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </span>
            </div>
            <p className="mt-2.5 font-display text-2xl font-bold text-white">6 Proyectos</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              3 sitios e-commerce, 2 chatbots de WhatsApp y 1 SaaS/CRM central.
            </p>
          </div>

          <div className="surface-card interactive-card scroll-reveal rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Servicios Web Activos</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-500/25 bg-indigo-500/10">
                <Globe className="h-4 w-4 text-indigo-400" />
              </span>
            </div>
            <p className="mt-2.5 font-display text-2xl font-bold text-white">HTTP 200 En Vivo</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Desplegados en EasyPanel con contenedores Docker y dominios HTTPS.
            </p>
          </div>

          <div className="surface-card interactive-card scroll-reveal rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Automatización e IA</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/10">
                <Bot className="h-4 w-4 text-violet-400" />
              </span>
            </div>
            <p className="mt-2.5 font-display text-2xl font-bold text-white">OpenAI + n8n</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Visión DTG, extracción estructurada, transcripción Whisper y agentes.
            </p>
          </div>

          <div className="surface-card interactive-card scroll-reveal rounded-2xl border border-white/[0.08] p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Gobernanza y Precisión</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </span>
            </div>
            <p className="mt-2.5 font-display text-2xl font-bold text-white">100% Determinista</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Precios en centavos, políticas RLS en Supabase y revisión humana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
