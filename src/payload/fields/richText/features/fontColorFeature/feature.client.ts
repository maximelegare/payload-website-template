'use client'

import {
  createClientFeature,
  slashMenuBasicGroupWithItems,
  toolbarAddDropdownGroupWithItems,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { FontColorNode, OPEN_FONT_COLOR_DRAWER_COMMAND } from './nodes/FontColorNode'
import { EmbedPlugin } from '../embedFeature/plugins'
import { FontColorIcon } from './icons/FontColorIcon'
import { FC } from 'react'
import { FontColorPlugin } from './plugins'

export const FontColorFeatureClient = createClientFeature({
  plugins: [
    {
      Component: FontColorPlugin,
      position: 'normal',
    },
  ],
  nodes: [FontColorNode],
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          key: 'fontColor',
          ChildComponent: FontColorIcon,
          label: 'Color Text',
          onSelect: ({ editor }) => {
            editor.dispatchCommand(OPEN_FONT_COLOR_DRAWER_COMMAND, {})
          },
        },
      ]),
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          ChildComponent: () => FontColorIcon({ color: 'red' }),
          onSelect: ({ editor }) => {
            editor.dispatchCommand(OPEN_FONT_COLOR_DRAWER_COMMAND, {})
          },
        },
      ]),
    ],
  },
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          onSelect: ({ editor }) => {
            editor.dispatchCommand(OPEN_FONT_COLOR_DRAWER_COMMAND, {})
          },
          keywords: ['color', 'text'],
          Icon: FontColorIcon,
        },
      ]),
    ],
  },
})
