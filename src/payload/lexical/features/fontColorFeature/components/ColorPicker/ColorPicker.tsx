'use client'

import '@app/(frontend)/[locale]/css/theme.scss'

import { useState } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection } from 'lexical'

import { $patchStyleText } from '@lexical/selection'
import { HexColorPickerView } from './views/HexColorPIcker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@@/shared/ui/tabs-list'
import { ThemeColors } from './views/ThemeColors'
import { HSLColorPickerView } from './views/HSLColorPicker'

type DropdownColorPickerProps = {
  fontColor: string
  onFontColorChange: (color: string) => void
}

export const ColorPickerWrapper = ({ fontColor, onFontColorChange }: DropdownColorPickerProps) => {
  const [editor] = useLexicalComposerContext()
  const applyStyleText = (styles: Record<string, string>) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles)
      }
    })
  }

  const onFontColorSelect = (value: string) => {
    onFontColorChange(value)
    applyStyleText({ color: value })
  }
  return (
    <Tabs defaultValue="theme" className="h-[380px] w-[200px]">
      <TabsList className="gap-1 mb-2">
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="hex">HEX</TabsTrigger>
        <TabsTrigger value="rgb">RGB</TabsTrigger>
        <TabsTrigger value="hsl">HSL</TabsTrigger>
      </TabsList>
      <TabsContent value="hex">
        <HexColorPickerView fontColor={fontColor} onFontColorChange={onFontColorSelect} />
      </TabsContent>
      <TabsContent value="theme">
        <ThemeColors onColorClick={onFontColorSelect} />
      </TabsContent>
      <TabsContent value="rgb">RGB</TabsContent>
      <TabsContent value="hsl">
        <HSLColorPickerView fontColor={fontColor} onFontColorChange={onFontColorChange} />
      </TabsContent>
    </Tabs>
  )
}
