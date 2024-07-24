import { Input } from '@@/shared/ui/input'
import { Label } from '@@/shared/ui/label'
import React, { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { translateColor } from '../../../utils/translateColor'
import { Button } from '@payloadcms/ui'

interface Props {
  onFontColorChange: (color: string) => void
  fontColor: string
  onApplyStyles: () => void
}

export const ColorPickerView = ({ fontColor, onFontColorChange, onApplyStyles }: Props) => {
  const [color, setColor] = React.useState<string | undefined>(undefined)

  const [inputs, setInputs] = React.useState({
    hex: { value: '#000000' },
    rgb: { r: 0, g: 0, b: 0 },
    hsl: { h: 0, s: 0, l: 0 },
  })

  useEffect(() => {
    if (fontColor?.includes('--')) {
      setColor('#000000')
    }
  }, [])

  const cleanInput = (string: string) => {
    if (typeof string === 'string' && string.includes('#')) {
      return string.split('#')[1]
    }
    return string
  }

  const handleFontColorChange = (color: string) => {
    const HSL = translateColor(fontColor, 'HSL')
    const RGB = translateColor(fontColor, 'RGB')

    setInputs((prev) => ({
      hex: { value: color },
      hsl: { h: HSL.H, s: HSL.S, l: HSL.L },
      rgb: { r: RGB.R, g: RGB.G, b: RGB.B },
    }))
    setColor(color)
    onFontColorChange(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const name = e.target.name.split('.')[0]
    const subName = e.target.name.split('.')[1]

    setInputs((prev) => ({
      ...prev,
      [name]: { ...prev[name], [subName]: name === 'hex' ? value : parseInt(value) },
    }))

    let HEX: string
    if (name === 'hex') {
      HEX = color
    } else if (name === 'hsl') {
      HEX = translateColor({ H: inputs.hsl.h, S: inputs.hsl.s, L: inputs.hsl.l }, 'HEX')
    } else if (name === 'rgb') {
      console.log('RGB')
      // HEX = translateColor({ R: inputs.rgb.r, G: inputs.rgb.g, B: inputs.rgb.b }, 'HEX')
    }

    setColor(HEX)

    onFontColorChange(color)
  }

  return (
    <>
      {
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <HexColorPicker
              id="colorpicker"
              color={color}
              onChange={(color) => {
                handleFontColorChange(color)
              }}
            />
            <div className="flex gap-2 items-center w-full ">
              <div className="flex-grow w-full"></div>
              <Label htmlFor="hex-color-picker-input">HEX</Label>
              <Input
                value={cleanInput(inputs.hex.value)}
                name="hex.value"
                id="hex-color-picker-input"
                beforeIcon={<span className="text-lg">#</span>}
                type="text"
                maxLength={7}
                className="tracking-[0.2rem] text-base w-[120px]"
                onChange={handleInputChange}
                onBlur={(e) => cleanInput(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center w-full">
                <Label htmlFor="hex-color-picker-input" className="w-3">
                  H
                </Label>
                <Input
                  value={inputs.hsl.h}
                  id="hex-color-picker-input"
                  name="hsl.h"
                  type="number"
                  min={0}
                  max={360}
                  maxLength={7}
                  className="tracking-[0.2rem] text-base w-24"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2 items-center w-full">
                <Label htmlFor="hex-color-picker-input" className="w-3">
                  S
                </Label>
                <Input
                  id="hex-color-picker-input"
                  value={inputs.hsl.s}
                  name="hsl.s"
                  type="number"
                  max={100}
                  min={0}
                  maxLength={7}
                  className="tracking-[0.2rem] text-base w-24"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2 items-center w-full">
                <Label htmlFor="hex-color-picker-input" className="w-3">
                  L
                </Label>
                <Input
                  value={inputs.hsl.l}
                  id="hex-color-picker-input"
                  name="hsl.l"
                  type="number"
                  min={0}
                  max={100}
                  maxLength={7}
                  className="tracking-[0.2rem] text-base w-24"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center w-full">
                <Label htmlFor="hex-color-picker-input" className="w-3">
                  R
                </Label>
                <Input
                  value={inputs.rgb.r}
                  id="hex-color-picker-input"
                  name="rgb.r"
                  type="number"
                  min={0}
                  max={360}
                  maxLength={7}
                  className="tracking-[0.2rem] text-base w-24"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2 items-center w-full">
                <Label htmlFor="hex-color-picker-input" className="w-3">
                  G
                </Label>
                <Input
                  id="hex-color-picker-input"
                  value={inputs.rgb.g}
                  name="rgb.g"
                  type="number"
                  max={100}
                  min={0}
                  maxLength={7}
                  className="tracking-[0.2rem] text-base w-24"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2 items-center w-full">
                <Label htmlFor="hex-color-picker-input" className="w-3">
                  B
                </Label>
                <Input
                  value={inputs.rgb.b}
                  id="hex-color-picker-input"
                  name="rgb.b"
                  type="number"
                  min={0}
                  max={100}
                  maxLength={7}
                  className="tracking-[0.2rem] text-base w-24"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
