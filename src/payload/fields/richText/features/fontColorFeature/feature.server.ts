import { createServerFeature } from '@payloadcms/richtext-lexical'
import { FontColorFeatureClient } from './feature.client'
import { Field, TextField } from 'payload'
import { FontColorNode } from './nodes/FontColorNode'

const urlField: TextField = {
  name: 'url',
  type: 'text',
  required: true,
}

export const FontColorFeature = createServerFeature({
  feature: {
    ClientFeature: FontColorFeatureClient,
    // nodes: [
    //   {
    //     node: FontColorNode,
    //   },
    // ],
    generateSchemaMap: () => {
      const schemaMap = new Map<string, Field[]>()

      const fields = [urlField]
      schemaMap.set('fields', fields)

      return schemaMap
    },
  },
  key: 'fontColor',
})
