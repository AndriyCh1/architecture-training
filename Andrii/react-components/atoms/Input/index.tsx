import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react'
import { createClassName } from '#libraries/dom/createClassName'
import { createNameSpace } from '#libraries/dom/createNameSpace'
import { InputRefs, InputProps } from './types'
import './styles.sass'

export const Input = forwardRef<InputRefs, InputProps>(
  ({ native = {} }, ref) => {
    const { disabled = false, value } = native

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inputValue, setInputValue] = useState('')

    useImperativeHandle(ref, () => ({ inputRef, setValue: setInputValue }))

    useEffect(() => {
      if (
        typeof previousValue !== 'undefined' &&
        previousValue !== value &&
        String(inputValue).trim() !== String(value).trim()
      ) {
        setInputValue(String(value))
      }
    }, [value, previousValue, inputValue])

    const isEmpty = inputValue.trim().length < 1

    return (
      <input
        {...native}
        ref={inputRef}
        type='text'
        autoComplete={native.autoComplete || 'off'}
        className={createClassName([
          ns.root(),
          disabled ? ns.child('disabled').value() : '',
          disabled ? 'disabled' : '',
          isEmpty ? ns.child('empty').value() : '',
          native.className || '',
        ])}
        value={inputValue}
      />
    )
  },
)

const ns = createNameSpace(Object.keys({ Input })[0])
