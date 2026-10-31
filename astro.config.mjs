import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://khralenok.com',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/incentive-performance/': '/editorial-illustration/',
    '/cryptonix-sales/': '/cryptonix-sticker-pack/',
    '/incentive-ugc/': '/winshark-newsletter/',
    '/zvuk/': '/zvuk-social-media/',
  },
});
