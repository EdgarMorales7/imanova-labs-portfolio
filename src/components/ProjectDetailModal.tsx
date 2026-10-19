import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  FolderGit2,
  ShieldAlert,
  Sparkles,
  Wrench,
  X
} from 'lucide-react';
import { PortfolioProject } from '../data/projects';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

const canTransitionDisplay = (): boolean =>
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('transition-behavior', 'allow-discrete') &&
  CSS.supports('overlay', 'auto');

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [project?.id]);

  // Modern Web Guidance: Top-layer exit transition helper for <dialog>
  const closeWithTopLayerTransition = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) {
      onClose();
      return;
    }

    if (canTransitionDisplay()) {
      dialog.close();
      return;
    }

    dialog.setAttribute('data-closing', '');
    let cleaned = false;
    const finish = () => {
      if (cleaned) return;
      cleaned = true;
      dialog.removeAttribute('data-closing');
      if (dialog.open) {
        dialog.close();
      }
    };

    dialog.addEventListener('transitionend', finish, { once: true });
    window.setTimeout(finish, 260);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      dialog.removeAttribute('data-closing');
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [project]);

  // Modern Web Guidance: Safari fallback for <dialog closedby="any"> light-dismiss
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCloseEvent = () => {
      dialog.removeAttribute('data-closing');
      onClose();
    };

    const handleBackdropClick = (event: MouseEvent) => {
      if ('closedBy' in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isDialogContent) {
        closeWithTopLayerTransition();
      }
    };

    dialog.addEventListener('close', handleCloseEvent);
    dialog.addEventListener('click', handleBackdropClick);
    return () => {
      dialog.removeEventListener('close', handleCloseEvent);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [closeWithTopLayerTransition, onClose]);

  if (!project) return null;

  const currentImage = project.gallery[activeSlide] || {
    src: project.screenshot,
    alt: project.screenshotAlt,
    caption: project.screenshotCaption,
    sourceLabel: 'Captura verificada'
  };

  const isInternalAnchor = project.primaryUrl.startsWith('#');

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="modal-project-title"
      className="m-auto max-h-[90dvh] w-[94vw] max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0e17] p-0 text-slate-100 shadow-2xl"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0a0e17]/95 px-5 py-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 font-mono text-xs font-bold text-indigo-300">
            {project.number}
          </span>
          <div>
            <h2
              id="modal-project-title"
              className="font-display text-base font-bold text-white sm:text-lg"
            >
              {project.name}
            </h2>
            <p className="text-xs text-slate-400">
              {project.category} · <span className="text-indigo-300">{project.statusLabel}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={closeWithTopLayerTransition}
          aria-label="Cerrar ventana de detalles"
          className="interactive-btn inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Modal Content */}
      <div className="space-y-6 p-5 sm:p-6">
        {/* Gallery Viewer */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07090e]">
          <div className="relative aspect-[16/9] w-full bg-[#06080c]">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="h-full w-full object-contain"
            />
            {project.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide(
                      (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
                    )
                  }
                  aria-label="Captura anterior"
                  className="interactive-btn absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/15 bg-[#090b10]/85 p-2 text-white transition-colors hover:bg-indigo-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % project.gallery.length)}
                  aria-label="Siguiente captura"
                  className="interactive-btn absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/15 bg-[#090b10]/85 p-2 text-white transition-colors hover:bg-indigo-500"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#0a0d14] px-4 py-2.5 text-xs">
            <span className="text-slate-300">{currentImage.caption}</span>
            <span className="font-mono text-[11px] text-indigo-300">
              {currentImage.sourceLabel} ({activeSlide + 1}/{project.gallery.length})
            </span>
          </div>
        </div>

        {/* Access Notice if applicable */}
        {project.accessNotice && (
          <div className="flex items-start gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-xs leading-relaxed text-indigo-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <div>
              <strong className="font-semibold text-white">Nota sobre acceso y pruebas: </strong>
              {project.accessNotice}
            </div>
          </div>
        )}

        {/* Objective & Architecture */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Objetivo Principal
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              {project.detailedObjective}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              Arquitectura Verificada
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              {project.architectureSummary}
            </p>
          </div>
        </div>

        {/* Verified Features vs In-Development Features */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Funcionalidades Implementadas y Verificadas
            </h3>
            <ul className="mt-3 space-y-2">
              {project.verifiedFeatures.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs leading-relaxed text-slate-200"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-4">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-300 uppercase">
              <Wrench className="h-4 w-4 text-amber-400" />
              En Desarrollo / Pendiente de Activación
            </h3>
            <ul className="mt-3 space-y-2">
              {project.inDevelopmentFeatures.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {project.pendingConfirmation.length > 0 && (
              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase">
                  <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
                  Información Pendiente de Confirmar
                </p>
                <ul className="mt-1.5 space-y-1">
                  {project.pendingConfirmation.map((pend, idx) => (
                    <li key={idx} className="text-xs text-slate-400">
                      • {pend}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Integrations & Tech Stack */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
          <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Integraciones y Dependencias Clave
          </h3>
          <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.integrations.map((integration, idx) => (
              <li
                key={idx}
                className="rounded-lg border border-white/[0.06] bg-[#090b10] px-3 py-2 text-xs text-slate-300"
              >
                {integration}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06] pt-3">
            {project.verifiedTechnologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 font-mono text-[11px] text-indigo-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <FolderGit2 className="h-4 w-4 text-indigo-400" />
            <span>Repo: {project.repositoryUrl.replace('https://github.com/', '')}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.secondaryUrl && project.secondaryActionLabel && (
              <a
                href={project.secondaryUrl}
                target={project.secondaryUrl.startsWith('#') ? undefined : '_blank'}
                rel={project.secondaryUrl.startsWith('#') ? undefined : 'noopener noreferrer'}
                onClick={() => {
                  if (project.secondaryUrl?.startsWith('#')) closeWithTopLayerTransition();
                }}
                className="interactive-btn inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white hover:bg-white/[0.1]"
              >
                <span>{project.secondaryActionLabel}</span>
              </a>
            )}
            <a
              href={project.primaryUrl}
              target={isInternalAnchor ? undefined : '_blank'}
              rel={isInternalAnchor ? undefined : 'noopener noreferrer'}
              onClick={() => {
                if (isInternalAnchor) closeWithTopLayerTransition();
              }}
              className="interactive-btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-xs font-semibold text-white hover:from-indigo-400 hover:to-violet-400"
            >
              {isInternalAnchor ? (
                <Sparkles className="h-4 w-4" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              <span>{project.actionLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
};
