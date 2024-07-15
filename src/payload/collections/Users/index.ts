import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import adminsAndUser from '@payload/access/adminsAndUser'
import { anyone } from '@payload/access/anyone'
import { admins } from '@payload/access/admins'
import { checkRole } from './checkRole'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
}

export default Users
