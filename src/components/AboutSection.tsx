import React from 'react';
import { CheckCircle2, Lock, Sparkles, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="acerca"
      className="scroll-mt-20 border-t border-white/[0.07] bg-[#0b0e17] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              Acerca del Portafolio
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Enfoque práctico: de la idea a sistemas reales y auditables
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Desde febrero de 2026 he construido estos seis proyectos combinando herramientas de
              inteligencia artificial con arquitectura web moderna, bases de datos relacionales en
              Supabase, flujos de automatización en n8n y despliegues en contenedores sobre
              EasyPanel.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              El objetivo de este portafolio no es listar tecnologías de forma teórica, sino mostrar
              productos funcionales que resuelven problemas comerciales concretos: cotizar prendas
              personalizadas sin errores matemáticos, atender clientes en WhatsApp con supervisión
              humana y operar tiendas web conectadas a un mismo núcleo comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="rounded-xl border border-white/[0.08] bg-[#0f1422] p-4">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                IA donde aporta valor real
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                La IA se encarga de analizar imágenes de diseño, transcribir notas de voz y extraer
                intenciones de compra, mientras que el cálculo de precios permanece 100%
                determinista.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0f1422] p-4">
              <Lock className="h-5 w-5 text-emerald-400" />
              <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                Gobernanza y Seguridad RLS
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Políticas Row-Level Security por tenant, sesiones protegidas en servidor, escaneo
                antivirus ClamAV para archivos subidos y compuertas de aprobación humana.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0f1422] p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                Transparencia de Estado
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Cada tarjeta distingue con honestidad entre las funciones verificadas en producción
                y los módulos que se encuentran en piloto controlado o configuración previa.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0f1422] p-4">
              <Terminal className="h-5 w-5 text-indigo-400" />
              <h3 className="mt-2.5 font-display text-sm font-bold text-white">
                Ecosistema Conectado
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Integración real entre escaparates web, APIs de canal, webhooks de Meta WhatsApp,
                pasarelas de pago, generadores de PDF y cotizadores de paquetería.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
