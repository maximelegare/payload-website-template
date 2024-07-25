'use client'

import {
  createClientFeature,
  slashMenuBasicGroupWithItems,
  toolbarAddDropdownGroupWithItems,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { toolbarTextDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { EmbedPlugin } from '../embedFeature/plugins'
import { FontColorIcon } from './icons/FontColorIcon'
import { FC } from 'react'
import { DropdownColorPicker } from './components/ColorPicker/DropdownColorPicker'



export const FontColorFeatureClient = createClientFeature({

  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          Component: DropdownColorPicker,
          order: 4,
        },
      ]),
    ],
  },
})
