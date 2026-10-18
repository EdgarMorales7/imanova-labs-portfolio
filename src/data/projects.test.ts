import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { PORTFOLIO_METADATA, PROJECTS, VERIFIED_TECH_CATEGORIES } from './projects';
import { calculateCotizAiDemoQuote, DEMO_SCENARIOS } from './cotizAiDemoData';

describe('IMANOVA LABS Portfolio Inventory & Integrity', () => {
  it('contains exactly the 6 required projects numbered 01 to 06', () => {
    expect(PROJECTS).toHaveLength(6);
    expect(PROJECTS.map((p) => p.number)).toEqual(['01', '02', '03', '04', '05', '06']);
    expect(PORTFOLIO_METADATA.heroTitle).toBe(
      'Proyectos que conectan inteligencia artificial y soluciones reales.'
    );
    expect(PORTFOLIO_METADATA.footerText).toBe(
      'Portafolio de proyectos desarrollados con asistencia de IA.'
    );
  });

  it('verifies that every primary and gallery screenshot file exists on disk in public/', () => {
    const publicDir = path.resolve(__dirname, '../../public');
    for (const project of PROJECTS) {
      const mainImgPath = path.join(publicDir, project.screenshot);
      expect(fs.existsSync(mainImgPath), `Missing main screenshot: ${project.screenshot}`).toBe(
        true
      );
      for (const item of project.gallery) {
        const galleryImgPath = path.join(publicDir, item.src);
        expect(fs.existsSync(galleryImgPath), `Missing gallery image: ${item.src}`).toBe(true);
      }
    }
  });

  it('clearly separates verified features from in-development features for all 6 projects', () => {
    for (const project of PROJECTS) {
      expect(project.verifiedFeatures.length).toBeGreaterThanOrEqual(3);
      expect(project.inDevelopmentFeatures.length).toBeGreaterThanOrEqual(1);
      expect(project.verifiedTechnologies.length).toBeGreaterThanOrEqual(4);
    }
    expect(VERIFIED_TECH_CATEGORIES).toHaveLength(4);
  });

  it('ensures no secret keys, JWTs, or private tokens are present in portfolio data', () => {
    const serialized = JSON.stringify({ PROJECTS, DEMO_SCENARIOS, VERIFIED_TECH_CATEGORIES });
    expect(serialized).not.toMatch(/sk-proj-|eyJhbGciOi|ghp_|sb_secret_|SUPABASE_SERVICE_ROLE_KEY/);
  });
});

describe('Cotiz AI Deterministic Demo Pricing Engine', () => {
  it('calculates CHP polo embroidery with stitch surcharge and human punching fee in integer centavos', () => {
    // 30 polos (10% discount on 33,900 = 30,510 cents -> $305.10/unit * 30 = 915,300 cents)
    // 30 applications -> band 25-49 ($40 base = 4,000 cents) + 2,000 extra stitches (2 blocks * 200 = 400 cents) = 4,400 cents * 30 = 132,000 cents
    // Punching fee: $300 MXN = 30,000 cents
    const res = calculateCotizAiDemoQuote({
      garmentSource: 'COMMERCE',
      garmentModel: 'polo_pique_320',
      quantity: 30,
      designsPerGarment: 1,
      estimatedStitches: 7000,
      punchingFeeMxn: 300
    });

    expect(res.totalApplications).toBe(30);
    expect(res.garmentUnitCents).toBe(30510);
    expect(res.garmentSubtotalCents).toBe(915300);
    expect(res.effectiveApplicationUnitCents).toBe(4400);
    expect(res.applicationsSubtotalCents).toBe(132000);
    expect(res.punchingFeeCents).toBe(30000);
    expect(res.subtotalBeforeTaxCents).toBe(1077300);
    expect(res.ivaCents).toBe(172368);
    expect(res.totalCents).toBe(1249668);
  });

  it('enforces $0.00 MXN garment charge when garmentSource is CUSTOMER', () => {
    const res = calculateCotizAiDemoQuote({
      garmentSource: 'CUSTOMER',
      garmentModel: 'hoodie_335',
      quantity: 60,
      designsPerGarment: 2,
      estimatedStitches: 5000,
      punchingFeeMxn: 350
    });

    expect(res.garmentUnitCents).toBe(0);
    expect(res.garmentSubtotalCents).toBe(0);
    expect(res.totalApplications).toBe(120); // Band 100-199 -> $25.00 (2,500 cents)
    expect(res.effectiveApplicationUnitCents).toBe(2500);
    expect(res.applicationsSubtotalCents).toBe(300000);
    expect(res.punchingFeeCents).toBe(35000);
    expect(res.totalCents).toBe(388600); // $3,886.00 MXN with 16% IVA
  });
});
