export interface DemoScenario {
  id: string;
  title: string;
  tenantName: string;
  channelLabel: string;
  customerName: string;
  customerCompany: string;
  customerPhoneMasked: string;
  incomingMessages: {
    id: string;
    sender: 'customer' | 'system';
    time: string;
    type: 'text' | 'audio_transcript' | 'image_attachment';
    text: string;
    metaBadge?: string;
  }[];
  extractedFields: {
    label: string;
    value: string;
    confidence: string;
    status: 'confirmed' | 'requires_review';
  }[];
  missingOrReviewFields: string[];
  defaultCalculator: {
    technique: 'embroidery' | 'dtg' | 'blanks';
    garmentSource: 'COMMERCE' | 'CUSTOMER';
    garmentModel: 'polo_pique_320' | 'playera_280_algodon' | 'hoodie_335';
    quantity: number;
    designsPerGarment: number;
    estimatedStitches: number;
    punchingFeeMxn: number;
    requiresHumanPunchingReview: boolean;
  };
  folio: string;
}

export const GARMENT_CATALOG_PRICES: Record<
  'polo_pique_320' | 'playera_280_algodon' | 'hoodie_335',
  { name: string; unitPriceCents: number; spec: string }
> = {
  polo_pique_320: {
    name: 'Polo Piqué 320 GSM (Algodón Peinado)',
    unitPriceCents: 33900, // $339.00 MXN base
    spec: '320 g/m² · Cuello tejido · Corte regular'
  },
  playera_280_algodon: {
    name: 'Playera Heavyweight 280 GSM (100% Algodón)',
    unitPriceCents: 24500, // $245.00 MXN base
    spec: '280 g/m² · Algodón compacto · Oversize / Regular'
  },
  hoodie_335: {
    name: 'Hoodie Felpa 335 GSM',
    unitPriceCents: 49000, // $490.00 MXN base
    spec: '335 g/m² · Gorro doble forro · Cangurera'
  }
};

/**
 * Reproduces the real deterministic CHP Embroidery pricing table from Cotiz AI
 * (`src/domain/pricing/chp-embroidery.ts`):
 * - Volume bands based on total billable applications (quantity * designsPerGarment)
 * - Base 5,000 stitches included; +$2.00 MXN (200 centavos) per extra 1,000 stitches
 * - Customer-supplied garments (`CUSTOMER`) charge $0.00 MXN for garments
 * - 16% IVA applied deterministically in integer centavos
 */
export function getEmbroideryBandBaseCents(totalApplications: number): {
  bandLabel: string;
  baseUnitCents: number;
} {
  if (totalApplications <= 1) return { bandLabel: '1 aplicación', baseUnitCents: 8000 };
  if (totalApplications === 2) return { bandLabel: '2 aplicaciones', baseUnitCents: 7000 };
  if (totalApplications <= 11) return { bandLabel: '3–11 aplicaciones', baseUnitCents: 6000 };
  if (totalApplications <= 24) return { bandLabel: '12–24 aplicaciones', baseUnitCents: 4500 };
  if (totalApplications <= 49) return { bandLabel: '25–49 aplicaciones', baseUnitCents: 4000 };
  if (totalApplications <= 99) return { bandLabel: '50–99 aplicaciones', baseUnitCents: 3000 };
  if (totalApplications <= 199) return { bandLabel: '100–199 aplicaciones', baseUnitCents: 2500 };
  if (totalApplications <= 299) return { bandLabel: '200–299 aplicaciones', baseUnitCents: 2000 };
  if (totalApplications <= 499) return { bandLabel: '300–499 aplicaciones', baseUnitCents: 1500 };
  if (totalApplications <= 1000) return { bandLabel: '500–1000 aplicaciones', baseUnitCents: 1300 };
  return { bandLabel: '1001+ aplicaciones', baseUnitCents: 1000 };
}

export function getVolumeDiscountBps(quantity: number): number {
  if (quantity >= 72) return 1500; // 15%
  if (quantity >= 24) return 1000; // 10%
  if (quantity >= 12) return 600; // 6%
  return 0;
}

export interface DeterministicQuoteResult {
  quantity: number;
  designsPerGarment: number;
  totalApplications: number;
  bandLabel: string;
  garmentUnitCents: number;
  garmentSubtotalCents: number;
  baseEmbroideryUnitCents: number;
  extraStitchBlocks: number;
  stitchSurchargeUnitCents: number;
  effectiveApplicationUnitCents: number;
  applicationsSubtotalCents: number;
  punchingFeeCents: number;
  subtotalBeforeTaxCents: number;
  ivaCents: number;
  totalCents: number;
}

