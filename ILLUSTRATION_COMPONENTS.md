# Illustration components

Import `src/components/IllustrationProcess.astro` or `src/components/IllustrationGallery.astro` independently. See `src/examples/illustration-components.astro` for a development example (outside the published routes), including two instances of each component. The example uses existing assets; it does not claim to show a matching sketch/final sequence.

Both components accept images with required `src` and meaningful `alt`, plus optional `caption`. `src` can be an imported Astro `ImageMetadata` asset or a public/remote URL string. Shared `IllustrationImage` is exported from `src/components/illustration/images.ts`; each component exports its `Props` interface.

```astro
---
import IllustrationProcess from '../components/IllustrationProcess.astro';
import IllustrationGallery from '../components/IllustrationGallery.astro';
import artwork from '../images/selected/cryptonix-illustrations-54134e96.webp';
const image = { src: artwork, alt: 'Cryptonix illustration collection' };
---
<IllustrationProcess final={image} sketch={image} mockup={image}
  aspectRatio="4 / 3" fit="contain" label="Artwork process" />
<IllustrationGallery images={[image]} columns={3} gap="8px" label="Artwork collection" />
```

Replace repeated example images with the actual three process stages. Process defaults: Mockup selected, `4 / 3`, `contain`. Fit accepts `contain` or `cover`; captions occupy a fixed scrollable space to preserve height. Arrow keys, Home/End, clicks, and horizontal swipes select stages without wrapping.

Gallery defaults: three columns at every breakpoint and an 8px gap. Use CSS lengths for `gap` and a positive integer for `columns`; keep thumbnail touch targets practical for the available width. A native modal dialog makes the background inert and traps focus; Escape, Close, or a backdrop click closes it. Arrow keys, buttons, and horizontal swipes navigate without wrapping. The originating thumbnail regains focus and the previous document scroll setting is restored.

Imported assets generate WebP files at build time (up to 640px thumbnails, 2400px lightbox images, 1600px process images, without upscaling). Full gallery URLs live in data attributes until opened; no full-size images are fetched on initial render. Thumbnails are lazy-loaded and square. Public/remote URL strings remain unchanged apart from prefixing local absolute paths with Astro's configured base. Supply `thumbnail` for public/remote gallery sources to avoid downloading the full original for a thumbnail. URL sources are not transformed at runtime. Imported AVIF, WebP, JPEG and PNG assets work through Astro; public URLs retain their original format.

Styles are scoped and use the existing typography/color tokens. No dependencies, global styles, existing pages, or deployment configuration are changed. Keep the existing root deployment for khralenok.com; the new components also support a configured repository base path. Existing layout/navigation elsewhere in the site still contains root-relative links and is outside this component change.

Validation: `npm run build`, then `npm test`. `astro check` additionally needs the optional `@astrojs/check` and `typescript` development tools, absent in the current checkout. Interactive keyboard, touch, and screen-reader checks should be performed on the case pages in a browser.

## Process collections

`IllustrationProcessCollection.astro` groups several artworks into one boxed viewer. Pass a non-empty `artworks` array, each with `title`, `final`, `sketch`, and `mockup` (the same image objects as the standalone process component). Optional props: `label`, `aspectRatio` (default `1 / 1`), and `fit` (default `contain`). See `src/pages/cryptonix-sales.astro` for the complete three-artwork example.

The box spans its parent width, uses a capped image height on desktop and the configured aspect ratio on mobile, and provides a centered artwork title and small final-artwork thumbnails. Changing artworks preserves the selected stage. Swipes select artworks; the stage tabs remain independently keyboard-operated. Arrow keys and Home/End on the thumbnails select artworks. Navigation stops at either end. A single stage viewer is reused; the other artworks' image URLs remain in data until selected. No-caption collections omit the caption space, while collections with captions reserve it consistently.

Both process components show Mockup first, then Final, then Sketch, with Mockup selected by default. Titles, tabs, captions, and thumbnails are centered. The standalone `IllustrationProcess` keeps its stage-navigation behavior. Its optional `swipeNavigation` flag defaults to `true`; the collection disables stage swipes to avoid competing touch actions.

Gallery `thumbnailPosition` defaults to `center`. Use `thumbnailPosition="left center"` for wide artwork with the subject on the left; full lightbox images remain uncropped.
