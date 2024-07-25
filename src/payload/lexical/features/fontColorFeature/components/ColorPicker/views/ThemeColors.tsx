import React, { useEffect, useRef } from 'react'

import appTheme from '@app/(frontend)/[locale]/css/colors'
import { ScrollArea } from '@@/shared/ui/scroll-area'
import { createSentenceFromCamelCase } from '@payload/lexical/features/fontColorFeature/utils/createSentenceFromCamelCase'
import { ColorSpectrum } from '../ColorPicker'


type Props = {
  onApplyStyles: (color: string) => void
  colorSpectrum: ColorSpectrum
}

export const ThemeColors = ({ onApplyStyles, colorSpectrum }: Props) => {
  return (
    <ScrollArea className="h-[300px] overflow-auto">
      <div className="flex flex-col gap-2">
        {Object.entries(appTheme).map(([key, variable]) => {
          return (
            <ThemeColorButton
              variableName={key}
              key={key}
              onApplyStyles={onApplyStyles}
              variable={variable}
            />
          )
        })}
      </div>
    </ScrollArea>
  )
}

type BtnProps = {
  variableName: string
  variable: string
  onApplyStyles: (color: string) => void
}

const ThemeColorButton = ({ variableName, variable, onApplyStyles }: BtnProps) => {
  const colorRef = useRef(null)
  const [backgroundColor, setBackgroundColor] = React.useState(null)

  useEffect(() => {
    if (colorRef.current) {
      const computedStyle = getComputedStyle(colorRef.current)
      setBackgroundColor(computedStyle.backgroundColor)
    }
  }, [])

  return (
    <button
      key={variableName}
      onClick={() => onApplyStyles(`hsl(var(${variable}))`)}
      className="border-none outiline-none flex gap-2 items-center cursor-pointer p-1 rounded-md bg-[var(--theme-elevation-0)] hover:bg-[var(--theme-elevation-50)]"
    >
      <div className='flex items-center w-full gap-2'>
        <div
          style={{ backgroundColor: `hsl(var(${variable}))` }}
          ref={colorRef}
          className={`h-9 w-9 rounded-full border-white border-[1px] border-solid`}
        ></div>
        <div className="leading-none">{createSentenceFromCamelCase(variableName, 15)}</div>
      </div>
      <div className="leading-none whitespace-nowrap bg-[var(--theme-elevation-150)] mr-2 p-2 rounded-sm">{backgroundColor}</div>
    </button>
  )
}
