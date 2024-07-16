import { ChangeEvent, FC, useEffect, useState } from 'react'
import css from './index.module.css'
import { IInputProps } from './types'
import { createClassName } from '../../helpers/createClassName'

export const Input: FC<IInputProps> = props => {
  const { className, onChange, value, ...restProps } = props
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  return (
    <input
      {...restProps}
      type='text'
      className={createClassName([css.input, className ?? ''])}
      value={inputValue}
      onChange={handleOnInputChange}
    />
  )
}
