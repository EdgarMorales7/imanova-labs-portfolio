# IMMANOVA LABS — AI PROJECTS (Portafolio Interactivo)

Portafolio web interactivo de **Edgar Morales Sarmiento** (Ingeniero en Sistemas Automotrices · UPIITA - IPN) que documenta, centraliza y permite explorar seis proyectos desarrollados con asistencia de inteligencia artificial desde febrero de 2026:

1. **FP Básicos Premium — Sitio web y Cotizador DTG con IA** (`https://fpbasicospremium.cloud`)
2. **CHP Personalizados — Chatbot de WhatsApp** (Agente IA en n8n + Cotiz AI Core)
3. **CHP Personalizados — Sitio web** (`https://fpbasicospremium-chp-store-web.l6hmws.easypanel.host`)
4. **Cotiz AI — Aplicación SaaS / CRM Operativo** (Con demo interactiva aislada en el navegador)
5. **IMMANOVA — Chatbot de WhatsApp** (Núcleo Cotiz AI + 7 workflows en n8n para *blanks* · `+52 56 6192 8910`)
6. **IMMANOVA — Sitio web** (`https://immanova.com`)

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Pruebas y compilación de producción

```bash
npm test
npm run check
npm run build
```

## Configuración centralizada

Toda la información de los seis proyectos, el perfil profesional de Edgar Morales Sarmiento, los enlaces reales, capturas de pantalla, tecnologías verificadas y estado actual se gestiona en:
- `src/data/projects.ts`
- `src/data/cotizAiDemoData.ts` (Motor determinista en centavos y escenarios sintéticos de la demo de Cotiz AI)

## Despliegue en EasyPanel

Incluye `Dockerfile` (`nginx:alpine`, puerto `80`, healthcheck `/health`) listo para publicarse en EasyPanel (`https://immanova-portfolio.l6hmws.easypanel.host`) sin requerir variables de entorno ni credenciales.
