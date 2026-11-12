// Lighthouse (mobile) for the main pages. Writes docs/lighthouse/<page>.json and prints a table.
// Usage: npm run build && npx vite preview --port 4173, then: node scripts/lighthouse.mjs
// Starts the installed Edge in headless mode and points Lighthouse at it (Lighthouse's own
// launcher cannot detect current Edge on Windows).
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4173';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9260;
const PAGES = (process.argv[2] ?? 'home:/,shop:/shop,care:/care,prescription:/prescription,login:/login')
  .split(',').map((x) => x.split(':'));

mkdirSync('docs/lighthouse', { recursive: true });
const profile = mkdtempSync(join(tmpdir(), 'w2c-lh-'));
const edge = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));

const rows = [];
for (const [name, path] of PAGES) {
  const out = `docs/lighthouse/${name}.json`;
  execFileSync('npx', ['--yes', 'lighthouse@12.2.1', `${BASE}${path}`, `--port=${PORT}`, '--form-factor=mobile',
    '--only-categories=performance,accessibility,best-practices,seo', '--output=json', `--output-path=${out}`, '--quiet'],
    { stdio: 'inherit', shell: true });
  const r = JSON.parse(readFileSync(out, 'utf8'));
  const s = Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
  rows.push({ page: name, ...s, LCP: r.audits['largest-contentful-paint'].displayValue, TBT: r.audits['total-blocking-time'].displayValue, CLS: r.audits['cumulative-layout-shift'].displayValue });
}
edge.kill();
console.table(rows);
