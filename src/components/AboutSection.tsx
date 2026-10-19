import React from 'react';
import {
  Briefcase,
  CheckCircle2,
  Code2,
  ExternalLink,
  GraduationCap,
  Languages,
  Lock,
  Mail,
  MapPin,
  Sparkles,
  Terminal
} from 'lucide-react';
import { AUTHOR_PROFILE } from '../data/projects';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="acerca"
      className="scroll-mt-20 border-t border-white/[0.08] bg-[#080c16] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-reveal max-w-3xl">
          <span className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Perfil Profesional y Trayectoria · CV
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
            {AUTHOR_PROFILE.fullName}
          </h2>
          <p className="mt-1.5 font-display text-sm font-semibold text-indigo-300 sm:text-base">
            {AUTHOR_PROFILE.headline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            {AUTHOR_PROFILE.summary}
          </p>
        </div>

        {/* Main Profile + Experience Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Profile Summary, Education, Skills & Contact (5 cols) */}
          <div className="space-y-5 lg:col-span-5">
            {/* Identity & Education Card */}
            <div className="surface-card interactive-card scroll-reveal rounded-2xl border border-white/[0.09] p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <img
                  src={AUTHOR_PROFILE.avatarUrl}
                  alt={AUTHOR_PROFILE.fullName}
                  loading="lazy"
                  className="h-20 w-20 rounded-2xl object-cover object-top ring-2 ring-indigo-500/40"
                />
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    IMMANOVA LABS · Fundador & Dev
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                    {AUTHOR_PROFILE.fullName}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                    {AUTHOR_PROFILE.location}
                  </p>
                </div>
              </div>

              {/* Academic Formation */}
              <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.06] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-indigo-300 uppercase">
                    <GraduationCap className="h-4 w-4 text-indigo-400" />
                    Estudios Superiores
                  </span>
                  <span className="font-mono text-[11px] text-slate-300">
                    {AUTHOR_PROFILE.educationPeriod}
                  </span>
                </div>
                <p className="mt-1.5 font-display text-sm font-bold text-white">
                  {AUTHOR_PROFILE.degree}
                </p>
                <p className="mt-0.5 text-xs text-slate-300">{AUTHOR_PROFILE.institution}</p>
              </div>

              {/* Languages */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
                  <Languages className="h-4 w-4 text-indigo-400" />
                  Idiomas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {AUTHOR_PROFILE.languages.map((lang) => (
                    <span
                      key={lang.language}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-200"
                    >
                      <strong>{lang.language}:</strong> {lang.level}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Contact Actions */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${AUTHOR_PROFILE.email}`}
                  className="interactive-btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:from-indigo-400 hover:to-violet-400"
                >
                  <Mail className="h-4 w-4" />
                  <span>{AUTHOR_PROFILE.email}</span>
                </a>
                <a
                  href={AUTHOR_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-btn inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
                </a>
              </div>
            </div>

            {/* Core Competencies Card */}
            <div className="surface-card interactive-card scroll-reveal rounded-2xl border border-white/[0.09] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                  Habilidades y Enfoque Técnico
                </h3>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {AUTHOR_PROFILE.coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience Timeline & Engineering Pillars (7 cols) */}
          <div className="space-y-5 lg:col-span-7">
            {/* Experience Timeline Card */}
            <div className="surface-card scroll-reveal rounded-2xl border border-white/[0.09] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10">
                  <Briefcase className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    Experiencia Laboral y de Ingeniería
                  </h3>
                  <p className="text-xs text-slate-400">
                    Trayectoria aplicando automatización, inteligencia artificial y desarrollo de software
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {AUTHOR_PROFILE.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative border-l-2 border-indigo-500/35 pl-5"
                  >
                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-indigo-400 bg-[#080c16]" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-white sm:text-base">
                        {exp.role}
                      </h4>
                      <span className="rounded-full border border-indigo-500/30 bg-indigo-500/12 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-200">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-emerald-300">
                      {exp.organization}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {exp.highlights.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Engineering Principles Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="surface-card interactive-card scroll-reveal rounded-xl border border-white/[0.08] p-4">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                  IA donde aporta valor real
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  La IA analiza imágenes de diseño, transcribe notas de voz y extrae intenciones de
                  compra, mientras que el cálculo de precios permanece 100% determinista.
                </p>
              </div>

              <div className="surface-card interactive-card scroll-reveal rounded-xl border border-white/[0.08] p-4">
                <Lock className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                  Gobernanza y Seguridad RLS
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Políticas Row-Level Security por tenant, sesiones protegidas en servidor, escaneo
                  antivirus ClamAV para archivos subidos y compuertas de aprobación humana.
                </p>
              </div>

              <div className="surface-card interactive-card scroll-reveal rounded-xl border border-white/[0.08] p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                  Transparencia de Estado
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Cada tarjeta distingue con honestidad entre las funciones verificadas en producción
                  y los módulos que se encuentran en piloto controlado o configuración previa.
                </p>
              </div>

              <div className="surface-card interactive-card scroll-reveal rounded-xl border border-white/[0.08] p-4">
                <Terminal className="h-5 w-5 text-indigo-400" />
                <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                  De Hardware a Sistemas Cloud
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Base sólida de ingeniería en sistemas automotrices (UPIITA-IPN) aplicada a
                  arquitectura de software, webhooks, pasarelas de pago y contenedores en producción.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
