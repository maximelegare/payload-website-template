import { ColorTranslator, HSLObject, RGBObject } from 'colortranslator'
import { checkValidColor } from './checkValidColor'

export function translateColor(
  color: string | HSLObject,
  translateTo: 'HEX' | 'HSLstring' | 'RGBstring',
): string | undefined
export function translateColor(
  color: string,
  translateTo: 'RGB',
): { R: number; G: number; B: number } | undefined
export function translateColor(
  color: string,
  translateTo: 'HSL',
): { H: number; S: number; L: number } | undefined

// Implement the function
export function translateColor(
  color: string | HSLObject,
  translateTo: 'HEX' | 'RGB' | 'HSL' | 'RGBstring' | 'HSLstring',
): string | { R: number; G: number; B: number } | { H: number; S: number; L: number } {
  let __color: string

  if (typeof color === 'string') {
    __color = color
  }

  if (
    typeof color === 'object' &&
    color.H !== undefined &&
    color.S !== undefined &&
    color.L !== undefined
  ) {
    __color = `hsl(${color.H}, ${color.S}%, ${color.L}%)`
  }

  const isValid = checkValidColor(__color)

  switch (translateTo) {
    case 'HEX':
      return isValid ? ColorTranslator.toHEX(color) : '#000000'
    case 'RGB':
      return isValid ? new ColorTranslator(color).RGBObject : { R: 0, G: 0, B: 0 }
    case 'HSL':
      return isValid ? new ColorTranslator(color).HSLObject : { H: 0, S: 0, L: 0 }
    case 'HSLstring':
      return isValid ? new ColorTranslator(color).HSL : 'hsl(0, 0%, 0%)'
    case 'RGBstring':
      return isValid ? new ColorTranslator(color).RGB : 'rgb(0, 0, 0)'
  }
}
