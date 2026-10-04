import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
const root = resolve('dist');
if (!existsSync(root)) throw new Error('Run npm run build first.');
const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
const errors = [];
const html = files(root).filter(path => extname(path) === '.html');
for (const path of html) {
  const content = readFileSync(path, 'utf8');
  if ((content.match(/<h1\b/g) || []).length !== 1) errors.push(`${path}: expected one h1`);
  if (!content.includes('rel="canonical"')) errors.push(`${path}: missing canonical`);
  for (const [, raw] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith('/')) continue;
    const [pathname, hash] = raw.split('#');
    const target = resolve(root, '.' + pathname.split('?')[0]);
    const page = extname(target) ? target : join(target, 'index.html');
    if (!existsSync(page)) errors.push(`${path}: missing ${raw}`);
    else if (hash && extname(page) === '.html' && !readFileSync(page, 'utf8').includes(`id="${hash}"`)) errors.push(`${path}: missing anchor ${raw}`);
  }
  if (/Lorem ipsum|Bla bla|\[Screenshot|Editorial checks before publication/.test(content)) errors.push(`${path}: reference placeholder leaked`);
}
if (readFileSync(join(root, 'CNAME'), 'utf8').trim() !== 'khralenok.com') errors.push('Incorrect custom domain');
if (!existsSync(join(root, 'sitemap.xml'))) errors.push('Missing sitemap');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verified ${html.length} HTML pages: local links, image sources, anchors, headings, canonical tags, custom domain, sitemap, and absence of draft placeholders.`);
