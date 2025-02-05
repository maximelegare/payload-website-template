// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { payloadCloudPlugin } from '@payloadcms/plugin-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  FixedToolbarFeature,
  HeadingFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
// import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import Categories from './payload/collections/Categories'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Posts } from './payload/collections/Posts'
import Users from './payload/collections/Users'
import BeforeDashboard from './payload/components/BeforeDashboard'
import BeforeLogin from './payload/components/BeforeLogin'
import { seed } from './payload/endpoints/seed'
import { Footer } from './payload/globals/Footer/Footer'
import { Header } from './payload/globals/Header/Header'
import { WebsiteConfig } from './payload/globals/WebsiteConfig/WebsiteConfig'
import { revalidateRedirects } from './payload/hooks/revalidateRedirects'
import { defaultLocale, locales } from 'ROOT/locales/locales'

import { en } from 'payload/i18n/en'
import { fr } from 'payload/i18n/fr'
// import { EmbedFeature } from '@payload/lexical/features/embedFeature/feature.server'
import { FontColorFeature } from '@payload/lexical/features/fontColorFeature/feature.server'

import { env } from './env.mjs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle = () => {
  return 'My Website'
}

// dotenv.config({
//   path: path.resolve(dirname, '../../.env'),
// })

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: [BeforeDashboard],
    },
    user: Users.slug,
  },
  i18n: {
    supportedLanguages: { en, fr },
  },
  localization: {
    locales: locales.map((l) => l.locale),
    defaultLocale: defaultLocale,
    fallback: true,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures,
        // TreeViewFeature(),
        FontColorFeature(),
        // EmbedFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  collections: [Pages, Posts, Media, Categories, Users],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      handler: seed,
      method: 'get',
      path: '/seed',
    },
  ],
  globals: [Header, Footer, WebsiteConfig],
  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ['categories'],
    }),
    seoPlugin({
      collections: ['pages', 'posts'],
      generateTitle,
      tabbedUI: true,
      uploadsCollection: 'media',
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
    }),
    payloadCloudPlugin(), // storage-adapter-placeholder
  ],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
