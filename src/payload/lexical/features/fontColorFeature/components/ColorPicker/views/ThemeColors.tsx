import React from 'react'

import appTheme from '@app/(frontend)/[locale]/css/colors'
import { ScrollArea } from '@@/shared/ui/scroll-area'

type Props = {
  onColorClick: (color: string) => void
}

export const ThemeColors = ({ onColorClick }: Props) => {
  return (
    <ScrollArea className="h-[320px] overflow-auto">
      <div className="flex flex-col gap-2">
        {Object.entries(appTheme).map(([color, variable]) => {
          return (
            <button
              key={color}
              onClick={() => onColorClick(`hsl(var(${variable}))`)}
              className="border-none outiline-none flex gap-2 items-center cursor-pointer p-1 rounded-md bg-[var(--theme-elevation-0)] hover:bg-[var(--theme-elevation-50)]"
            >
              <div
                style={{ backgroundColor: `hsl(var(${variable}))` }}
                className={`h-9 w-9 rounded-full border-white border-[1px] border-solid`}
              ></div>
              <div className="leading-none">{color}</div>
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}
{
  /* <>
  {Object.entries(appColors).map(([color, variable]) => {
    return (
      <div
        key={color}
        style={{ backgroundColor: `hsl(var(${variable}))` }}
        className={`h-8 w-8 border-white border-[1px] border-solid`}
      ></div>
    )
  })}
</> */
}
