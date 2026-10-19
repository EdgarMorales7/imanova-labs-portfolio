export type ProjectStatus = 'production' | 'controlled_pilot' | 'deployed_safe_mode';
export type AccessType = 'public_web' | 'whatsapp_channel' | 'interactive_demo';

export interface ScreenshotItem {
  src: string;
  alt: string;
  caption: string;
  sourceLabel: string;
}

export interface PortfolioProject {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  detailedObjective: string;
  screenshot: string;
  screenshotAlt: string;
  screenshotCaption: string;
  gallery: ScreenshotItem[];
  primaryUrl: string;
  secondaryUrl?: string;
  secondaryActionLabel?: string;
  demoUrl?: string;
  actionLabel: string;
  accessType: AccessType;
  accessNotice?: string;
  status: ProjectStatus;
  statusLabel: string;
  verifiedTechnologies: string[];
  integrations: string[];
  verifiedFeatures: string[];
  inDevelopmentFeatures: string[];
  architectureSummary: string;
  localPath: string;
  repositoryUrl: string;
  detectedIssuesAndNotes: string[];
  pendingConfirmation: string[];
}

export interface VerifiedTechCategory {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    role: string;
    usedIn: string[];
  }[];
}

export const PORTFOLIO_METADATA = {
  brandHeader: 'IMANOVA LABS',
  projectTagline: 'AI PROJECTS · XOLVIRI LABS',
  heroTitle: 'Proyectos que conectan inteligencia artificial y soluciones reales.',
  heroDescription:
    'Una selección de proyectos desarrollados con asistencia de IA, aplicaciones web, automatización e integración de sistemas.',
  totalProjects: 6,
  sinceDate: 'Febrero 2026',
  footerText: 'Portafolio de proyectos desarrollados con asistencia de IA.',
  immanovaUrl: 'https://immanova.com'
};

