'use client'

import '@app/(frontend)/[locale]/css/theme.scss'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@@/shared/ui/tabs-list'
import { ThemeColors } from './views/ThemeColors'
import { ColorPickerView } from './views/ColorPickerView'
import { useState } from 'react'

type DropdownColorPickerProps = {
  fontColor: string
  onFontColorChange: (color: string) => void
  onApplyStyles: () => void
}

export type ColorSpectrum = 'hex' | 'hsl' | 'rgb'

export const ColorPickerWrapper = ({
  fontColor,
  onFontColorChange,
  onApplyStyles,
}: DropdownColorPickerProps) => {
  const [colorSpectrum, setColorSpectrum] = useState<ColorSpectrum>('hex')

  return (
    <div className="flex">
      <Tabs defaultValue="theme" className="h-[350px] w-[310px]">
        <TabsList className="gap-1 mb-2">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <ThemeColors
            colorSpectrum={colorSpectrum}
            onColorSpectrumChange={setColorSpectrum}
            onApplyStyles={onFontColorChange}
          />
        </TabsContent>
        <TabsContent value="color-picker">
          <ColorPickerView
            onApplyStyles={onApplyStyles}
            fontColor={fontColor}
            onFontColorChange={onFontColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
