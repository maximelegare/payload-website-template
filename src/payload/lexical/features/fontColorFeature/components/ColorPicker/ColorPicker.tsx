'use client'

import '@app/(frontend)/[locale]/css/theme.scss'

import { useState } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'

import { $patchStyleText } from '@lexical/selection'
import { HexColorPickerView } from './views/HexColorPIcker'

type DropdownColorPickerProps = {
  fontColor: string
  onFontColorChange: (color: string) => void
}

export const ColorPickerWrapper = ({ fontColor, onFontColorChange }: DropdownColorPickerProps) => {
  const [editor] = useLexicalComposerContext()
  const applyStyleText = (styles: Record<string, string>) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles)
      }
    })
  }

  const onFontColorSelect = (value: string) => {
    onFontColorChange(value)
    applyStyleText({ color: value })
  }
  return <HexColorPickerView fontColor={fontColor} onFontColorChange={onFontColorSelect} />
}
