import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Calculator,
  CheckCircle2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Kanban,
  Lock,
  MessageSquare,
  Mic,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';
import {
  calculateCotizAiDemoQuote,
  DEMO_SCENARIOS,
  formatMxnFromCents,
  GARMENT_CATALOG_PRICES
} from '../data/cotizAiDemoData';

interface CrmLeadCard {
  id: string;
  folio: string;
  company: string;
  summary: string;
  amount: string;
  stage: 'nuevas' | 'revision' | 'cotizadas' | 'produccion';
  slaAlert?: boolean;
}

const INITIAL_CRM_CARDS: CrmLeadCard[] = [
  {
    id: 'c1',
    folio: 'SOL-DEMO-024',
    company: 'Grupo Logístico del Valle',
    summary: '30 Polos Piqué 320g · 1 bordado pecho (7,000 puntadas)',
    amount: '$13,653.20 MXN',
    stage: 'revision'
  },
  {
    id: 'c2',
    folio: 'SOL-DEMO-019',
    company: 'Productora Atlas',
    summary: '60 Sudaderas del cliente ($0 prenda) · 2 bordados c/u',
    amount: '$3,886.00 MXN',
    stage: 'nuevas',
    slaAlert: true
  },
  {
    id: 'c3',
    folio: 'SOL-DEMO-031',
    company: 'Estudio Marea CDMX',
    summary: '80 Playeras Heavyweight 280g lisas (Tramo 72+ pzas)',
    amount: '$19,325.60 MXN',
    stage: 'cotizadas'
  },
  {
    id: 'c4',
    folio: 'SOL-DEMO-012',
    company: 'Cafetería Botánica',
    summary: '24 Mandiles y Polos bordados · Pago SPEI verificado',
    amount: '$11,344.80 MXN',
    stage: 'produccion'
  }
];

