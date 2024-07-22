'use client'

import React, { useState } from 'react'
import { ColorPickerWrapper } from './ColorPicker'

import { FontColorIcon } from '../../icons/FontColorIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@payload/components/ui/dropdown-menu'

export const DropdownColorPicker = () => {
  const [fontColor, setFontColor] = useState('')

  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="toolbar-popup__button toolbar-popup__button-bold">
        <FontColorIcon underscoreColor={fontColor} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top'>
        <ColorPickerWrapper fontColor={fontColor} onFontColorChange={setFontColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
