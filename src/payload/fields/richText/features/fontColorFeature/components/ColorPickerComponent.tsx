'use client'

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  onFontColorChange: (color: string) => void
  fontColor: string
}

export const ColorPicker = ({ fontColor, onFontColorChange }: Props) => {
  return (
    <HexColorPicker
      id="colorpicker"
      color={fontColor}
      onChange={(color) => {
        console.log(color)
        onFontColorChange(color)
      }}
    />
  )
}
