import type { GlobalConfig } from 'payload'

import switchField from '@payload/fields/switch/config'

export const SettingsPage: GlobalConfig = {
  slug: 'settings-page',
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
