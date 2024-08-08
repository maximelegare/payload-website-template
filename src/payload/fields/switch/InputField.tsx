'use client'

import { Switch } from '@@/shared/ui/switch'

import { useField, FieldLabel } from '@payloadcms/ui'
import { SwicthField } from './types'

export type Props = Omit<SwicthField, 'type'> & {
  path?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
}

export const InputField: React.FC<Props> = (props) => {
  const { path, label, validate } = props

  const { value = false, setValue } = useField<boolean>({
    path,
    validate,
  })

  return (
    <div>
      <FieldLabel htmlFor={path} label={label as string | Record<string, string>} />
      <Switch onChange={setValue} checked={value} />
    </div>
  )
}
