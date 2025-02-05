import React from 'react'

import type { Page } from '../../../payload-types'

import { HighImpactHero } from '../../heros/HighImpact'
import { LowImpactHero } from '../../heros/LowImpact'
import { MediumImpactHero } from '../../heros/MediumImpact'
import { AstroTemplateHero } from '@app/heros/AstroTemplate/Index'


const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  astroTemplate: AstroTemplateHero,
}

export const Hero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
