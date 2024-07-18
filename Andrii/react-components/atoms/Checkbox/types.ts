import { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react'

export type CheckboxProps = {
  native?: InputHTMLAttributes<HTMLInputElement>
  icon?: ReactNode
}

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLInputElement | null>
}
