import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'personal-blog',
  title: "The Pilgrim's Venture",
  projectId: 'vbckoho0',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
