# Grigorii Khralenok — portfolio

Static Astro website for `https://khralenok.com`, prepared for GitHub Pages.

## Run locally

Use Node 24 (minimum 22.12).

```sh
npm ci
npm run dev
```

Production preview:

```sh
npm run build
npm test
npm run preview
```

Run commands from this project root.

## Edit the website

- `src/data/profile.json`: positioning, public contact details, biography, and profile links.
- `src/data/projects.json`: six cases, metrics, scope, image captions, and Mermaid diagram sources.
- `src/content/writing/`: three selected articles.
- `src/images/selected/`: referenced project imagery; Astro produces optimized variants.
- `src/pages/`: homepage, case pages, writing pages, 404, and sitemap.
- `src/components/`: header, footer, project cards, images, and process diagrams.
- `src/styles/`: supplied palette and responsive styling.
- `public/`: logo, favicon, workflow illustration, social cover, campaign animations, robots file, and CNAME.
- `docs/content-notes.md`: claim context, creator attribution, asset provenance, and generated-cover prompts.
- `docs/project-questions/README.md`: six project questionnaires for the next editorial pass, with space for candid answers.

Fredoka and Inter are self-hosted. Icons use Lucide. Beautiful Mermaid renders diagrams during the build; mobile uses readable text cards. Campaign animations and the embedded YouTube showreel respect reduced-motion preferences.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds this root project with Node 24 and deploys when `main` is pushed or the workflow is run manually. Set the repository's Pages build source to **GitHub Actions** and custom domain to **khralenok.com**. `public/CNAME` and `astro.config.mjs` already use that domain.

The workspace has no Git remote configured; no deployment has been performed.

## Checks

`npm test` validates built pages, local links, images, anchors, canonical URLs, custom domain, sitemap, and absence of draft placeholders. Run the build first.

Research archives, old portfolios, unused components, unused images, and rebuild scripts have been removed from this website project after a final source review. A verified recovery archive was created outside the project at `/private/tmp/portfolio-rebuild-sources-20261003.zip`; it is temporary and is not a website dependency.
