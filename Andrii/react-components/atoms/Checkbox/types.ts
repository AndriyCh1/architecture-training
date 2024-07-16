import { InputHTMLAttributes, MutableRefObject } from 'react'

export type CheckboxProps = {
  native?: InputHTMLAttributes<HTMLInputElement>
}

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLInputElement | null>
}
