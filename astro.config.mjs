import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://khralenok.com',
    fonts: [{
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        styles: ["normal"],
        weights: [400, 600, 900]
    }]
});