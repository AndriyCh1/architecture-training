import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react'
import { createClassName } from '#libraries/dom/createClassName'
import { createNameSpace } from '#libraries/dom/createNameSpace'
import { usePrevious } from '#components/hooks/usePrevious'
import type { InputRefs, InputProps } from './types'
import './styles.sass'

// NOTE: How is input changes? onChange is not called ---- it is changed on new value passing
export const Input = forwardRef<InputRefs, InputProps>(
  ({ native = {} }, ref) => {
    const { disabled, value } = native

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inputValue, setInputValue] = useState<string>(
      value ? String(value) : '', // NOTE: 2 -- unnecessary? step 3 already sets it
    )

    const previousValue = usePrevious(value) // NOTE: Check what is it

    useImperativeHandle(ref, () => ({ inputRef, setValue: setInputValue })) // NOTE: Why do we put setValue here? What does it bring us?

    useEffect(() => {
      if (
        typeof previousValue !== 'undefined' &&
        previousValue !== value &&
        String(inputValue).trim() !== String(value).trim()
      ) {
        setInputValue(String(value)) // NOTE: 3
      }
    }, [value, previousValue, inputValue]) // NOTE: Is it necessary to listen inputValue?

    // NOTE: Since input is interactive natively, do we need to set aria-disabled?
    const ariaDisabled =
      typeof native['aria-disabled'] !== 'undefined'
        ? native['aria-disabled']
        : disabled

    const isEmpty = inputValue.trim().length < 1

    return (
      <input
        {...native}
        ref={inputRef}
        type='text'
        autoComplete={native.autoComplete || 'off'}
        aria-disabled={ariaDisabled}
        className={createClassName([
          // NOTE: Check how it works
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
// NOTE: Check how it works
const ns = createNameSpace(Object.keys({ Input })[0])
