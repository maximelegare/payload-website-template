import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'


export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return (
    fields?.reduce<{ [key: string]: any } | undefined>((initialSchema, field) => {
      if (field.blockType === 'checkbox') {
        return {
          ...initialSchema,
          [field.name]: false,
        }
      }
      if (field.blockType === 'country') {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }
      if (field.blockType === 'email') {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }
      if (field.blockType === 'text') {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }
      if (field.blockType === 'select') {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }
      if (field.blockType === 'state') {
        return {
          ...initialSchema,
          [field.name]: '',
        }
      }
    }, {}) ?? {}
  )
}
