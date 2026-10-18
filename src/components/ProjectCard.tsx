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
  onSelectProject: (project: PortfolioProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priorityImage = false,
  onSelectProject
}) => {
  const statusStyles: Record<PortfolioProject['status'], string> = {
    production: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    controlled_pilot: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    deployed_safe_mode: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
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
    <article className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0e121b] transition-all duration-200 hover:border-white/[0.18] hover:bg-[#111622]">
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-indigo-500/30 bg-indigo-500/10 font-mono text-xs font-bold text-indigo-300">
              {project.number}
            </span>
            <span className="text-xs font-medium text-slate-400">{project.category}</span>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[project.status]}`}
          >
            {project.statusLabel}
          </span>
        </div>

        {/* Real Screenshot Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06] bg-[#07090e]">
          <img
            src={project.screenshot}
            alt={project.screenshotAlt}
            loading={priorityImage ? 'eager' : 'lazy'}
            fetchPriority={priorityImage ? 'high' : 'auto'}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            aria-label={`Ver galería y ficha técnica de ${project.name}`}
            className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#090b10]/90 via-[#090b10]/20 to-transparent p-3.5 opacity-95 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400"
          >
            <span className="line-clamp-1 text-left text-[11px] text-slate-300">
              {project.screenshotCaption}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-white/15 bg-[#090b10]/85 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <Eye className="h-3 w-3 text-indigo-400" />
              {project.gallery.length} capturas
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h3 className="font-display text-lg font-bold text-white">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>

          {/* Verified Features */}
          <div className="mt-4">
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
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
            <div className="mt-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-amber-300/90">
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
                  className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-300"
                >
                  {tech}
                </span>
              ))}
              {project.verifiedTechnologies.length > 6 && (
                <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  +{project.verifiedTechnologies.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="border-t border-white/[0.06] bg-[#0b0e16] px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={project.primaryUrl}
            target={isInternalAnchor ? undefined : '_blank'}
            rel={isInternalAnchor ? undefined : 'noopener noreferrer'}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {renderActionIcon()}
            <span>{project.actionLabel}</span>
          </a>

          {project.secondaryUrl && project.secondaryActionLabel && (
            <a
              href={project.secondaryUrl}
              target={project.secondaryUrl.startsWith('#') ? undefined : '_blank'}
              rel={project.secondaryUrl.startsWith('#') ? undefined : 'noopener noreferrer'}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              <span>{project.secondaryActionLabel}</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
          >
            <Eye className="h-3.5 w-3.5 text-indigo-400" />
            <span>Detalles</span>
          </button>
        </div>
      </div>
    </article>
  );
};
