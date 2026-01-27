import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    titles: defineCollection({
      type: 'data',
      source: 'titles/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string()
      })
    })
  }
})
