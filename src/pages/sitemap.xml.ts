import projects from '../data/projects.json';
import { getCollection } from 'astro:content';
export async function GET() {
  const articles = await getCollection('writing');
  const paths = ['/', ...projects.map(p => `/${p.id}/`), ...articles.map(a => `/writing/${a.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>https://khralenok.com${path}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
