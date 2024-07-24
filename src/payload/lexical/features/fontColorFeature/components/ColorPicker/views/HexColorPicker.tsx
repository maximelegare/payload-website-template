import { Input } from '@@/shared/ui/input'
import { Label } from '@@/shared/ui/label'
import React, { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { translateColor } from '../../../utils/translateColor'

interface Props {
  onFontColorChange: (color: string) => void
  fontColor: string
}

export const HexColorPickerView = ({ fontColor, onFontColorChange }: Props) => {
  const [color, setColor] = React.useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  const cleanInput = (string: string) => {
    if (typeof string === 'string' && string.includes('#')) {
      return string.split('#')[1]
    }
    return string
  }

  useEffect(() => {
    if (!fontColor.includes('--')) {
      setColor(translateColor(fontColor, 'HEX'))
    } else {
      setColor('#000000')
    }
    setIsLoading(false)
  }, [])

  const handleFontColorChange = (color: string) => {
    setColor(color)
    onFontColorChange(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setColor(color)
    onFontColorChange(`#${color}`)
  }

  return (
    <>
      {!isLoading && (
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
              value={cleanInput(color) || color}
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
      )}
    </>
  )
}
