import { Input } from '@@/shared/ui/input'
import { Label } from '@@/shared/ui/label'
import React, { useEffect } from 'react'
import { HslColorPicker, HslColor } from 'react-colorful'
import { translateColor } from '../../../utils/translateColor'

interface Props {
  onFontColorChange?: (color: string) => void
  fontColor: string
  onApplyStyles:() => void
}

export const HSLColorPickerView = ({ fontColor, onFontColorChange }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hslValues, setHslValues] = React.useState<HslColor>({
    h: 0,
    s: 0,
    l: 0,
  })

  useEffect(() => {
    if (fontColor && !fontColor.includes('--')) {
      const transformed = translateColor(fontColor, 'HSL')
      setHslValues({ h: transformed.H, s: transformed.S, l: transformed.L })
    } else {
      setHslValues({ h: 0, s: 0, l: 0 })
    }
    setIsLoading(false)
  }, [])

  const handleFontColorChange = (color: HslColor) => {
    setHslValues(color)
    onFontColorChange(translateColor({ H: color.h, S: color.s, L: color.l }, 'HSLstring'))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    const name = e.target.name

    setHslValues((prev) => ({ ...prev, [name]: parseInt(color) }))
    onFontColorChange(
      translateColor(
        {
          H: hslValues.h,
          S: hslValues.s,
          L: hslValues.l,
          ...hslValues,
          [name.toUpperCase()]: parseInt(color),
        },
        'HSLstring',
      ),
    )
  }

  return (
    <>
      {!isLoading && (
        <div className="flex gap-4 flex-col">
          <HslColorPicker
            id="colorpicker"
            color={hslValues}
            onChange={(color) => handleFontColorChange(color)}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input">H</Label>
              <Input
                value={hslValues.h}
                id="hex-color-picker-input"
                name="h"
                type="number"
                min={0}
                max={360}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input">S</Label>
              <Input
                id="hex-color-picker-input"
                value={hslValues.s}
                name="s"
                type="number"
                max={100}
                min={0}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input">L</Label>
              <Input
                value={hslValues.l}
                id="hex-color-picker-input"
                name="l"
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
      )}
    </>
  )
}
