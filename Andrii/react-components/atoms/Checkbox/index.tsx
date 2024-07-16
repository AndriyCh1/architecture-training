import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type { CheckboxProps, CheckboxRefs } from './types'
import './styles.sass'

export const Checkbox = forwardRef<CheckboxRefs, CheckboxProps>(
  ({ native = {} }, ref) => {
    const { checked, disabled = false } = native

    const checkboxRef = useRef<HTMLInputElement | null>(null)
    const [isChecked, setIsChecked] = useState(checked ?? false)

    useImperativeHandle(ref, () => ({
      checkboxRef,
      setIsChecked,
    }))

    useEffect(() => {
      if (checked !== undefined && checked !== isChecked) {
        setIsChecked(checked)
      }
    }, [checked, isChecked])

    return (
      <input
        {...native}
        ref={checkboxRef}
        type='checkbox'
        checked={isChecked}
        disabled={disabled}
        className={createClassName([
          ns.root(),
          disabled ? ns.child('disabled').value() : '',
          disabled ? 'disabled' : '',
          native.className || '',
        ])}
      />
    )
  },
)

const ns = createNameSpace(Object.keys({ Checkbox })[0])
