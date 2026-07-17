import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title_en', title: 'Title (English)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title_ko', title: 'Title (Korean)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title_en' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['wellness', 'christianity', 'business'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'cover_image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body_en', title: 'Body (English)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'body_ko', title: 'Body (Korean)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'author_note', title: 'Author Note', type: 'text', rows: 2 }),
    defineField({ name: 'published_at', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: 'title_en', category: 'category', media: 'cover_image' },
    prepare: ({ title, category, media }: any) => ({ title, subtitle: category, media }),
  },
})
