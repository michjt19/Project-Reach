// @ts-nocheck
// sanity/sanity.config.ts
// NOTE: This file is for the standalone Sanity Studio — it is NOT imported by the Next.js app.
// Install studio deps separately: npm install sanity @sanity/vision (from within /sanity dir)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'project-reach',
  title: 'Project Reach',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