export function calculateCotizAiDemoQuote(params: {
  garmentSource: 'COMMERCE' | 'CUSTOMER';
  garmentModel: 'polo_pique_320' | 'playera_280_algodon' | 'hoodie_335';
  quantity: number;
  designsPerGarment: number;
  estimatedStitches: number;
  punchingFeeMxn: number;
}): DeterministicQuoteResult {
  const safeQty = Math.max(1, Math.min(2000, Math.round(params.quantity)));
  const safeDesigns = Math.max(0, Math.min(4, Math.round(params.designsPerGarment)));
  const totalApplications = safeQty * safeDesigns;

  // 1. Garment calculation (0 if CUSTOMER brings own garments)
  const catalogGarment = GARMENT_CATALOG_PRICES[params.garmentModel];
  const discountBps = getVolumeDiscountBps(safeQty);
  const discountedGarmentUnitCents =
    params.garmentSource === 'CUSTOMER'
      ? 0
      : Math.round((catalogGarment.unitPriceCents * (10000 - discountBps)) / 10000);
  const garmentSubtotalCents = discountedGarmentUnitCents * safeQty;

  // 2. Embroidery + stitch calculation
  const { bandLabel, baseUnitCents } =
    totalApplications > 0
      ? getEmbroideryBandBaseCents(totalApplications)
      : { bandLabel: 'Sin personalización (Blanks)', baseUnitCents: 0 };

  const extraStitches = Math.max(0, params.estimatedStitches - 5000);
  const extraStitchBlocks = totalApplications > 0 ? Math.ceil(extraStitches / 1000) : 0;
  const stitchSurchargeUnitCents = extraStitchBlocks * 200; // $2.00 MXN (200 cents) per 1,000 extra stitches
  const effectiveApplicationUnitCents =
    totalApplications > 0 ? baseUnitCents + stitchSurchargeUnitCents : 0;
  const applicationsSubtotalCents = effectiveApplicationUnitCents * totalApplications;

  // 3. Punching / preparation fee (human-reviewed)
  const punchingFeeCents =
    totalApplications > 0 ? Math.max(0, Math.round(params.punchingFeeMxn * 100)) : 0;

  // 4. Subtotal, IVA 16%, Total in integer centavos
  const subtotalBeforeTaxCents =
    garmentSubtotalCents + applicationsSubtotalCents + punchingFeeCents;
  const ivaCents = Math.round(subtotalBeforeTaxCents * 0.16);
  const totalCents = subtotalBeforeTaxCents + ivaCents;

  return {
    quantity: safeQty,
    designsPerGarment: safeDesigns,
    totalApplications,
    bandLabel,
    garmentUnitCents: discountedGarmentUnitCents,
    garmentSubtotalCents,
    baseEmbroideryUnitCents: baseUnitCents,
    extraStitchBlocks,
    stitchSurchargeUnitCents,
    effectiveApplicationUnitCents,
    applicationsSubtotalCents,
    punchingFeeCents,
    subtotalBeforeTaxCents,
    ivaCents,
    totalCents
  };
}

