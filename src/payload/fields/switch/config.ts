import deepMerge from '@payload/utilities/deepMerge'
import { Field } from 'payload'
import { InputField } from './InputField'

type SwitchType = (options: { name: string; label: string; overrides?: Partial<Field> }) => Field

const switchField: SwitchType = ({ name, label, overrides = {} }) => {
  const toggleField: Field = {
    name: name,
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
