import { Admin } from '@payload/types/payload-core-types'
import { FieldBase } from 'payload'

export type SwicthField = FieldBase & {
  type: 'checkbox'
  admin?: Admin & {
    placeholder?: Record<string, string> | string
    autoComplete?: string
  }
}
