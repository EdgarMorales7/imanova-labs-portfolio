import React from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  MessageSquare,
  Sparkles,
  Wrench
} from 'lucide-react';
import { PortfolioProject } from '../data/projects';

interface ProjectCardProps {
  project: PortfolioProject;
  priorityImage?: boolean;
  revealDelayMs?: number;
  onSelectProject: (project: PortfolioProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priorityImage = false,
  revealDelayMs = 0,
  onSelectProject
}) => {
  const statusStyles: Record<PortfolioProject['status'], string> = {
    production: 'border-emerald-500/35 bg-emerald-500/12 text-emerald-200',
    controlled_pilot: 'border-amber-500/35 bg-amber-500/12 text-amber-200',
    deployed_safe_mode: 'border-indigo-500/35 bg-indigo-500/12 text-indigo-200'
  };

  const statusDotStyles: Record<PortfolioProject['status'], string> = {
    production: 'bg-emerald-400',
    controlled_pilot: 'bg-amber-400',
    deployed_safe_mode: 'bg-indigo-400'
  };

  const isInternalAnchor = project.primaryUrl.startsWith('#');

  const renderActionIcon = () => {
    if (project.accessType === 'whatsapp_channel') {
      return <MessageSquare className="h-4 w-4" />;
    }
    if (project.accessType === 'interactive_demo') {
      return <Sparkles className="h-4 w-4" />;
    }
    return <ExternalLink className="h-4 w-4" />;
  };

  return (
    <article
      style={{ '--reveal-delay': `${revealDelayMs}ms` } as React.CSSProperties}
      className="surface-card interactive-card scroll-reveal group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.09] hover:border-indigo-400/40"
    >
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] bg-white/[0.015] px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-indigo-500/35 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 font-mono text-xs font-bold text-indigo-200">
              {project.number}
            </span>
            <span className="truncate text-xs font-medium text-slate-300">{project.category}</span>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[project.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[project.status]}`} />
            {project.statusLabel}
          </span>
        </div>

        {/* Real Screenshot Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.07] bg-[#05070c]">
          <img
            src={project.screenshot}
            alt={project.screenshotAlt}
            loading={priorityImage ? 'eager' : 'lazy'}
            fetchPriority={priorityImage ? 'high' : 'auto'}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            aria-label={`Ver galería y ficha técnica de ${project.name}`}
            className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#06080f]/95 via-[#06080f]/25 to-transparent p-3.5 opacity-95 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400"
          >
            <span className="line-clamp-1 text-left text-[11px] font-medium text-slate-200">
              {project.screenshotCaption}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-[#06080f]/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition-colors group-hover:border-indigo-400/50">
              <Eye className="h-3 w-3 text-indigo-400" />
              {project.gallery.length} capturas
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-indigo-200">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>

          {/* Verified Features */}
          <div className="mt-4">
            <p className="font-mono text-[10px] font-semibold tracking-wider text-indigo-300/90 uppercase">
              Funciones Principales Verificadas
            </p>
            <ul className="mt-2 space-y-1.5">
              {project.verifiedFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Honest In-Development Indicator */}
          {project.inDevelopmentFeatures.length > 0 && (
            <div className="mt-3.5 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] px-3 py-2">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300/95">
                <Wrench className="h-3 w-3 shrink-0" />
                <span>En evolución / Configuración pendiente:</span>
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400">
                {project.inDevelopmentFeatures[0]}
              </p>
            </div>
          )}

          {/* Verified Technologies Pills */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.verifiedTechnologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-0.5 font-mono text-[11px] text-slate-200"
                >
                  {tech}
                </span>
              ))}
              {project.verifiedTechnologies.length > 6 && (
                <span className="rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2 py-0.5 font-mono text-[11px] font-medium text-indigo-300">
                  +{project.verifiedTechnologies.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="border-t border-white/[0.07] bg-[#070a12]/90 px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={project.primaryUrl}
            target={isInternalAnchor ? undefined : '_blank'}
            rel={isInternalAnchor ? undefined : 'noopener noreferrer'}
            className="interactive-btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-indigo-400 hover:to-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {renderActionIcon()}
            <span>{project.actionLabel}</span>
          </a>

          {project.secondaryUrl && project.secondaryActionLabel && (
            <a
              href={project.secondaryUrl}
              target={project.secondaryUrl.startsWith('#') ? undefined : '_blank'}
              rel={project.secondaryUrl.startsWith('#') ? undefined : 'noopener noreferrer'}
              className="interactive-btn inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <span>{project.secondaryActionLabel}</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="interactive-btn inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-medium text-slate-300 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
          >
            <Eye className="h-3.5 w-3.5 text-indigo-400" />
            <span>Detalles</span>
          </button>
        </div>
      </div>
    </article>
  );
};
