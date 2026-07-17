import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { GenerateTranslationAction } from './actions/generateTranslation'

export default defineConfig({
  name: 'personal-blog',
  title: 'Personal Blog',
  projectId: 'vbckoho0',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev: any[], ctx: any) =>
      ctx.schemaType === 'post'
        ? [...prev, GenerateTranslationAction]
        : prev,
  },
})