export function formatMxnFromCents(cents: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(cents / 100);
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'chp-polo-embroidery',
    title: 'Caso 1 · Bordado Empresarial (Prenda de Catálogo)',
    tenantName: 'CHP Personalizados (Piloto)',
    channelLabel: 'WhatsApp Cloud API · Turno agrupado (8s)',
    customerName: 'Prospecto Demo — Sofía M.',
    customerCompany: 'Grupo Logístico del Valle (Datos sintéticos)',
    customerPhoneMasked: '+52 55 •••• 4820',
    incomingMessages: [
      {
        id: 'm1',
        sender: 'customer',
        time: '11:14',
        type: 'text',
        text: 'Hola, buen día. Necesitamos cotizar 30 playeras tipo polo piqué en color azul marino para el equipo de supervisión.'
      },
      {
        id: 'm2',
        sender: 'customer',
        time: '11:14',
        type: 'image_attachment',
        text: '[Imagen adjunta: logo-corporativo-pecho.png · 95×55 mm]',
        metaBadge: 'Clasificado: design_embroidery_asset (Limpio)'
      },
      {
        id: 'm3',
        sender: 'customer',
        time: '11:15',
        type: 'audio_transcript',
        text: '“Van con nuestro logotipo bordado en pecho izquierdo de 9.5 por 5.5 cm, son diseño nuevo con ustedes. Recogemos en sucursal Algarín.”',
        metaBadge: 'Transcrito con OpenAI Whisper (0:11s)'
      }
    ],
    extractedFields: [
      { label: 'Prenda solicitada', value: 'Polo Piqué 320 GSM (Catálogo CHP)', confidence: '98%', status: 'confirmed' },
      { label: 'Origen de prenda', value: 'Provista por el comercio (COMMERCE)', confidence: '99%', status: 'confirmed' },
      { label: 'Cantidad y aplicaciones', value: '30 prendas × 1 bordado = 30 aplicaciones', confidence: '99%', status: 'confirmed' },
      { label: 'Dimensiones y puntadas est.', value: '95 × 55 mm (~7,000 puntadas est.)', confidence: '94%', status: 'confirmed' },
      { label: 'Costo de ponchado (Diseño nuevo)', value: 'Requiere asignación humana en /app/revisiones', confidence: 'Regla', status: 'requires_review' }
    ],
    missingOrReviewFields: [
      'Diseño nuevo detectado: el motor bloquea el auto-envío y crea una tarea en la Compuerta de Revisión Humana para que el operador asigne el costo de ponchado antes de emitir el PDF.'
    ],
    defaultCalculator: {
      technique: 'embroidery',
      garmentSource: 'COMMERCE',
      garmentModel: 'polo_pique_320',
      quantity: 30,
      designsPerGarment: 1,
      estimatedStitches: 7000,
      punchingFeeMxn: 300,
      requiresHumanPunchingReview: true
    },
    folio: 'CHP-COT-2026-0412'
  },
  {
    id: 'chp-customer-garment',
    title: 'Caso 2 · Maquila de Bordado (Prendas del Cliente)',
    tenantName: 'CHP Personalizados (Piloto)',
    channelLabel: 'WhatsApp Cloud API · Contexto durable',
    customerName: 'Prospecto Demo — Carlos R.',
    customerCompany: 'Productora Atlas (Datos sintéticos)',
    customerPhoneMasked: '+52 56 •••• 9104',
    incomingMessages: [
      {
        id: 'm1',
        sender: 'customer',
        time: '13:40',
        type: 'text',
        text: 'Hola, yo ya compré las chamarras y sudaderas por mi cuenta, las prendas son mías. Quiero saber cuánto me sale bordar 60 piezas.'
      },
      {
        id: 'm2',
        sender: 'customer',
        time: '13:41',
        type: 'text',
        text: 'Llevan dos bordados por prenda: frente izquierdo y manga derecha. Es un escudo sencillo de 5,000 puntadas.'
      }
    ],
    extractedFields: [
      { label: 'Origen de prenda', value: 'Prendas del cliente (CUSTOMER → $0.00 MXN en prenda)', confidence: '100%', status: 'confirmed' },
      { label: 'Volumen de aplicaciones', value: '60 prendas × 2 diseños = 120 aplicaciones facturables', confidence: '99%', status: 'confirmed' },
      { label: 'Banda de tarifa aplicable', value: 'Banda 100–199 aplicaciones ($25.00 MXN base)', confidence: '100%', status: 'confirmed' },
      { label: 'Puntadas estimadas', value: '5,000 puntadas (dentro de base incluida, +$0 extra)', confidence: '95%', status: 'confirmed' },
      { label: 'Revisión de ponchado', value: 'Pendiente de confirmar por operador humano', confidence: 'Regla', status: 'requires_review' }
    ],
    missingOrReviewFields: [
      'Regla de seguridad Fase 7.2 aplicada: el contexto explícito garmentSource = CUSTOMER prevalece y garantiza $0.00 MXN de cargo por prenda.'
    ],
    defaultCalculator: {
      technique: 'embroidery',
      garmentSource: 'CUSTOMER',
      garmentModel: 'hoodie_335',
      quantity: 60,
      designsPerGarment: 2,
      estimatedStitches: 5000,
      punchingFeeMxn: 350,
      requiresHumanPunchingReview: true
    },
    folio: 'CHP-COT-2026-0419'
  },
  {
    id: 'immanova-blanks-volume',
    title: 'Caso 3 · Lote Mayorista de Blanks (Sin Personalización)',
    tenantName: 'IMMANOVA / FP Básicos (Piloto)',
    channelLabel: 'WhatsApp + Web Core · Regla A3',
    customerName: 'Prospecto Demo — Estudio Marea',
    customerCompany: 'Marca Independiente CDMX (Datos sintéticos)',
    customerPhoneMasked: '+52 55 •••• 7731',
    incomingMessages: [
      {
        id: 'm1',
        sender: 'customer',
        time: '16:05',
        type: 'text',
        text: 'Hola! Buscamos 80 playeras lisas heavyweight de 280g en algodón para nuestra colección de otoño, sin estampado ni bordado.'
      },
      {
        id: 'm2',
        sender: 'customer',
        time: '16:06',
        type: 'text',
        text: 'Serían 40 negras y 40 hueso repartidas en M, G y XG.'
      }
    ],
    extractedFields: [
      { label: 'Producto base', value: 'Playera Heavyweight 280 GSM (100% Algodón)', confidence: '99%', status: 'confirmed' },
      { label: 'Acumulación por SKU base', value: '80 piezas totales → Descuento mayorista 72+ pzas (-15%)', confidence: '100%', status: 'confirmed' },
      { label: 'Personalización', value: '0 aplicaciones (Orden exclusiva de prendas lisas)', confidence: '100%', status: 'confirmed' },
      { label: 'Compuerta A3 (Blanks)', value: 'Apto para cotización determinista inmediata sin ponchado', confidence: '100%', status: 'confirmed' }
    ],
    missingOrReviewFields: [
      'Por tratarse de prendas lisas sin diseño nuevo, el cálculo es 100% determinista por tramo de volumen (72+ unidades).'
    ],
    defaultCalculator: {
      technique: 'blanks',
      garmentSource: 'COMMERCE',
      garmentModel: 'playera_280_algodon',
      quantity: 80,
      designsPerGarment: 0,
      estimatedStitches: 5000,
      punchingFeeMxn: 0,
      requiresHumanPunchingReview: false
    },
    folio: 'COT-2026-0425'
  }
];
