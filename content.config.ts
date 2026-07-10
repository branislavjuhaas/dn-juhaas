import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const Image = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  color: z
    .enum(["primary", "neutral", "success", "warning", "error", "info"])
    .optional(),
  size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
  variant: z
    .enum(["solid", "outline", "subtle", "soft", "ghost", "link"])
    .optional(),
  id: z.string().optional(),
  target: z.enum(["_blank", "_self"]).optional(),
});

export default defineContentConfig({
  collections: {
    contacts: defineCollection({
      type: "data",
      source: "contacts.yml",
      schema: z.object({
        contacts: z.array(Button),
      }),
    }),
    roles: defineCollection({
      type: "data",
      source: "roles.yml",
      schema: z.object({
        roles: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            image: Image.extend({
              rotation: z.number().optional(),
            }),
            links: z.array(Button),
          }),
        ),
      }),
    }),
  },
});
