import React from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
    onFontColorChange: (color: string) => void
    fontColor: string
  }
  

export const HexColorPickerView = ({ fontColor, onFontColorChange }: Props) => {
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