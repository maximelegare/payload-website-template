'use client'

import React, { useState } from 'react'
import { ColorPickerWrapper } from './ColorPicker'

import { FontColorIcon } from '../../icons/FontColorIcon'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@@/shared/ui/dropdown-menu'
import { $patchStyleText } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
export const DropdownColorPicker = () => {
  const [fontColor, setFontColor] = useState('')
  const [editor] = useLexicalComposerContext()

  const applyStyleText = (styles: Record<string, string>) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles)
      }
    })
  }

  const handleChangeStyles = (open: boolean) => {
    if (open) {
      // Sets the font color for the content in Lexcal
      // (if it loses the focus, the selection styling disapears)
      applyStyleText({ 'background-color': '#7dccf8', color: '#000000', 'padding-bottom': '1px' })
    } else {
      applyStyleText({ color: fontColor, 'background-color': null, 'padding-bottom': null })
    }
  }

  return (
    <DropdownMenu  onOpenChange={handleChangeStyles}>
      <DropdownMenuTrigger
        className="toolbar-popup__button toolbar-popup__button-bold"
      >
        <FontColorIcon underscoreColor={fontColor} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <ColorPickerWrapper
          onApplyStyles={() => handleChangeStyles(false)}
          fontColor={fontColor}
          onFontColorChange={setFontColor}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
