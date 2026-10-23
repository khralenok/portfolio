import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface IllustrationImage {
  src: string | ImageMetadata;
  alt: string;
  caption?: string;
  /** Pre-sized public thumbnail, recommended when src is a public URL. */
  thumbnail?: string | ImageMetadata;
}

export function assetPath(src: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return src.startsWith('/') && !src.startsWith('//') && base && src !== base && !src.startsWith(`${base}/`) ? `${base}${src}` : src;
}

export async function imageSource(src: IllustrationImage['src'], width: number) {
  if (typeof src === 'string') return { src: assetPath(src) };
  const image = await getImage({ src, width: Math.min(width, src.width), format: 'webp' });
  return { src: assetPath(image.src), width: image.attributes.width, height: image.attributes.height };
}

export interface PreparedIllustrationImage {
  source: { src: string };
  alt: string;
  caption?: string;
}
