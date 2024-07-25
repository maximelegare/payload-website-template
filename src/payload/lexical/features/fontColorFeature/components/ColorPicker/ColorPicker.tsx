'use client'

import '@app/(frontend)/[locale]/css/theme.scss'
import { HexColorPickerView } from './views/HexColorPicker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@@/shared/ui/tabs-list'
import { ThemeColors } from './views/ThemeColors'
import { HSLColorPickerView } from './views/HSLColorPicker'
import { Button } from '@payloadcms/ui'
import { ColorPickerView } from './views/ColorPickerView'
import { useState } from 'react'
import { RadioGroupItem, RadioGroup } from '@@/shared/ui/radio-group'
import { Label } from '@@/shared/ui/label'

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
  const [view, setView] = useState('theme')

  return (
    <div className="flex">
      <Tabs
        onValueChange={(value) => setView(value)}
        defaultValue="theme"
        className="h-[350px] w-[310px]"
      >
        <TabsList className="gap-1 mb-2">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <ThemeColors onApplyStyles={onFontColorChange} />
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
