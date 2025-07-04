import { defineCollection, z } from "@nuxt/content";

const portfolioSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  platform: z.string(),
  technology: z.string(),
  development: z.object({
    start: z.string(),
    end: z.string().optional(),
    status: z.enum(["active", "archived", "planned"], {
      message: "Status must be one of 'active', 'archived', or 'planned'",
    }),
  }),
  tags: z
    .array(
      z.object({
        icon: z.string().min(1, "Tag icon is required"),
        content: z.string().min(1, "Tag content is required"),
        link: z.string().url("Link must be a valid URL").optional(),
      }),
    )
    .optional(),
  source: z.string().url("Source must be a valid URL").optional(),
  link: z.string().url("Link must be a valid URL").optional(),
});

export default {
  collections: {
    portfolio_en: defineCollection({
      type: "page",
      source: "portfolio/en/*.md",
      schema: portfolioSchema,
    }),
    portfolio_sk: defineCollection({
      type: "page",
      source: "portfolio/sk/*.md",
      schema: portfolioSchema,
    }),
  },
};
