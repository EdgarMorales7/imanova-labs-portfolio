import React, { useState } from 'react';
import { Layers, Menu, Sparkles, X } from 'lucide-react';
import { PORTFOLIO_METADATA } from '../data/projects';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Demo Cotiz AI', href: '#demo-cotiz-ai', highlight: true },
    { label: 'Tecnologías', href: '#tecnologias' },
    { label: 'Acerca del portafolio', href: '#acerca' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#090b10]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#"
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 transition-colors group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <span className="block font-display text-sm font-bold tracking-wider text-white sm:text-base">
              {PORTFOLIO_METADATA.brandHeader}
            </span>
            <span className="block font-mono text-[10px] tracking-widest text-slate-400">
              AI PROJECTS
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {navItems.map((item) =>
            item.highlight ? (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-300 hover:bg-white/[0.08] hover:text-white md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-white/[0.07] bg-[#0c0f17] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  item.highlight
                    ? 'border border-indigo-500/30 bg-indigo-500/10 text-indigo-200'
                    : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && <Sparkles className="h-4 w-4 text-indigo-400" />}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
