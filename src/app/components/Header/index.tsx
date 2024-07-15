import { HeaderClient } from '~app/components/Header/index.client'
import { getCachedGlobal } from '~app/utilities/getGlobals'
import React from 'react'

import type { Header } from '../../../payload-types'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient header={header} />
}
