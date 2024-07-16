import { FC } from 'react'
import { IButtonProps } from './types'
import { createClassName } from '../../helpers/createClassName'
import css from './index.module.css'

export const Button: FC<IButtonProps> = props => {
  const { children, className, ...restProps } = props

  return (
    <button
      {...restProps}
      className={createClassName([css.button, className ?? ''])}
    >
      {children}
    </button>
  )
}
