'use client'

import '@app/(frontend)/[locale]/css/theme.scss'
import { HexColorPickerView } from './views/HexColorPicker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@@/shared/ui/tabs-list'
import { ThemeColors } from './views/ThemeColors'
import { HSLColorPickerView } from './views/HSLColorPicker'
import { Button } from '@payloadcms/ui'

type DropdownColorPickerProps = {
  fontColor: string
  onFontColorChange: (color: string) => void
  onApplyStyles: () => void
}

export const ColorPickerWrapper = ({
  fontColor,
  onFontColorChange,
  onApplyStyles,
}: DropdownColorPickerProps) => {
  return (
    <Tabs defaultValue="theme" className="h-[260px] w-[400px]">
      <TabsList className="gap-1 mb-2">
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
      </TabsList>
      <TabsContent value="theme">
        <ThemeColors onApplyStyles={onFontColorChange} />
      </TabsContent>
      <TabsContent value="color-picker">
        <HexColorPickerView
          onApplyStyles={onApplyStyles}
          fontColor={fontColor}
          onFontColorChange={onFontColorChange}
        />
      </TabsContent>
      {/* <TabsContent value="rgb">RGB</TabsContent>
      <TabsContent value="hsl">
        <HSLColorPickerView
          onApplyStyles={onApplyStyles}
          fontColor={fontColor}
          onFontColorChange={onFontColorChange}
        />
      </TabsContent> */}
    </Tabs>
  )
}
