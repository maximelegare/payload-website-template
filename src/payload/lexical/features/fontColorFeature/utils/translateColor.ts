import { ColorTranslator } from 'colortranslator'

export function translateColor(
  color: string| Object,
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
  color: string,
  translateTo: 'HEX' | 'RGB' | 'HSL' | 'RGBstring' | 'HSLstring',
): string | { R: number; G: number; B: number } | { H: number; S: number; L: number } | undefined {
  if (color === '') return

  switch (translateTo) {
    case 'HEX':
      return ColorTranslator.toHEX(color)
    case 'RGB':
      return new ColorTranslator(color).RGBObject
    case 'HSL':
      return new ColorTranslator(color).HSLObject
    case 'HSLstring':
      return new ColorTranslator(color).HSL
    case 'RGBstring':
      return new ColorTranslator(color).RGB
  }
}
