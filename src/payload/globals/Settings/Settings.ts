import type { GlobalConfig } from 'payload'

import switchField from '@payload/fields/switch/config'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    switchField({
      label: 'Website in Construction',
      name: 'websiteInConstruction',
    }),
  ],
}
