import { Input } from '@@/shared/ui/input'
import { Label } from '@@/shared/ui/label'
import React, { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  onFontColorChange: (color: string) => void
  fontColor: string
}

export const HexColorPickerView = ({ fontColor, onFontColorChange }: Props) => {
  const [color, setColor] = React.useState(fontColor || '#000000')

  const [colorWithoutHash, setColorWithoutHash] = React.useState<string | undefined>("000000")

  const cleanInput = (string: string) => {
    if (string.includes('#')) {
      return string.split('#')[1]
    }
    return string
  }

  useEffect(() => {
    setColorWithoutHash(cleanInput(color))
  }, [color])

  useEffect(() => {
    console.log(fontColor)
    setColor(fontColor)
  }, [fontColor])

  const handleFontColorChange = (color: string) => {
    console.log(color)
    setColor(color)
    onFontColorChange(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setColor(`color`)
    onFontColorChange(color)
  }

  return (
    <div className="flex gap-4 flex-col">
      <HexColorPicker
        id="colorpicker"
        color={color}
        onChange={(color) => {
          handleFontColorChange(color)
        }}
      />
      <div className="flex gap-2 items-center w-full">
        <Label htmlFor="hex-color-picker-input">HEX</Label>
        <Input
          value={colorWithoutHash}
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
  )
}
