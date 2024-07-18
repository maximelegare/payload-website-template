'use client'

import { useState } from 'react'
import { RgbColor, RgbColorPicker } from 'react-colorful'

export const ColorPicker = () => {
  const [color, setColor] = useState<RgbColor>({ b: 0, g: 0, r: 0 })
  return <RgbColorPicker id="colorpicker" color={color} onChange={setColor} />
}
