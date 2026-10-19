import React, { useState } from 'react';
import { Layers, Menu, Sparkles, UserCheck, X } from 'lucide-react';
import { AUTHOR_PROFILE, PORTFOLIO_METADATA } from '../data/projects';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Demo Cotiz AI', href: '#demo-cotiz-ai', highlight: true },
    { label: 'Tecnologías', href: '#tecnologias' },
    { label: 'Sobre Mí · CV', href: '#acerca' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06080f]/85 backdrop-blur-xl">
      {/* CSS Scroll-Driven Top Progress Bar */}
      <div
        aria-hidden="true"
        className="scroll-progress-bar h-[2px] w-full bg-gradient-to-r from-indigo-500 via-violet-400 to-emerald-400"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#"
          className="group flex items-center gap-3.5 text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-cyan-500/10 text-indigo-300 shadow-[0_0_20px_-4px_rgba(99,102,241,0.45)] transition-all duration-300 group-hover:border-indigo-400/70 group-hover:shadow-[0_0_26px_-2px_rgba(99,102,241,0.65)]">
            <Layers className="h-4 w-4 text-indigo-300" />
          </div>
          <div>
            <span className="block font-brand text-sm font-bold tracking-[0.12em] text-white sm:text-base">
              {PORTFOLIO_METADATA.brandHeader}
            </span>
            <span className="block font-mono text-[10px] tracking-[0.18em] text-indigo-300/80">
              AI PROJECTS · {AUTHOR_PROFILE.shortName.toUpperCase()}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex md:items-center md:gap-1.5 lg:gap-2">
          {navItems.map((item) =>
            item.highlight ? (
              <a
                key={item.href}
                href={item.href}
                className="interactive-btn inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/35 bg-gradient-to-r from-indigo-500/15 to-violet-500/15 px-3.5 py-1.5 text-xs font-semibold text-indigo-200 shadow-sm hover:border-indigo-400/60 hover:text-white"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </a>
            )
          )}

          {/* Author Quick Pill */}
          <a
            href="#acerca"
            className="interactive-btn ml-2 hidden items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1 pr-3.5 pl-1.5 text-xs font-medium text-slate-200 hover:border-indigo-400/40 hover:bg-white/[0.08] hover:text-white lg:inline-flex"
          >
            <img
              src={AUTHOR_PROFILE.avatarUrl}
              alt={AUTHOR_PROFILE.fullName}
              className="h-6 w-6 rounded-full object-cover object-top ring-1 ring-indigo-400/50"
            />
            <span>{AUTHOR_PROFILE.shortName}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 hover:bg-white/[0.08] hover:text-white md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-white/[0.08] bg-[#090d18] px-4 py-3.5 md:hidden"
        >
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  item.highlight
                    ? 'border border-indigo-500/35 bg-indigo-500/15 text-indigo-200'
                    : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && <Sparkles className="h-4 w-4 text-indigo-400" />}
              </a>
            ))}
            <a
              href="#acerca"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-slate-200"
            >
              <img
                src={AUTHOR_PROFILE.avatarUrl}
                alt={AUTHOR_PROFILE.fullName}
                className="h-7 w-7 rounded-full object-cover object-top ring-1 ring-indigo-400/50"
              />
              <div>
                <p className="font-semibold text-white">{AUTHOR_PROFILE.fullName}</p>
                <p className="text-[11px] text-slate-400">UPIITA - IPN · Ing. en Sistemas Automotrices & IA</p>
              </div>
              <UserCheck className="ml-auto h-4 w-4 text-emerald-400" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
