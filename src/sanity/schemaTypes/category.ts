import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name_en',
      title: 'Name (English)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'name_ko',
      title: 'Name (Korean)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-safe identifier. Used in post URLs.',
      options: { source: 'name_en' },
      validation: r => r.required(),
    }),
  ],
  preview: {
    select: { title: 'name_en', subtitle: 'name_ko' },
  },
})
