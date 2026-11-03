import { defineCollection, defineContentConfig, property, z } from "@nuxt/content";

const icon = () =>
  property(z.string()).editor({
    input: "icon",
    iconLibraries: ["ph"],
  });

const seoSchema = z.object({
  title: z.string(),
  description: property(z.string()).editor({ input: "textarea" }),
});

const titleAccent = () =>
  property(z.string()).editor({
    description: "Highlighted part of the heading, rendered with the primary color.",
  });

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: "data",
      source: "home.yml",
      schema: z.object({
        seo: seoSchema,
        hero: z.object({
          title: z.string(),
          titleAccent: titleAccent(),
          description: property(z.string()).editor({ input: "textarea" }),
          links: z.array(
            z.object({
              label: z.string(),
              icon: icon(),
              to: z.string(),
              variant: z.enum(["solid", "outline", "soft", "subtle", "ghost", "link"]).optional(),
              color: z
                .enum(["primary", "secondary", "success", "info", "warning", "error", "neutral"])
                .optional(),
            }),
          ),
        }),
        about: z.object({
          title: z.string(),
          titleAccent: titleAccent(),
          description: property(z.string()).editor({ input: "textarea" }),
          avatar: z.object({
            src: property(z.string()).editor({ input: "media", label: "Avatar image" }),
            alt: z.string(),
          }),
          badges: z.array(
            z.object({
              title: z.string(),
              icon: icon(),
            }),
          ),
          features: z.array(
            z.object({
              title: z.string(),
              description: property(z.string()).editor({ input: "textarea" }),
              icon: icon(),
              class: z.string().optional(),
            }),
          ),
        }),
        testimonial: z.object({
          quote: property(z.string()).editor({ input: "textarea" }),
          author: z.object({
            name: z.string(),
            description: z.string(),
            avatar: property(z.string()).editor({ input: "media" }),
          }),
        }),
      }),
    }),

    projectsPage: defineCollection({
      type: "data",
      source: "projects-page.yml",
      schema: z.object({
        seo: seoSchema,
        hero: z.object({
          title: z.string(),
          titleAccent: titleAccent(),
        }),
        stats: z.array(
          z.object({
            key: z.enum(["commits", "minutes", "projects"]).editor({
              description: "Value from the statistics API shown next to the unit.",
            }),
            icon: icon(),
            unit: z.string(),
          }),
        ),
        statsMessage: z.object({
          working: z
            .string()
            .editor({ description: "Shown when more than 6 hours were tracked this week." }),
          idle: z
            .string()
            .editor({ description: "Shown when 6 hours or less were tracked this week." }),
        }),
        sections: z.object({
          featured: z.object({
            title: z.string(),
          }),
          contributions: z.object({
            title: z.string(),
          }),
        }),
      }),
    }),

    contactsPage: defineCollection({
      type: "data",
      source: "contacts-page.yml",
      schema: z.object({
        seo: seoSchema,
        hero: z.object({
          title: z.string(),
          titleAccent: titleAccent(),
        }),
        stats: z.object({
          location: z.object({
            icon: icon(),
            label: z
              .string()
              .editor({ description: "Accessible label for the current location statistic." }),
          }),
          time: z.object({
            label: z
              .string()
              .editor({ description: "Accessible label for the local time statistic." }),
            icons: z.object({
              night: icon(),
              morning: icon(),
              day: icon(),
              evening: icon(),
            }),
          }),
        }),
        links: z.array(
          z.object({
            label: z.string(),
            icon: icon(),
            to: z.string(),
            ariaLabel: property(z.string()).editor({
              description:
                "Accessible name announced by screen readers. It should contain the visible label.",
            }),
          }),
        ),
      }),
    }),

    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      schema: z.object({
        title: z.string(),
        description: property(z.string()).editor({
          input: "textarea",
          description: "Short summary shown on the featured project card.",
        }),
      }),
    }),
  },
});