export const CotizAiDemo: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DEMO_SCENARIOS[0].id);
  const [activeTab, setActiveTab] = useState<'intake' | 'pricing' | 'review' | 'crm'>('intake');

  const currentScenario =
    DEMO_SCENARIOS.find((s) => s.id === selectedScenarioId) || DEMO_SCENARIOS[0];

  // Interactive Calculator State
  const [garmentSource, setGarmentSource] = useState<'COMMERCE' | 'CUSTOMER'>(
    currentScenario.defaultCalculator.garmentSource
  );
  const [garmentModel, setGarmentModel] = useState<
    'polo_pique_320' | 'playera_280_algodon' | 'hoodie_335'
  >(currentScenario.defaultCalculator.garmentModel);
  const [quantity, setQuantity] = useState<number>(currentScenario.defaultCalculator.quantity);
  const [designsPerGarment, setDesignsPerGarment] = useState<number>(
    currentScenario.defaultCalculator.designsPerGarment
  );
  const [estimatedStitches, setEstimatedStitches] = useState<number>(
    currentScenario.defaultCalculator.estimatedStitches
  );
  const [punchingFeeMxn, setPunchingFeeMxn] = useState<number>(
    currentScenario.defaultCalculator.punchingFeeMxn
  );
  const [humanApproved, setHumanApproved] = useState<boolean>(
    !currentScenario.defaultCalculator.requiresHumanPunchingReview
  );

  // CRM Kanban State
  const [crmCards, setCrmCards] = useState<CrmLeadCard[]>(INITIAL_CRM_CARDS);
  const [onlySlaFilter, setOnlySlaFilter] = useState<boolean>(false);

  const handleSelectScenario = (scenarioId: string) => {
    const found = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!found) return;
    setSelectedScenarioId(found.id);
    setGarmentSource(found.defaultCalculator.garmentSource);
    setGarmentModel(found.defaultCalculator.garmentModel);
    setQuantity(found.defaultCalculator.quantity);
    setDesignsPerGarment(found.defaultCalculator.designsPerGarment);
    setEstimatedStitches(found.defaultCalculator.estimatedStitches);
    setPunchingFeeMxn(found.defaultCalculator.punchingFeeMxn);
    setHumanApproved(!found.defaultCalculator.requiresHumanPunchingReview);
  };

  const quoteResult = calculateCotizAiDemoQuote({
    garmentSource,
    garmentModel,
    quantity,
    designsPerGarment,
    estimatedStitches,
    punchingFeeMxn
  });

  const advanceCrmCard = (cardId: string) => {
    const order: CrmLeadCard['stage'][] = ['nuevas', 'revision', 'cotizadas', 'produccion'];
    setCrmCards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;
        const idx = order.indexOf(card.stage);
        const nextStage = order[Math.min(order.length - 1, idx + 1)];
        return { ...card, stage: nextStage, slaAlert: false };
      })
    );
  };

  const resetCrmBoard = () => {
    setCrmCards(INITIAL_CRM_CARDS);
    setOnlySlaFilter(false);
  };

  return (
    <section
      id="demo-cotiz-ai"
      className="relative scroll-mt-20 border-t border-white/[0.07] bg-[#080b13] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="scroll-reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Demostración Interactiva Aislada · Proyecto 04 (Cotiz AI)
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Explora cómo funciona Cotiz AI por dentro
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Prueba en vivo los 4 pilares de <strong>Cotiz AI Interface V2</strong> con datos 100%
              sintéticos: recepción multimodal de WhatsApp, motor financiero determinista en
              centavos, compuerta de revisión humana de ponchado y tablero operativo CRM.
            </p>
          </div>

          {/* Security & Architecture Badge */}
          <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-200 lg:max-w-sm">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <div>
              <p className="font-semibold text-white">Entorno de Demo Seguro (Sin datos reales)</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-emerald-200/80">
                El servidor productivo aplica RLS estricto por tenant y sesión SSR. Este sandbox
                ejecuta las reglas deterministas reales en tu navegador sin exponer clientes ni
                credenciales.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="scroll-reveal mt-8">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            1. Elige un caso de prueba para cargar en la consola:
          </p>
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 md:grid-cols-3">
            {DEMO_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectScenario(scenario.id)}
                  className={`interactive-card flex flex-col items-start rounded-xl border p-3.5 text-left ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-sm'
                      : 'border-white/10 bg-[#0f1420] text-slate-300 hover:border-white/20 hover:bg-[#131929]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold text-indigo-300">
                      {scenario.folio}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-300">
                      {scenario.tenantName}
                    </span>
                  </div>
                  <p className="mt-1.5 font-display text-sm font-bold text-white">
                    {scenario.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {scenario.customerName} · {scenario.customerCompany}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Console Frame */}
        <div className="scroll-reveal mt-6 overflow-hidden rounded-2xl border border-white/12 bg-[#0d1320] shadow-2xl">
          {/* Console Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#090d16] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-2 font-mono text-xs font-medium text-slate-300">
                Cotiz AI Interface V2 · Sandbox Interactivo ({currentScenario.folio})
              </span>
            </div>

            {/* Console Module Tabs */}
            <div
              role="tablist"
              aria-label="Módulos de la demostración de Cotiz AI"
              className="flex flex-wrap gap-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'intake'}
                onClick={() => setActiveTab('intake')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === 'intake'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>1. WhatsApp + Extracción IA</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'pricing'}
                onClick={() => setActiveTab('pricing')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === 'pricing'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <Calculator className="h-3.5 w-3.5" />
                <span>2. Motor Determinista</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'review'}
                onClick={() => setActiveTab('review')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === 'review'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>3. Compuerta Humana y PDF</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'crm'}
                onClick={() => setActiveTab('crm')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === 'crm'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <Kanban className="h-3.5 w-3.5" />
                <span>4. Pipeline CRM y Evidencia</span>
              </button>
            </div>
          </div>

          {/* TAB 1: WHATSAPP INTAKE & AI EXTRACTION */}
          {activeTab === 'intake' && (
            <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              {/* Left: WhatsApp Thread */}
              <div className="p-5 sm:p-6 lg:col-span-6">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400">
                      ● {currentScenario.channelLabel}
                    </span>
                    <h3 className="mt-0.5 font-display text-base font-bold text-white">
                      {currentScenario.customerName} ({currentScenario.customerPhoneMasked})
                    </h3>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300">
                    intent_isolated: true
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {currentScenario.incomingMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded-xl border border-white/[0.08] bg-[#131b2e] p-3.5"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-medium text-slate-300">
                          {msg.type === 'audio_transcript' ? (
                            <span className="inline-flex items-center gap-1 text-indigo-300">
                              <Mic className="h-3 w-3" /> Nota de voz de WhatsApp
                            </span>
                          ) : msg.type === 'image_attachment' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-300">
                              <ImageIcon className="h-3 w-3" /> Archivo multimedia recibido
                            </span>
                          ) : (
                            'Mensaje de texto entrante'
                          )}
                        </span>
                        <span className="font-mono">{msg.time}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-100 sm:text-sm">
                        {msg.text}
                      </p>
                      {msg.metaBadge && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2 py-0.5 font-mono text-[11px] text-indigo-200">
                          <Bot className="h-3 w-3 text-indigo-400" />
                          {msg.metaBadge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Structured AI Extraction */}
              <div className="p-5 sm:p-6 lg:col-span-6">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div>
                    <span className="text-xs font-semibold text-indigo-400">
                      Extracción Estructurada (JSON Schema Estricto)
                    </span>
                    <h3 className="mt-0.5 font-display text-base font-bold text-white">
                      Parámetros Detectados vs. Reglas de Gobernanza
                    </h3>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {currentScenario.extractedFields.map((field, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5"
                    >
                      <div>
                        <p className="text-[11px] text-slate-400">{field.label}</p>
                        <p className="text-xs font-semibold text-white sm:text-sm">{field.value}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] ${
                          field.status === 'confirmed'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                        }`}
                      >
                        {field.confidence}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3.5 text-xs leading-relaxed text-amber-200">
                  <p className="font-semibold text-white">
                    Guardrail Operativo (Por qué el LLM no cotiza por su cuenta):
                  </p>
                  <p className="mt-1">{currentScenario.missingOrReviewFields[0]}</p>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pricing')}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400"
                  >
                    <span>Pasar al Motor Determinista de Precios</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE DETERMINISTIC PRICING CALCULATOR */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              {/* Controls */}
              <div className="space-y-4 p-5 sm:p-6 lg:col-span-6">
                <div>
                  <span className="text-xs font-semibold text-indigo-400">
                    Simulador en Vivo · src/domain/pricing/chp-embroidery.ts
                  </span>
                  <h3 className="mt-0.5 font-display text-base font-bold text-white">
                    Configura la solicitud y comprueba el cálculo en centavos
                  </h3>
                </div>

                {/* Garment Source Toggle */}
                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    Origen de las prendas (`garmentSource`)
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGarmentSource('COMMERCE')}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        garmentSource === 'COMMERCE'
                          ? 'border-indigo-500 bg-indigo-500/20 text-white'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                      }`}
                    >
                      Catálogo del Comercio (`COMMERCE`)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGarmentSource('CUSTOMER')}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        garmentSource === 'CUSTOMER'
                          ? 'border-indigo-500 bg-indigo-500/20 text-white'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                      }`}
                    >
                      Prenda del Cliente (`CUSTOMER` → $0)
                    </button>
                  </div>
                </div>

                {/* Garment Model Select */}
                <div>
                  <label
                    htmlFor="demo-garment-model"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Modelo de prenda base
                  </label>
                  <select
                    id="demo-garment-model"
                    value={garmentModel}
                    disabled={garmentSource === 'CUSTOMER'}
                    onChange={(e) =>
                      setGarmentModel(
                        e.target.value as 'polo_pique_320' | 'playera_280_algodon' | 'hoodie_335'
                      )
                    }
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#090d16] px-3 py-2 text-xs text-white disabled:opacity-50"
                  >
                    {Object.entries(GARMENT_CATALOG_PRICES).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name} — {formatMxnFromCents(item.unitPriceCents)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sliders / Numeric Inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="demo-quantity"
                      className="flex justify-between text-xs font-medium text-slate-300"
                    >
                      <span>Cantidad de prendas</span>
                      <span className="font-mono text-indigo-300">{quantity} pzas</span>
                    </label>
                    <input
                      id="demo-quantity"
                      type="range"
                      min={1}
                      max={300}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-2 w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="demo-designs"
                      className="flex justify-between text-xs font-medium text-slate-300"
                    >
                      <span>Bordados por prenda</span>
                      <span className="font-mono text-indigo-300">{designsPerGarment} aplic.</span>
                    </label>
                    <input
                      id="demo-designs"
                      type="range"
                      min={0}
                      max={4}
                      value={designsPerGarment}
                      onChange={(e) => setDesignsPerGarment(Number(e.target.value))}
                      className="mt-2 w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="demo-stitches"
                      className="flex justify-between text-xs font-medium text-slate-300"
                    >
                      <span>Puntadas por diseño</span>
                      <span className="font-mono text-indigo-300">
                        {estimatedStitches.toLocaleString('es-MX')} pts
                      </span>
                    </label>
                    <input
                      id="demo-stitches"
                      type="range"
                      min={3000}
                      max={15000}
                      step={500}
                      disabled={designsPerGarment === 0}
                      value={estimatedStitches}
                      onChange={(e) => setEstimatedStitches(Number(e.target.value))}
                      className="mt-2 w-full accent-indigo-500 disabled:opacity-40"
                    />
                    <span className="text-[10px] text-slate-400">
                      Base incluida: 5,000 pts (+$2.00 MXN por cada 1,000 extra)
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="demo-punching"
                      className="flex justify-between text-xs font-medium text-slate-300"
                    >
                      <span>Ponchado (Asignado por humano)</span>
                      <span className="font-mono text-amber-300">${punchingFeeMxn} MXN</span>
                    </label>
                    <input
                      id="demo-punching"
                      type="range"
                      min={0}
                      max={800}
                      step={50}
                      disabled={designsPerGarment === 0}
                      value={punchingFeeMxn}
                      onChange={(e) => setPunchingFeeMxn(Number(e.target.value))}
                      className="mt-2 w-full accent-amber-500 disabled:opacity-40"
                    />
                    <span className="text-[10px] text-slate-400">
                      Nunca asumido como tarifa fija por la IA; requiere revisión
                    </span>
                  </div>
                </div>
              </div>

              {/* Output Breakdown */}
              <div className="flex flex-col justify-between bg-[#0a0f1a] p-5 sm:p-6 lg:col-span-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="font-mono text-xs text-emerald-400">
                        CÁLCULO DETERMINISTA EN CENTAVOS
                      </span>
                      <h4 className="font-display text-base font-bold text-white">
                        Desglose Auditado ({currentScenario.folio})
                      </h4>
                    </div>
                    <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 font-mono text-xs text-indigo-300">
                      {quoteResult.bandLabel}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <dt className="text-slate-300">
                        Prendas ({quoteResult.quantity} ×{' '}
                        {formatMxnFromCents(quoteResult.garmentUnitCents)})
                      </dt>
                      <dd className="font-mono font-semibold text-white">
                        {formatMxnFromCents(quoteResult.garmentSubtotalCents)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <dt className="text-slate-300">
                        Aplicaciones de bordado ({quoteResult.totalApplications} aplic. ×{' '}
                        {formatMxnFromCents(quoteResult.effectiveApplicationUnitCents)})
                        <span className="block text-[11px] text-slate-400">
                          Base banda: {formatMxnFromCents(quoteResult.baseEmbroideryUnitCents)} +
                          Excedente puntadas ({quoteResult.extraStitchBlocks} bloques):{' '}
                          {formatMxnFromCents(quoteResult.stitchSurchargeUnitCents)}
                        </span>
                      </dt>
                      <dd className="font-mono font-semibold text-white">
                        {formatMxnFromCents(quoteResult.applicationsSubtotalCents)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <dt className="text-slate-300">
                        Cargo de ponchado / preparación (Compuerta humana)
                      </dt>
                      <dd className="font-mono font-semibold text-amber-300">
                        {formatMxnFromCents(quoteResult.punchingFeeCents)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                      <dt className="text-slate-300">Subtotal antes de impuestos</dt>
                      <dd className="font-mono text-slate-200">
                        {formatMxnFromCents(quoteResult.subtotalBeforeTaxCents)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-slate-300">IVA (16% exacto en centavos)</dt>
                      <dd className="font-mono text-slate-200">
                        {formatMxnFromCents(quoteResult.ivaCents)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/15 pt-3 text-sm font-bold text-white sm:text-base">
                      <dt>Total Cotización</dt>
                      <dd className="font-mono text-lg text-emerald-400">
                        {formatMxnFromCents(quoteResult.totalCents)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="font-mono text-[11px] text-slate-400">
                    total_cents: {quoteResult.totalCents}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('review')}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400"
                  >
                    <span>Continuar a Compuerta de Revisión Humana</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HUMAN REVIEW GATE & PDF GENERATION */}
          {activeTab === 'review' && (
            <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              <div className="space-y-4 p-5 sm:p-6 lg:col-span-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-400">
                      Compuerta Obligatoria · /app/revisiones/[taskId]
                    </span>
                    <h3 className="mt-0.5 font-display text-base font-bold text-white">
                      Aprobación Humana de Ponchado y Despacho PDF
                    </h3>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      humanApproved
                        ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                        : 'border-amber-500/30 bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {humanApproved ? 'Revisión 2 · Aprobada' : 'Revisión 1 · Pendiente de Humano'}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-300">
                  En Cotiz AI, cuando un cliente envía un logotipo nuevo por WhatsApp, el sistema
                  crea una tarea en <code>embroidery_quote_review_tasks</code> y detiene el envío
                  automático hasta que el operador confirma el costo de ponchado.
                </p>

                <div className="rounded-xl border border-white/10 bg-[#12192b] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Costo de ponchado asignado:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {formatMxnFromCents(quoteResult.punchingFeeCents)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total con IVA 16% a autorizar:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatMxnFromCents(quoteResult.totalCents)}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setHumanApproved(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Aprobar Cotización y Generar PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHumanApproved(false)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 hover:text-white"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Regresar a estado Pendiente</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: PDF Preview */}
              <div className="p-5 sm:p-6 lg:col-span-6">
                <div className="rounded-xl border border-white/15 bg-[#090c14] p-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-400" />
                      <span className="font-mono text-xs font-semibold text-white">
                        Cotizacion-{currentScenario.folio}.pdf
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">
                      pdf-lib · URL firmada (5 min)
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Cliente:</span>
                      <span className="text-slate-200">{currentScenario.customerCompany}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Estado de despacho WhatsApp:</span>
                      <span className={humanApproved ? 'text-emerald-400' : 'text-amber-400'}>
                        {humanApproved
                          ? 'Despachado vía dispatchApprovedQuoteWorkflow'
                          : 'Retenido por Human Review Gate'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 font-mono font-bold text-white">
                      <span>Total Documento PDF:</span>
                      <span className="text-emerald-400">
                        {formatMxnFromCents(quoteResult.totalCents)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('crm')}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400"
                  >
                    <span>Ver Tablero CRM y Evidencia Real</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CRM PIPELINE & REAL SCREENSHOTS */}
          {activeTab === 'crm' && (
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-400">
                    Tablero Operativo CRM · /app/casos y company/demos/flujo-comercial
                  </span>
                  <h3 className="mt-0.5 font-display text-base font-bold text-white">
                    Pipeline de Expedientes Comerciales y Control de SLA
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOnlySlaFilter((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                      onlySlaFilter
                        ? 'border-amber-500/40 bg-amber-500/15 text-amber-200'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:text-white'
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>{onlySlaFilter ? 'Mostrando sólo alertas SLA' : 'Filtrar alertas SLA'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetCrmBoard}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reiniciar tablero</span>
                  </button>
                </div>
              </div>

              {/* 4-Column Kanban */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {(
                  [
                    { key: 'nuevas', label: '1. Nuevas Solicitudes' },
                    { key: 'revision', label: '2. En Revisión Humana' },
                    { key: 'cotizadas', label: '3. Cotizadas / Esperando Pago' },
                    { key: 'produccion', label: '4. Pagadas / En Producción' }
                  ] as const
                ).map((col) => {
                  const cardsInCol = crmCards.filter(
                    (c) => c.stage === col.key && (!onlySlaFilter || c.slaAlert)
                  );
                  return (
                    <div
                      key={col.key}
                      className="rounded-xl border border-white/[0.08] bg-[#090d16] p-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                        <span className="text-xs font-semibold text-slate-300">{col.label}</span>
                        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-slate-300">
                          {cardsInCol.length}
                        </span>
                      </div>

                      <div className="mt-2.5 space-y-2.5">
                        {cardsInCol.map((card) => (
                          <div
                            key={card.id}
                            className="rounded-lg border border-white/10 bg-[#121929] p-3"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-mono text-[11px] text-indigo-300">
                                {card.folio}
                              </span>
                              {card.slaAlert && (
                                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                                  SLA Atención
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs font-bold text-white">{card.company}</p>
                            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                              {card.summary}
                            </p>
                            <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2">
                              <span className="font-mono text-xs font-semibold text-emerald-400">
                                {card.amount}
                              </span>
                              {card.stage !== 'produccion' && (
                                <button
                                  type="button"
                                  onClick={() => advanceCrmCard(card.id)}
                                  className="rounded-md bg-indigo-500/20 px-2 py-1 text-[11px] font-medium text-indigo-200 hover:bg-indigo-500 hover:text-white"
                                >
                                  Avanzar etapa →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {cardsInCol.length === 0 && (
                          <p className="py-4 text-center text-[11px] text-slate-500">
                            Sin expedientes en esta columna
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Real Sanitized Screenshots Strip */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Capturas Reales del Sistema en Producción (Con datos de clientes enmascarados)
                  </h4>
                  <a
                    href="https://fpbasicospremium-cotizar.l6hmws.easypanel.host"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 hover:text-white"
                  >
                    <span>Abrir portal productivo de Cotiz AI</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080b12]">
                    <img
                      src="/screenshots/cotizaai-extraction.png"
                      alt="Captura real de extracción IA en Cotiz AI"
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <p className="p-2.5 text-[11px] text-slate-300">
                      <strong>1. Extracción IA en Bandeja:</strong> Lectura de conversación real con
                      identificadores enmascarados.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080b12]">
                    <img
                      src="/screenshots/cotizaai-human-review.png"
                      alt="Captura real de confirmación humana en Cotiz AI"
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <p className="p-2.5 text-[11px] text-slate-300">
                      <strong>2. Confirmación Humana:</strong> Validación de parámetros antes de
                      ejecutar el motor de precios.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080b12]">
                    <img
                      src="/screenshots/cotizaai-quote-draft.png"
                      alt="Captura real de borrador de cotización en Cotiz AI"
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <p className="p-2.5 text-[11px] text-slate-300">
                      <strong>3. Borrador Determinista:</strong> Cálculo exacto con IVA 16% listo
                      para envío de PDF.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
