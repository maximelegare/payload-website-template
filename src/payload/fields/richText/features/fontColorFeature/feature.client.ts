'use client'

import {
  createClientFeature,
  slashMenuBasicGroupWithItems,
  toolbarAddDropdownGroupWithItems,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { toolbarTextDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { FontColorNode, OPEN_FONT_COLOR_DRAWER_COMMAND } from './nodes/FontColorNode'
import { EmbedPlugin } from '../embedFeature/plugins'
import { FontColorIcon } from './icons/FontColorIcon'
import { FC } from 'react'
import { FontColorPlugin } from './plugins'
import { DropdownColorPicker } from './components/ColorPicker/DropdownColorPicker'



export const FontColorFeatureClient = createClientFeature({
  plugins: [
    {
      Component: FontColorPlugin,
      position: 'normal',
    },
  ],
  // nodes: [FontColorNode],

  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          ChildComponent: () => FontColorIcon({ color: 'red' }),
          onSelect: () => {},
        },
      ]),
    ],
  },
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
  // slashMenu: {
  //   groups: [
  //     slashMenuBasicGroupWithItems([
  //       {
  //         key: 'fontColor23424',
  //         label: 'Color Text',
  //         onSelect: ({ editor }) => {
  //           editor.dispatchCommand(OPEN_FONT_COLOR_DRAWER_COMMAND, {})
  //         },
  //         keywords: ['color', 'text'],
  //         Icon: FontColorIcon,
  //       },
  //     ]),
  //   ],
  // },
})
