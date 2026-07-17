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
      type: 'reference',
      to: [{ type: 'category' }],
      validation: r => r.required(),
    }),
    defineField({ name: 'cover_image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body_en',
      title: 'Body (English)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt text' },
          ],
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video (YouTube / Vimeo)',
          fields: [
            { name: 'url', type: 'url', title: 'Video URL', description: 'Paste a YouTube or Vimeo URL' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare: ({ url, caption }: any) => ({ title: caption || 'Video', subtitle: url }),
          },
        },
      ],
    }),
    defineField({
      name: 'body_ko',
      title: 'Body (Korean)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt text' },
          ],
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video (YouTube / Vimeo)',
          fields: [
            { name: 'url', type: 'url', title: 'Video URL', description: 'Paste a YouTube or Vimeo URL' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare: ({ url, caption }: any) => ({ title: caption || 'Video', subtitle: url }),
          },
        },
      ],
    }),
    defineField({ name: 'author_note', title: 'Author Note', type: 'text', rows: 2 }),
    defineField({ name: 'published_at', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: 'title_en', category: 'category.name_en', media: 'cover_image' },
    prepare: ({ title, category, media }: any) => ({ title, subtitle: category, media }),
  },
})
