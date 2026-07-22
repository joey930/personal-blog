import { defineType, defineField } from 'sanity'

export const aboutSchema = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'bio_en', title: 'Bio (English)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'bio_ko', title: 'Bio (Korean)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
})
