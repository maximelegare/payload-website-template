import type { GlobalConfig } from 'payload'

import switchField from '@payload/fields/switch/config'

export const WebsiteConfig: GlobalConfig = {
  slug: 'website-config',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    switchField({
      label: 'Under Construction',
      name: 'underConstruction',
    }),
  ],
}