export const PROJECTS: PortfolioProject[] = [
  {
    id: 'fp-basicos-premium-web',
    number: '01',
    name: 'FP Básicos Premium — Sitio web',
    category: 'Sitio web comercial y Cotizador DTG con IA',
    description:
      'Plataforma web de marca, catálogo e-commerce de prendas lisas de alto gramaje y wizard interactivo de 9 pasos para cotizar impresión DTG con análisis de imagen por IA.',
    detailedObjective:
      'Posicionar a FP Básicos Premium como fabricante de blanks premium (240g a 420g) y centro de personalización textil en CDMX, permitiendo comprar prendas lisas en línea o cotizar impresión DTG paso a paso con visión artificial, cálculo determinista de precios, generación de PDF y pago integrado.',
    screenshot: '/screenshots/fp-live-home.png',
    screenshotAlt: 'Captura real del sitio web en producción de FP Básicos Premium',
    screenshotCaption: 'Vista real en producción (fpbasicospremium.cloud) y Wizard del Cotizador DTG.',
    gallery: [
      {
        src: '/screenshots/fp-live-home.png',
        alt: 'Portada en vivo de FP Básicos Premium',
        caption: 'Home de marca desplegada en fpbasicospremium.cloud con selector de tema claro/oscuro.',
        sourceLabel: 'Producción en vivo (HTTP 200)'
      },
      {
        src: '/screenshots/fp-live-cotizador.png',
        alt: 'Landing del Cotizador DTG en vivo',
        caption: 'Selector de los 3 modos del Cotizador DTG (/cotizador-dtg): diseño listo, foto de prenda o catálogo.',
        sourceLabel: 'Producción en vivo (/cotizador-dtg)'
      },
      {
        src: '/screenshots/fp-dtg-wizard-1.webp',
        alt: 'Paso de análisis IA y configuración DTG',
        caption: 'Interfaz del wizard DTG con selección de medidas, zonas de impresión y análisis por visión artificial.',
        sourceLabel: 'Repositorio dtg-cotizador'
      },
      {
        src: '/screenshots/fp-dtg-wizard-2.webp',
        alt: 'Desglose de cotización y mockup DTG',
        caption: 'Resumen de cotización con vista previa de mockup, desglose por prenda/impresión y opciones de pago.',
        sourceLabel: 'Repositorio dtg-cotizador'
      }
    ],
    primaryUrl: 'https://fpbasicospremium.cloud',
    secondaryUrl: 'https://fpbasicospremium.cloud/cotizador-dtg',
    secondaryActionLabel: 'Abrir Cotizador DTG',
    actionLabel: 'Ver sitio web',
    accessType: 'public_web',
    status: 'production',
    statusLabel: 'En producción · Operativo',
    verifiedTechnologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS 4',
      'Zustand',
      'Supabase (PostgreSQL, Auth, Storage)',
      'n8n Workflows',
      'OpenAI Vision API',
      'Docker + Nginx (EasyPanel)'
    ],
    integrations: [
      'OpenAI Vision (clasificación de imagen, detección de plasta y lectura de bocetos)',
      'n8n (workflows DTG Cotizador API de 59 nodos y FP Commerce API de 41 nodos)',
      'MercadoPago & Stripe Checkout',
      'PDF.co (generación automática de cotizaciones en PDF)',
      'Skydropx PRO API (cotización de tarifas de envío por CP)'
    ],
    verifiedFeatures: [
      'Cotizador DTG de 9 pasos en 3 modos: archivo de diseño listo, foto de prenda de referencia o diseño de catálogo.',
      'Análisis con IA (OpenAI Vision vía n8n) que detecta plasta de color, clasifica el arte e identifica bocetos con medidas anotadas antes de cotizar.',
      'Motor determinista de precios DTG con tablas oficiales para prenda clara/oscura, recargo de plasta (1.40x) y soporte multi-zona en paralelo.',
      'Catálogo comercial comprable (/catalogo) con 10 prendas activas (playeras 240g/280g, mineral wash, hoodies 330g/420g, crewneck y chaleco).',
      'Carrito persistente en Supabase, sistema de diseños favoritos y tema global Claro/Oscuro sincronizado.',
      'Generación de PDF en Supabase Storage y cobro en línea con MercadoPago, Stripe o transferencia (revisión obligatoria HTTP 422 para DTF/Bordado).'
    ],
    inDevelopmentFeatures: [
      'Módulo de facturación automática CFDI 4.0 (/facturar con Facturama API): codificado en frontend y n8n, en pausa previa a producción para validación contable y carga de sellos CSD.',
      'Emisión automática post-pago de etiquetas Skydropx: workflow probado en sandbox, pendiente de recarga de saldo operativo en Skydropx para emisión automática en vivo.'
    ],
    architectureSummary:
      'SPA en React 19 + TypeScript servida por Nginx en contenedor Docker sobre EasyPanel, con inyección de variables en runtime. La lógica transaccional se apoya en Supabase (RLS + Auth JWT + tablas fp_orders, cart_items, dtg_quotes) y webhooks en n8n.',
    localPath: '/Users/edgar_sarmiento/Documents/Claude Code/dtg-cotizador',
    repositoryUrl: 'https://github.com/fpbasicospremium/dtg-cotizador',
    detectedIssuesAndNotes: [
      'Las órdenes con servicios DTF o Bordado se marcan deliberadamente como review_required (HTTP 422) para impedir cobros automáticos sin validación técnica.'
    ],
    pendingConfirmation: [
      'Precios definitivos para incorporar shorts al catálogo comercial.',
      'Recarga de saldo en Skydropx para habilitar generación automática de guías post-pago.'
    ]
  },
  {
    id: 'chp-personalizados-whatsapp',
    number: '02',
    name: 'CHP Personalizados — Chatbot de WhatsApp',
    category: 'Chatbot conversacional de ventas con IA',
    description:
      'Agente comercial en WhatsApp conectado a Cotiz AI y n8n que recibe texto, audio e imágenes de logotipos, calcula bordados por puntadas sin alucinar precios y enruta diseños nuevos a revisión humana.',
    detailedObjective:
      'Atender solicitudes de cotización de prendas y bordado personalizado en WhatsApp mediante recepción multimodal (texto, notas de voz con Whisper e imágenes), agrupando ráfagas de mensajes en turnos durables y calculando precios con aritmética determinista en centavos bajo supervisión humana.',
    screenshot: '/screenshots/cotizaai-extraction.png',
    screenshotAlt: 'Captura real del panel de extracción IA y conversación de WhatsApp en Cotiz AI',
    screenshotCaption: 'Bandeja conversacional de WhatsApp y extracción estructurada con gobernanza humana.',
    gallery: [
      {
        src: '/screenshots/cotizaai-extraction.png',
        alt: 'Extracción estructurada de WhatsApp con IA',
        caption: 'Captura real (con datos personales enmascarados) de la bandeja de WhatsApp y extracción IA.',
        sourceLabel: 'Evidencia real de piloto (presentaciones/cotizaai-agencia-ia)'
      },
      {
        src: '/screenshots/cotizaai-human-review.png',
        alt: 'Confirmación humana antes de generar cotización',
        caption: 'Compuerta de revisión humana donde el operador valida los parámetros antes de emitir el precio final.',
        sourceLabel: 'Evidencia real de piloto'
      },
      {
        src: '/screenshots/cotizaai-quote-draft.png',
        alt: 'Borrador determinista de cotización generado',
        caption: 'Borrador de cotización calculado en centavos con IVA 16% listo para despacho en PDF por WhatsApp.',
        sourceLabel: 'Evidencia real de piloto'
      }
    ],
    primaryUrl: 'https://wa.me/525653393749?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20prendas%20personalizadas%20con%20bordado',
    secondaryUrl: '#demo-cotiz-ai',
    secondaryActionLabel: 'Simular flujo en Demo',
    demoUrl: '#demo-cotiz-ai',
    actionLabel: 'Probar chatbot',
    accessType: 'whatsapp_channel',
    accessNotice:
      'El botón abre el canal oficial de WhatsApp de CHP Personalizados (+52 56 5339 3749). Nota técnica: en el servidor de piloto de Cotiz AI, el webhook automático tiene activa una allowlist telefónica de seguridad (pilotPhoneEnforcement=true) para evitar cargos y envíos no autorizados fuera de los números de prueba; puedes probar el flujo exacto de extracción y cálculo en el simulador interactivo de esta página.',
    status: 'controlled_pilot',
    statusLabel: 'Piloto controlado · Certificado E2E',
    verifiedTechnologies: [
      'Meta WhatsApp Cloud API',
      'n8n (AI Sales Agent Workflow)',
      'Cotiz AI Core (Next.js 16 + TypeScript)',
      'OpenAI Responses API',
      'OpenAI Whisper (Audio a Texto)',
      'Supabase PostgreSQL + RLS',
      'pdf-lib'
    ],
    integrations: [
      'Meta WhatsApp Cloud API (webhooks firmados HMAC-SHA256 y descarga privada de media)',
      'OpenAI Whisper (transcripción automática de notas de voz M4A/OGG)',
      'n8n (workflows Chatbot WhatsApp y CHP — AI Sales Agent con tools HTTP)',
      'Supabase Storage (buckets privados whatsapp-media y quote-pdfs)'
    ],
    verifiedFeatures: [
      'Durable Turn Builder: agrupa ráfagas de mensajes de WhatsApp del cliente (ventana de 8s a 30s) en un único turno coherente antes de invocar al agente.',
      'Aislamiento por intención comercial (commercial_intents) y clasificador de adjuntos que separa logotipos reales de bordado de fotos de referencia o comprobantes.',
      'Motor determinista de bordado CHP por bandas de volumen (1 a 1001+ aplicaciones) y cálculo de puntadas (5,000 puntadas base + $2.00 MXN por cada 1,000 adicionales).',
      'Soporte para prendas aportadas por el cliente (garmentSource = CUSTOMER cobrando $0 MXN en prenda) o prendas del catálogo CHP.',
      'Compuerta obligatoria de Revisión Humana (Human Review Gate): nunca inventa tarifas de ponchado en diseños nuevos; crea tarea de revisión y al aprobarse envía el PDF foliado por WhatsApp.'
    ],
    inDevelopmentFeatures: [
      'Apertura del webhook del agente IA a tráfico público general sin allowlist telefónica (actualmente restringido por COTIZAAI_PILOT_WHATSAPP_PHONE_ALLOWLIST en modo piloto controlado).',
      'Cotización automática de paquetería en conversación una vez que se carguen las dimensiones definitivas de cajas textiles.'
    ],
    architectureSummary:
      'Arquitectura híbrida donde Cotiz AI recibe y valida el webhook de Meta, construye el turno conversacional en PostgreSQL y encola la ejecución hacia n8n. El agente en n8n sólo puede invocar herramientas deterministas del backend (Catalog, Quote, Documents y Sales Tool).',
    localPath: '/Users/edgar_sarmiento/Documents/Agencia de IA/products/cotizaai',
    repositoryUrl: 'https://github.com/EdgarMorales7/cotizaai',
    detectedIssuesAndNotes: [
      'Se corrigió en Fase 7.2 la precedencia de garmentSource para que una prenda declarada como propia del cliente no sea sobreescrita por prendas de catálogo en turnos posteriores.',
      'Se corrigió en Fase 7.6 el aislamiento de tareas de revisión por commercial_intent_id para no bloquear nuevas cotizaciones en una misma conversación.'
    ],
    pendingConfirmation: [
      'Autorización del propietario de CHP para retirar la allowlist telefónica del piloto y abrir el agente autónomo a todos los números entrantes.'
    ]
  },
  {
    id: 'chp-personalizados-web',
    number: '03',
    name: 'CHP Personalizados — Sitio web',
    category: 'Sitio web comercial (Storefront BFF)',
    description:
      'Tienda web en Next.js con arquitectura Backend-For-Frontend conectada al núcleo de Cotiz AI para explorar catálogo de 9 prendas (306 combinaciones), subir diseños y cotizar bordados.',
    detailedObjective:
      'Brindar a CHP Personalizados un canal web propio donde el navegador nunca calcula precios por su cuenta: toda consulta de catálogo, sesión por correo OTP, escaneo antivirus de archivos y cálculo de bordado se delega de forma segura al servicio dedicado de Cotiz AI.',
    screenshot: '/screenshots/chp-live-home.png',
    screenshotAlt: 'Captura real del sitio web de CHP Personalizados desplegado en EasyPanel',
    screenshotCaption: 'Storefront de CHP Personalizados en producción conectado al canal web de Cotiz AI.',
    gallery: [
      {
        src: '/screenshots/chp-live-home.png',
        alt: 'Portada en vivo de CHP Personalizados Storefront',
        caption: 'Home pública de CHP Personalizados desplegada en EasyPanel (HTTP 200).',
        sourceLabel: 'Producción en vivo (chp-store-web)'
      },
      {
        src: '/screenshots/chp-live-catalog.png',
        alt: 'Catálogo web de CHP Personalizados',
        caption: 'Catálogo publicado desde Cotiz AI con 9 prendas y 306 combinaciones de color, corte y talla.',
        sourceLabel: 'Producción en vivo (/catalogo)'
      },
      {
        src: '/screenshots/chp-bordado.webp',
        alt: 'Detalle de bordado personalizado CHP',
        caption: 'Activo editorial de bordado industrial y personalización textil de CHP.',
        sourceLabel: 'Repositorio CHP Personalizados'
      }
    ],
    primaryUrl: 'https://fpbasicospremium-chp-store-web.l6hmws.easypanel.host',
    secondaryUrl: 'https://fpbasicospremium-chp-store-web.l6hmws.easypanel.host/catalogo',
    secondaryActionLabel: 'Ver catálogo',
    actionLabel: 'Ver sitio web',
    accessType: 'public_web',
    status: 'production',
    statusLabel: 'Desplegado · Catálogo y BFF activos',
    verifiedTechnologies: [
      'Next.js 16 (App Router + BFF)',
      'React 19',
      'TypeScript 5.9',
      'Tailwind CSS 4',
      'Zod',
      'Cotiz AI Web Channel API',
      'ClamAV Antivirus',
      'Playwright + axe-core',
      'GitHub Container Registry (GHCR)'
    ],
    integrations: [
      'Cotiz AI Web Channel API (servicio dedicado chp-commerce-api por canal firmado)',
      'Supabase Auth (acceso sin contraseña mediante código OTP por correo)',
      'ClamAV (contenedor privado chp-web-clamav para escaneo antivirus de diseños subidos)',
      'Catálogo postal SEPOMEX (158,175 asentamientos en base de datos para validación de direcciones)'
    ],
    verifiedFeatures: [
      'Catálogo conectado al core de Cotiz AI con 9 productos y 306 variantes (Playeras 240g/280g/300g, Acid Wash, 50/50, Polo Piqué 320g y Hoodies 335g/420g).',
      '3 productos habilitados con motor activo de cotización de bordado en línea: Playera 280g, Polo Piqué 320g y Hoodie 335g.',
      'Autenticación de compradores por correo electrónico con código OTP de 6–8 dígitos y cookies HttpOnly.',
      'Subida de archivos de diseño (PNG, JPEG, WebP, PDF hasta 10 MB) con inspección dimensional y escaneo antivirus ClamAV.',
      'Cotizador web de bordado con vigencia de 24 horas, carrito editable con recotización optimista y cancelación auto-servicio de pedidos en ventana de 15 minutos.',
      'Cero violaciones de accesibilidad WCAG 2.1 AA verificadas con Playwright + axe-core y diseño móvil comprobado a 360px.'
    ],
    inDevelopmentFeatures: [
      'Envío a domicilio con Skydropx en web: adaptador e importación SEPOMEX listos, bloqueado preventivamente hasta registrar las medidas y pesos reales de las cajas textiles.',
      'Apertura pública de pagos por transferencia en la tienda web general (sujeta a la activación comercial final por el titular).'
    ],
    architectureSummary:
      'Aplicación Next.js 16 Standalone compilada en GitHub Actions y desplegada en EasyPanel desde GHCR. Utiliza rutas BFF (/api/storefront/*) para comunicarse en servidor con chp-commerce-api sin exponer secretos ni reglas de precios en el cliente.',
    localPath: '/Users/edgar_sarmiento/Documents/CHP Personalizados',
    repositoryUrl: 'https://github.com/EdgarMorales7/chp-personalizados-storefront',
    detectedIssuesAndNotes: [
      'El build de Docker se migró a GitHub Actions (GHCR) para evitar saturar la memoria RAM del VPS en EasyPanel junto al contenedor de ClamAV.',
      'Se reparó el hash canónico de publicación del catálogo el 7 de octubre de 2026 para asegurar respuesta HTTP 200 continua.'
    ],
    pendingConfirmation: [
      'Dimensiones y peso real de las cajas de empaque textil para activar tarifas de envío a domicilio.',
      'Reglas económicas de bordado para los 6 productos restantes del catálogo que hoy se muestran en modo descriptivo.'
    ]
  },
  {
    id: 'cotiz-ai-saas-crm',
    number: '04',
    name: 'Cotiz AI',
    category: 'Aplicación SaaS / CRM y Motor Comercial',
    description:
      'Sistema operativo comercial multi-tenant que transforma conversaciones de WhatsApp y solicitudes web en cotizaciones deterministas, revisiones humanas, PDFs y expedientes CRM.',
    detailedObjective:
      'Resolver el caos de vender productos personalizados por cotización: combina extracción asistida por IA en WhatsApp con un motor financiero 100% determinista en centavos, compuertas obligatorias de aprobación humana, generación de PDFs y trazabilidad completa en un CRM con seguridad Row-Level Security (RLS).',
    screenshot: '/screenshots/cotizaai-live-landing.png',
    screenshotAlt: 'Captura real de la plataforma Cotiz AI y su escena operativa',
    screenshotCaption: 'Landing ejecutiva de Cotiz AI en producción y capturas reales de su consola operativa V2.',
    gallery: [
      {
        src: '/screenshots/cotizaai-live-landing.png',
        alt: 'Landing ejecutiva de Cotiz AI en producción',
        caption: 'Vista pública desplegada en fpbasicospremium-cotizar.l6hmws.easypanel.host con maqueta de operación.',
        sourceLabel: 'Producción en vivo (HTTP 200)'
      },
      {
        src: '/screenshots/cotizaai-cover.png',
        alt: 'Arquitectura operativa de Cotiz AI',
        caption: 'Flujo operativo de Cotiz AI: recepción en WhatsApp, extracción IA, cálculo determinista y aprobación humana.',
        sourceLabel: 'Presentación Ejecutiva Cotiz AI'
      },
      {
        src: '/screenshots/cotizaai-extraction.png',
        alt: 'Consola de conversaciones y extracción IA',
        caption: 'Bandeja viva de WhatsApp (/app/conversaciones) con extracción estructurada y Copiloto IA.',
        sourceLabel: 'Captura real del sistema (PII enmascarado)'
      },
      {
        src: '/screenshots/cotizaai-human-review.png',
        alt: 'Pantalla de confirmación y revisión humana',
        caption: 'Validación humana de parámetros técnicos antes de autorizar el cálculo y documento PDF.',
        sourceLabel: 'Captura real del sistema (PII enmascarado)'
      },
      {
        src: '/screenshots/cotizaai-quote-draft.png',
        alt: 'Borrador determinista de cotización en Cotiz AI',
        caption: 'Desglose línea por línea calculado en centavos enteros con IVA 16% y reglas auditables.',
        sourceLabel: 'Captura real del sistema (PII enmascarado)'
      }
    ],
    primaryUrl: '#demo-cotiz-ai',
    secondaryUrl: 'https://fpbasicospremium-cotizar.l6hmws.easypanel.host',
    secondaryActionLabel: 'Ver portal productivo',
    demoUrl: '#demo-cotiz-ai',
    actionLabel: 'Explorar demo',
    accessType: 'interactive_demo',
    accessNotice:
      'Demo interactiva aislada en el navegador: prueba la extracción de WhatsApp, el motor real de precios en centavos, la compuerta de revisión humana de ponchado y el tablero CRM sin exponer datos reales de clientes ni requerir credenciales de producción.',
    status: 'production',
    statusLabel: 'Núcleo certificado · 2 Pilotos reales + Core IMMANOVA',
    verifiedTechnologies: [
      'Next.js 16 (App Router, SSR)',
      'React 19',
      'TypeScript 5.9',
      'Supabase (PostgreSQL, Auth SSR, Storage, 157 migraciones SQL con RLS)',
      'Tailwind CSS 4 (CotizaAI Interface V2)',
      'pdf-lib',
      'OpenAI API + n8n',
      'Vitest + PGlite (1,544 tests)',
      'Stripe & MercadoPago SDK'
    ],
    integrations: [
      'Meta WhatsApp Cloud API (webhooks HMAC, plantillas HSM, ventana 24h y proxy de media)',
      'Supabase PostgreSQL con RLS por tenant_id y funciones transaccionales SECURITY DEFINER',
      'n8n (workers de orquestación conversacional y herramientas HTTP firmadas)',
      'OpenAI (extracción estructurada con JSON Schema estricto, Copiloto con base de conocimiento y Whisper)',
      'SEPOMEX + Skydropx Sandbox + Stripe + MercadoPago + Transferencia SPEI'
    ],
    verifiedFeatures: [
      '18 módulos operativos bajo /app/*: Resumen, Conversaciones WhatsApp, Cotizaciones, Revisiones de Bordado, Casos CRM, Pedidos, Pagos, Clientes, Productos, Conocimiento, Automatizaciones, Supervisión IA, Documentos PDF, Reportes, Canal WhatsApp, Estado Sentinel, Configuración y Onboarding.',
      'Motor determinista en centavos (jamás permite que el LLM invente precios): calcula escalones de volumen, serigrafía/DTG/DTF, bordado por puntadas, tallas extra e IVA 16%.',
      'Compuerta de Revisión Humana (/app/revisiones/[taskId]) para asignar costo de ponchado en diseños nuevos y despachar automáticamente el PDF aprobado.',
      'API multicanal (/api/channels/web/v1/*) que alimenta como backend único a las tiendas web de CHP Personalizados e IMMANOVA.',
      'Calidad verificada con 1,544 pruebas automatizadas (Vitest + PGlite) y 50/50 escenarios E2E de certificación en vivo aprobados.'
    ],
    inDevelopmentFeatures: [
      'Autoservicio público abierto para alta libre de nuevos comercios sin acompañamiento (actualmente el onboarding de 5 pasos requiere certificación sintética y activación controlada por tenant).',
      'Auto-envío sin intervención humana en cotizaciones complejas de personalización (restringido deliberadamente por gobernanza ADR-0002 / ADR-0009).'
    ],
    architectureSummary:
      'Monolito modular en Next.js 16 con separación estricta entre dominio determinista (src/domain/*), repositorios Supabase con RLS por tenant y adaptadores externos. Todas las rutas /app/* exigen sesión SSR verificada y membresía activa.',
    localPath: '/Users/edgar_sarmiento/Documents/Agencia de IA/products/cotizaai',
    repositoryUrl: 'https://github.com/EdgarMorales7/cotizaai',
    detectedIssuesAndNotes: [
      'Por decisión arquitectónica (ADR-0016), se eliminaron los datos mock dentro de /app/* en producción para garantizar verdad operativa absoluta; por ello la demo pública para visitantes se ofrece en un sandbox aislado en el portafolio.'
    ],
    pendingConfirmation: [
      'Apertura comercial a nuevos tenants externos tras el cierre de los pilotos de FP Básicos Premium, CHP Personalizados e IMMANOVA.'
    ]
  },
  {
    id: 'imanova-whatsapp-chatbot',
    number: '05',
    name: 'Imanova — Chatbot de WhatsApp',
    category: 'Chatbot conversacional con IA',
    description:
      'Agente conversacional en WhatsApp especializado en venta por volumen de prendas lisas (blanks), con cálculo de tramos acumulables, transcripción de voz y cotización de envío manual.',
    detailedObjective:
      'Automatizar la atención y cotización por volumen de las 17 prendas lisas de IMMANOVA en WhatsApp usando el núcleo de Cotiz AI y 7 workflows dedicados en n8n, garantizando paridad exacta de precios con la tienda web y bloqueando cualquier solicitud de estampado o bordado.',
    screenshot: '/screenshots/immanova-wa-agent.png',
    screenshotAlt: 'Captura real del panel del Agente IA de WhatsApp de IMMANOVA',
    screenshotCaption: 'Consola de supervisión y configuración del agente WhatsApp de IMMANOVA y generación de PDF.',
    gallery: [
      {
        src: '/screenshots/immanova-wa-agent.png',
        alt: 'Vista general del Agente IA de IMMANOVA',
        caption: 'Panel administrativo del agente conversacional de IMMANOVA (/app/ia).',
        sourceLabel: 'Evidencia verificada (docs/evidencia-whatsapp)'
      },
      {
        src: '/screenshots/immanova-wa-pdf.png',
        alt: 'Secuencia de cotización y PDF en conversación de IMMANOVA',
        caption: 'Historial conversacional con generación de PDF de cotización de prendas lisas y revisión de envío manual.',
        sourceLabel: 'Evidencia verificada (docs/evidencia-whatsapp)'
      },
      {
        src: '/screenshots/immanova-wa-delivery.png',
        alt: 'Detalle de entrega y estado de conversación en IMMANOVA',
        caption: 'Trazabilidad de mensajes, estado de entrega y control de operador humano.',
        sourceLabel: 'Evidencia verificada (docs/evidencia-whatsapp)'
      },
      {
        src: '/screenshots/immanova-wa-catalog.png',
        alt: 'Catálogo comercial de 17 prendas en el panel de IMMANOVA',
        caption: 'Editor y vista del catálogo compartido de 17 prendas, 544 variantes y 85 tramos de precios.',
        sourceLabel: 'Evidencia verificada (docs/evidencia-whatsapp)'
      }
    ],
    primaryUrl: 'https://wa.me/525661928910?text=Hola%2C%20me%20interesa%20cotizar%20prendas%20lisas%20IMMANOVA',
    secondaryUrl: 'https://immanova-immanova-core.l6hmws.easypanel.host/login',
    secondaryActionLabel: 'Panel Core (Login)',
    actionLabel: 'Probar chatbot',
    accessType: 'whatsapp_channel',
    accessNotice:
      'El enlace abre el contacto de WhatsApp oficial del chatbot de IMMANOVA (+52 56 6192 8910). Nota de estado real: los contenedores immanova-core e immanova-n8n están desplegados en EasyPanel y los 7 workflows fueron validados E2E con OpenAI en entorno local, pero en producción se mantienen en modo seguro (SAFE-OFF / inactivos) hasta finalizar el alta comercial en Meta.',
    status: 'deployed_safe_mode',
    statusLabel: 'Desplegado en modo seguro · Validado E2E en local',
    verifiedTechnologies: [
      'n8n 2.42 (7 Workflows de WhatsApp)',
      'IMMANOVA Core (Cotiz AI adaptado en Next.js 16)',
      'OpenAI gpt-5-mini (Responses API)',
      'OpenAI Whisper (Notas de voz)',
      'Supabase PostgreSQL + Auth',
      'pdf-lib',
      'Docker + GHCR (EasyPanel)'
    ],
    integrations: [
      'n8n (workflows IMMANOVAWASCHED01, IMMANOVAWAAGENT01 y 5 tools: Catalog, Quote, Documents, Sales, Payments)',
      'OpenAI API (agente conversacional para blanks y transcripción de audio M4A con Whisper)',
      'IMMANOVA Core API (catálogo canónico compartido, cálculo por volumen y PDFs)',
      'Meta WhatsApp Cloud API (configuración técnica lista en immanova-core)'
    ],
    verifiedFeatures: [
      '7 workflows de n8n sanitizados y probados para consulta de catálogo, cotización de blanks (create_blank_quote), generación de PDF, creación de pedido con envío manual y recepción de comprobantes.',
      'Paridad matemática total con la web: 17 productos, 544 variantes y 85 tramos de volumen (1, 6, 12, 24 y 72+ piezas acumulables entre tallas/colores del mismo modelo, con IVA 16% incluido).',
      'Exclusión multicapa de personalización: prompts, definiciones de tools y backend rechazan explícitamente bordado, DTG o serigrafía por tratarse de una marca exclusiva de blanks.',
      'Flujo canónico de envío manual antes del pago: el operador cotiza el envío desde el panel y el comprador debe aceptar el total actualizado antes de pagar.',
      'Transcripción probada de notas de voz con OpenAI Whisper y panel de supervisión con takeover humano.'
    ],
    inDevelopmentFeatures: [
      'Activación de los 7 workflows comerciales en el contenedor productivo de n8n (actualmente en estado SAFE-OFF inactivo por seguridad pre-lanzamiento).',
      'Sincronización final de los deltas SQL locales (348 a 378) y publicación comercial definitiva en el proyecto Supabase productivo.'
    ],
    architectureSummary:
      'Núcleo dedicado (immanova-core) e instancia propia de n8n (immanova-n8n) desplegados en el proyecto immanova de EasyPanel mediante imágenes privadas en GHCR verificadas por digest SHA-256.',
    localPath: '/Users/edgar_sarmiento/Documents/IMMANOVA',
    repositoryUrl: 'https://github.com/EdgarMorales7/immanova',
    detectedIssuesAndNotes: [
      'La imagen productiva actual (603184d) mantiene las capacidades comerciales apagadas deliberadamente mientras se concluye la verificación operativa final; los deltas más recientes ya están probados en la plataforma local.'
    ],
    pendingConfirmation: [
      'Verificación final del canal comercial en Meta Business y activación de flags productivos.'
    ]
  },
  {
    id: 'imanova-sitio-web',
    number: '06',
    name: 'Imanova — Sitio web',
    category: 'Sitio web de marca y e-commerce de blanks',
    description:
      'Tienda web editorial para la marca IMMANOVA con catálogo de 17 prendas lisas y 544 variantes, comparador interactivo de telas y flujo de compra por volumen.',
    detailedObjective:
      'Presentar la marca IMMANOVA ("Para tu marca y para vestir") con una experiencia web rápida, minimalista y optimizada en móvil que permite comparar gramajes y composiciones, filtrar 544 variantes por 12 criterios y armar lotes con precios escalonados por volumen.',
    screenshot: '/screenshots/immanova-live-home.png',
    screenshotAlt: 'Captura real del sitio web de IMMANOVA desplegado en immanova.com',
    screenshotCaption: 'Sitio web oficial de IMMANOVA en producción (immanova.com) y vista del catálogo de 17 prendas.',
    gallery: [
      {
        src: '/screenshots/immanova-live-home.png',
        alt: 'Portada en vivo de immanova.com',
        caption: 'Home editorial desplegada en https://immanova.com (HTTP 200) con hero cinemático y comparador de telas.',
        sourceLabel: 'Producción en vivo (immanova.com)'
      },
      {
        src: '/screenshots/immanova-web-catalog.png',
        alt: 'Catálogo de 17 prendas y 544 variantes de IMMANOVA',
        caption: 'Catálogo con 12 filtros combinables, swatches de color HEX y tramos de precio por volumen (1, 6, 12, 24 y 72+ piezas).',
        sourceLabel: 'Evidencia verificada (docs/evidencia-catalogo-publicado-local)'
      },
      {
        src: '/screenshots/immanova-web-home.png',
        alt: 'Vista editorial completa del storefront de IMMANOVA',
        caption: 'Secciones editoriales de Blanks, Jerseys en preparación y comparador interactivo de gramajes.',
        sourceLabel: 'Evidencia verificada (storefront-desktop)'
      },
      {
        src: '/screenshots/immanova-web-brand.png',
        alt: 'Página Sobre IMMANOVA y propuesta de marca',
        caption: 'Página /sobre-immanova explicando el enfoque en prendas lisas consistentes y el proceso de compra en 4 pasos.',
        sourceLabel: 'Evidencia verificada (sobre-immanova-1440)'
      }
    ],
    primaryUrl: 'https://immanova.com',
    secondaryUrl: 'https://immanova.com/catalogo',
    secondaryActionLabel: 'Explorar catálogo',
    actionLabel: 'Ver sitio web',
    accessType: 'public_web',
    status: 'production',
    statusLabel: 'En producción (immanova.com) · Modo catálogo/demo',
    verifiedTechnologies: [
      'Next.js 16 (App Router, RSC)',
      'React 19',
      'TypeScript 5.9',
      'Tailwind CSS 4',
      'Radix UI Dialog',
      'Zod',
      'PostgreSQL / PGlite / Supabase',
      'Playwright + Vitest',
      'EasyPanel (GHCR)'
    ],
    integrations: [
      'IMMANOVA Core (valoración de tramos por volumen, sesiones de comprador y pedidos canónicos)',
      'Supabase PostgreSQL (esquema de catálogo publicado, carritos y órdenes con envío manual)',
      'n8n (notificaciones de cotización de envío manual y seguimiento de pedido)'
    ],
    verifiedFeatures: [
      'Desplegado públicamente en https://immanova.com con certificado HTTPS activo y carga inicial optimizada (reducción de HTML inicial de ~429 KB a ~52 KB).',
      'Comparador interactivo de telas y gramajes (FabricComparator), guía visual de tallas/cortes (/guia-tallas) y páginas de marca (/sobre-immanova, /como-comprar, /informacion, /ayuda, /contacto).',
      'Catálogo estructurado de 17 prendas oficiales (Playeras Regular 150g–200g, Performance, Blend, Manga Larga, Cuello V y Polos Piqué 210g/230g para hombre y mujer) con 544 variantes y 85 tramos de volumen.',
      'Búsqueda y 12 filtros combinables sincronizados con la URL (categoría, género, corte, manga, cuello, composición, gramaje, color y talla).',
      'Carrito resiliente y flujo completo de checkout con cotización de envío manual antes del pago verificado E2E en la plataforma local.'
    ],
    inDevelopmentFeatures: [
      'Integración en el contenedor productivo de las fotografías definitivas de las 17 prendas (carpetas locales Producto 1 a Producto 17).',
      'Activación de compras y pagos en vivo en immanova.com (actualmente desplegado con COMMERCE_ENABLED=false y PAYMENTS_ENABLED=false para exploración segura).',
      'Línea de Jerseys de fútbol (/jerseys), mostrada honestamente como sección en preparación sin productos ficticios.'
    ],
    architectureSummary:
      'Storefront en Next.js 16 desacoplado de reglas financieras en cliente: opera en modo demostración segura en immanova.com y se conecta al núcleo immanova-core para valoración por tramos, carrito persistente y pedidos con envío manual.',
    localPath: '/Users/edgar_sarmiento/Documents/IMMANOVA/apps/storefront',
    repositoryUrl: 'https://github.com/EdgarMorales7/immanova',
    detectedIssuesAndNotes: [
      'En immanova.com el sitio corre en modo demo controlado para permitir navegar catálogo, fichas y carrito de demostración sin generar órdenes ni cobros reales prematuros.'
    ],
    pendingConfirmation: [
      'Aprobación final de fotografías propias de los 17 productos y textos legales definitivos antes de encender COMMERCE_ENABLED=true en immanova.com.'
    ]
  }
];

