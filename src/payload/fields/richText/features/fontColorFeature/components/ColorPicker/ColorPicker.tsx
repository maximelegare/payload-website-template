'use client'

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'

import { $patchStyleText } from '@lexical/selection'

interface ColorPickerProps {
  onFontColorChange: (color: string) => void
  fontColor: string
}

const ColorPicker = ({ fontColor, onFontColorChange }: ColorPickerProps) => {
  return (
    <HexColorPicker
      id="colorpicker"
      color={fontColor}
      onChange={(color) => {
        onFontColorChange(color)
      }}
    />
  )
}

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
  return (
    <div style={{ position: 'absolute', top: '10px', right: '-20px' }}>
      <ColorPicker fontColor={fontColor} onFontColorChange={onFontColorSelect} />
    </div>
  )
}
