'use client'

import React, { useState } from 'react'
import { ColorPicker } from './ColorPickerComponent'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'

import { $patchStyleText } from '@lexical/selection'

export const DropdownColorPicker = () => {
  const [fontColor, setFontColor] = useState('#000')
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
    applyStyleText({ color: value })
    // setShowColorPicker(false)
  }

  return (
    <div style={{position:"absolute", top:"35px", right:0}}>
      
      <ColorPicker fontColor={fontColor} onFontColorChange={onFontColorSelect} />
    </div>
  )
}
