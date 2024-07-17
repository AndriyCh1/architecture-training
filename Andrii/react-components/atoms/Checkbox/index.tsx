import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  MouseEvent,
} from 'react'
import { CheckboxProps, CheckboxRefs } from './types'
import './styles.sass'

export const Checkbox = forwardRef<CheckboxRefs, CheckboxProps>(
  ({ native = {}, checked, disabled, onChange }, ref) => {
    const checkboxRef = useRef<HTMLDivElement | null>(null)
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

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      setIsChecked(!isChecked)
      onChange?.(e)
    }

    return (
      <div
        role='checkbox'
        ref={checkboxRef}
        aria-checked={isChecked}
        aria-disabled={disabled}
        onClick={handleOnClick}
        className={createClassName([
          ns.root(),
          disabled ? ns.child('disabled').value() : '',
          disabled ? 'disabled' : '',
          native.className || '',
        ])}
      >
        <span
          aria-hidden={true}
          className={createClassName([
            ns.child('content').value(),
            isChecked ? ns.child('checked').value() : '',
          ])}
        >
          {isChecked ? '✓' : ''}
        </span>
      </div>
    )
  },
)

const ns = createNameSpace(Object.keys({ Checkbox })[0])
