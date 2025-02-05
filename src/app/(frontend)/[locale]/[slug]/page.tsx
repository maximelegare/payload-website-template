import type { Metadata } from 'next'


import { PayloadRedirects } from '@app/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React from 'react'
import { homeStatic } from 'src/payload/seed/home-static'

import type { Page as PageType } from '../../../../payload-types'

import { Blocks } from '../../../components/Blocks'
import { Hero } from '../../../components/Hero'
import { generateMeta } from '../../../utilities/generateMeta'
import { Locale } from 'ROOT/locales/locales'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => slug)
}

export default async function Page({ params: { slug = 'home', locale = 'en' } }) {
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
    locale: locale as Locale,
  })

  // Remove this code once your website is seeded
  if (!page) {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <Hero {...hero} />
      <Blocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({
  params: { slug = 'home', locale },
}: {
  params: {
    slug: string
    locale: Locale
  }
}): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })
  const authResult = draft ? await payload.auth({ headers: headers() }) : undefined

  const user = authResult?.user

  const result = await payload.find({
    locale,
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: false,
    user,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}