export const VERIFIED_TECH_CATEGORIES: VerifiedTechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend y Experiencia Web',
    subtitle: 'Interfaces modernas, accesibles y optimizadas para móvil.',
    items: [
      {
        name: 'Next.js 16 & React 19',
        role: 'App Router, Server Components y arquitectura BFF sin exponer lógica comercial en el navegador.',
        usedIn: ['CHP Sitio web', 'Cotiz AI', 'Imanova Sitio web', 'Imanova Core']
      },
      {
        name: 'TypeScript & Zod',
        role: 'Tipado estricto de punta a punta y validación de contratos de entrada/salida.',
        usedIn: ['Los 6 proyectos']
      },
      {
        name: 'Tailwind CSS 4 & Radix UI',
        role: 'Sistemas de diseño oscuros/claros, modales accesibles (WCAG AA) y layouts responsivos.',
        usedIn: ['FP Básicos Premium', 'CHP Sitio web', 'Cotiz AI', 'Imanova Sitio web']
      },
      {
        name: 'Vite & Zustand',
        role: 'Construcción ultrarrápida y estado persistente para el wizard de cotización DTG.',
        usedIn: ['FP Básicos Premium', 'Portafolio IMANOVA LABS']
      }
    ]
  },
  {
    id: 'ai-automation',
    title: 'Inteligencia Artificial y Automatización',
    subtitle: 'IA acotada a extracción, visión y conversación; precios siempre deterministas.',
    items: [
      {
        name: 'n8n Self-Hosted',
        role: 'Orquestación de agentes de ventas por WhatsApp, webhooks comerciales, envíos y alertas.',
        usedIn: ['FP Básicos Premium', 'CHP Chatbot', 'Cotiz AI', 'Imanova Chatbot']
      },
      {
        name: 'OpenAI Responses & Vision API',
        role: 'Extracción estructurada de pedidos, detección de plastas/bocetos en diseños DTG y agente conversacional.',
        usedIn: ['FP Básicos Premium', 'CHP Chatbot', 'Cotiz AI', 'Imanova Chatbot']
      },
      {
        name: 'OpenAI Whisper',
        role: 'Transcripción automática de notas de voz de WhatsApp para cotizar solicitudes habladas.',
        usedIn: ['CHP Chatbot', 'Cotiz AI', 'Imanova Chatbot']
      },
      {
        name: 'Meta WhatsApp Cloud API',
        role: 'Recepción y envío de mensajes, documentos PDF y plantillas con validación criptográfica HMAC.',
        usedIn: ['CHP Chatbot', 'Cotiz AI', 'Imanova Chatbot']
      }
    ]
  },
  {
    id: 'backend-data',
    title: 'Datos, Seguridad y Motores de Negocio',
    subtitle: 'Persistencia relacional aislada por tenant y generación documental.',
    items: [
      {
        name: 'Supabase (PostgreSQL + RLS + Auth + Storage)',
        role: 'Base de datos con Row-Level Security estricto, autenticación OTP/SSR y almacenamiento privado.',
        usedIn: ['Los 6 proyectos']
      },
      {
        name: 'Motores Deterministas en Centavos',
        role: 'Cálculo exacto de escalones de volumen, puntadas de bordado, DTG e IVA 16% sin alucinaciones.',
        usedIn: ['FP Básicos Premium', 'CHP Chatbot & Web', 'Cotiz AI', 'Imanova Chatbot & Web']
      },
      {
        name: 'pdf-lib & PDF.co',
        role: 'Generación automática de cotizaciones foliadas en PDF listas para enviar por WhatsApp o correo.',
        usedIn: ['FP Básicos Premium', 'CHP Chatbot', 'Cotiz AI', 'Imanova Chatbot']
      },
      {
        name: 'ClamAV Antivirus',
        role: 'Escaneo en contenedor privado de logotipos y diseños subidos por clientes en la web.',
        usedIn: ['CHP Sitio web']
      }
    ]
  },
  {
    id: 'infra-commerce',
    title: 'Infraestructura, Pagos y Calidad',
    subtitle: 'Despliegue continuo en contenedores y pruebas automatizadas.',
    items: [
      {
        name: 'EasyPanel + Docker + GHCR',
        role: 'Alojamiento de contenedores con certificados HTTPS, dominios dedicados e imágenes verificadas por digest.',
        usedIn: ['Los 6 proyectos']
      },
      {
        name: 'GitHub & GitHub Actions',
        role: 'Control de versiones, integración continua y empaquetado de imágenes Linux/amd64.',
        usedIn: ['Los 6 proyectos']
      },
      {
        name: 'MercadoPago, Stripe & Skydropx API',
        role: 'Pasarelas de cobro en línea, webhooks de conciliación y cálculo de tarifas de paquetería por código postal.',
        usedIn: ['FP Básicos Premium', 'Cotiz AI']
      },
      {
        name: 'Vitest, PGlite & Playwright',
        role: 'Más de 1,600 pruebas unitarias/integración en bases aisladas y pruebas E2E de navegador y accesibilidad.',
        usedIn: ['CHP Sitio web', 'Cotiz AI', 'Imanova']
      }
    ]
  }
];
