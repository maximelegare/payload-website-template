import React, { useEffect, useRef, useState } from 'react'

import appTheme from '@app/(frontend)/[locale]/css/colors'
import { ScrollArea } from '@@/shared/ui/scroll-area'
import { createSentenceFromCamelCase } from '@payload/lexical/features/fontColorFeature/utils/createSentenceFromCamelCase'
import { translateColor } from '../../../utils/translateColor'
import { RadioGroup, RadioGroupItem } from '@@/shared/ui/radio-group'
import { Label } from '@@/shared/ui/label'
import { Separator } from '@@/shared/ui/seperator'

type Props = {
  onApplyStyles: (color: string) => void
}

export type ColorSpectrum = 'hex' | 'hsl' | 'rgb'

export const ThemeColors = ({ onApplyStyles }: Props) => {
  const [colorSpectrum, setColorSpectrum] = useState<ColorSpectrum>('hex')

  return (
    <div>
      <RadioGroupList value={colorSpectrum} onValueChange={setColorSpectrum} />
      <Separator className="my-2" />
      <ScrollArea className="h-[265px] overflow-auto">
        <div className="flex flex-col gap-2">
          {Object.entries(appTheme).map(([key, variable]) => {
            return (
              <ThemeColorButton
                colorSpectrum={colorSpectrum}
                variableName={key}
                key={key}
                onApplyStyles={onApplyStyles}
                variable={variable}
              />
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

type BtnProps = {
  variableName: string
  variable: string
  onApplyStyles: (color: string) => void
  colorSpectrum: ColorSpectrum
}

const ThemeColorButton = ({ variableName, variable, onApplyStyles, colorSpectrum }: BtnProps) => {
  const colorRef = useRef(null)
  const [backgroundColor, setBackgroundColor] = React.useState(null)

  const getTranslateSpectrum = (
    colorSpectrum: ColorSpectrum,
  ): 'HEX' | 'RGBstring' | 'HSLstring' => {
    switch (colorSpectrum) {
      case 'hex':
        return 'HEX'
      case 'hsl':
        return 'HSLstring'
      case 'rgb':
        return 'RGBstring'
      default:
        return 'HEX'
    }
  }

  useEffect(() => {
    if (colorRef.current) {
      const computedStyle = getComputedStyle(colorRef.current)
      setBackgroundColor(
        translateColor(computedStyle.backgroundColor, getTranslateSpectrum(colorSpectrum), 0),
      )
    }
  }, [colorSpectrum])

  return (
    <button
      key={variableName}
      onClick={() => onApplyStyles(translateColor(backgroundColor, 'HEX'))}
      className="border-none outiline-none flex gap-2 items-center cursor-pointer p-1 rounded-md bg-[var(--theme-elevation-0)] hover:bg-[var(--theme-elevation-50)]"
    >
      <div className="flex items-center w-full gap-2">
        <div
          style={{ backgroundColor: `hsl(var(${variable}))` }}
          ref={colorRef}
          className={`h-9 w-9 rounded-full border-white border-[1px] border-solid`}
        ></div>
        <div className="leading-none">{createSentenceFromCamelCase(variableName, 15)}</div>
      </div>
      <div className="leading-none whitespace-nowrap bg-[var(--theme-elevation-150)] mr-2 p-2 rounded-sm">
        {backgroundColor}
      </div>
    </button>
  )
}

type RadioGroupListProps = {
  value: ColorSpectrum
  onValueChange: (value: ColorSpectrum) => void
}
const RadioGroupList = ({ onValueChange, value }: RadioGroupListProps) => {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      value={value}
      className="flex p-2 rounded-md w-fit bg-[var(--theme-elevation-50)]"
    >
      <div className="flex items-center gap-1">
        <RadioGroupItem value="hex" id="hex" />
        <Label htmlFor="hex">HEX</Label>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="hsl" id="hsl" />
        <Label htmlFor="hsl">HSL</Label>
      </div>

      <div className="flex items-center gap-1">
        <RadioGroupItem value="rgb" id="rgb" />
        <Label htmlFor="rgb">RGB</Label>
      </div>
    </RadioGroup>
  )
}
