# Grigorii Khralenok — portfolio

Static Astro portfolio for https://khralenok.com, published through GitHub Pages.

## Local development

Use Node 24. Run commands from the repository root.

```sh
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4322
```

Astro preview runs in the background. Use `npx astro preview status` or `npx astro preview stop` to manage it. Rebuild after edits and refresh the browser, or use `npm run dev` for automatic updates.

## Editing

- `src/data/profile.json`: positioning, contact details, biography, personal Instagram posts, and external Substack article links.
- `src/data/projects.json`: six cases, gallery assets, credits, Instagram reels, and Mermaid sources.
- `src/images/selected/`: active project imagery, optimized by Astro at build time.
- `src/components/`: shared navigation, gallery, artwork mockup, and process-diagram components.
- `src/styles/`: palette, typography, and responsive layout.
- `public/`: logo, favicon, personal illustration, social cover, campaign animations, robots, and CNAME.

Fredoka and Inter are self-hosted. Icons use Lucide; Beautiful Mermaid renders diagrams at build time. Image variants include native resolutions with layout-specific sizing. Motion and the showreel respect reduced-motion preferences. Instagram embeds retain direct post links.

The ignored local `docs/` folder contains your project answers and editorial notes. It is not required to build or deploy the website. Personal Instagram posts and UGC reels are stored in the website data files.

## Release

The workflow at `.github/workflows/deploy.yml` builds and validates pull requests targeting `main`. Pushes to `main` build, validate, and deploy `dist/` to GitHub Pages. Manual runs can deploy `main`; runs on other branches only build and upload an artifact.

1. In repository **Settings → Pages**, choose **GitHub Actions** as the build source.
2. Set the custom domain to **khralenok.com** and enable **Enforce HTTPS** when available.
3. Commit the portfolio changes and merge `october-major-update` into `main`.
4. Check the **Build and deploy portfolio** run in Actions.

`astro.config.mjs` and `public/CNAME` already use the custom domain. Deployments use the `github-pages` environment; its branch rules must allow `main`. No custom token is required.

## Validation

```sh
npm run build
npm test
```

The validation script checks generated pages, local links, images, anchors, headings, canonical URLs, the custom domain, sitemap, and draft placeholders. Build outputs, caches, dependencies, and local editorial notes are excluded from Git.
