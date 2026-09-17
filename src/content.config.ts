import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const cases = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content",
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      service: z.string(),
      role: z.string(),
      deliverables: z.string(),
      cover: image(),
    }),
});

export const collections = {
  cases,
};