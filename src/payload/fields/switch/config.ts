import deepMerge from '@payload/utilities/deepMerge'
import { Field } from 'payload'
import { InputField } from './InputField'

type SwitchType = (options: { label: string; overrides?: Partial<Field> }) => Field

const switchField: SwitchType = ({ label, overrides = {} }) => {
  const toggleField: Field = {
    name: 'test',
    label: label,
    type: 'checkbox',
    admin: {
      components: {
        Field: InputField,
      },
    },
  }
  return deepMerge(toggleField, overrides)
}

export default switchField
