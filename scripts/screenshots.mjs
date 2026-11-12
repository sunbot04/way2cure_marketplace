// Screenshots of every page at desktop (1440) and mobile (390) for REVIEW.md.
// Usage: npm run build && npx vite preview --port 4173, then: node scripts/screenshots.mjs
// Uses the installed Microsoft Edge through playwright-core (no browser download).
import { chromium } from 'playwright-core';
import { mkdirSync, mkdtempSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4173';
const OUT = 'docs/screenshots';
const PAGES = [
  ['home', '/'],
  ['shop', '/shop'],
  ['product', '/product/adult-diapers-m'],
  ['cart', '/cart'],
  ['care', '/care'],
  ['care-booking', '/care/dementia'],
  ['subscriptions', '/subscriptions'],
  ['dose-sachets', '/subscriptions/dose-sachets'],
  ['prescription', '/prescription'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['login', '/login'],
  ['signup', '/signup'],
  ['notifications', '/notifications'],
];
const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];

mkdirSync(OUT, { recursive: true });
// Start the installed Edge in its current headless mode and attach over CDP (playwright-core's own
// launcher still asks for the old headless mode, which current Edge no longer has).
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9250;
const profile = mkdtempSync(join(tmpdir(), 'w2c-shots-'));
const edge = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
let browser;
for (let i = 0; i < 40 && !browser; i++) {
  try { browser = await chromium.connectOverCDP(`http://127.0.0.1:${PORT}`); } catch { await new Promise((r) => setTimeout(r, 250)); }
}
if (!browser) throw new Error('Could not start Edge');
for (const [vp, size] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1, isMobile: vp === 'mobile', hasTouch: vp === 'mobile' });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(`${BASE}${path}${path.includes('?') ? '&' : '?'}lang=en`, { waitUntil: 'networkidle' });
    // Scroll through once so every reveal-on-scroll has played, then back to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}/${name}-${vp}.png`, fullPage: true }); // converted to .webp for the repo
    console.log('saved', `${OUT}/${name}-${vp}.png`);
  }
  await ctx.close();
}
await browser.close();
edge.kill();
