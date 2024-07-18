import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
} from 'react'
import { CheckboxProps, CheckboxRefs } from './types'
import './styles.sass'

export const Checkbox = forwardRef<CheckboxRefs, CheckboxProps>(
  ({ native = {}, icon }, ref) => {
    const { checked, disabled = false, onChange, ...restNativeProps } = native
    const nativeCheckboxRef = useRef<HTMLInputElement | null>(null)
    const [isChecked, setIsChecked] = useState(checked ?? false)

    useImperativeHandle(ref, () => ({
      checkboxRef: nativeCheckboxRef,
    }))

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !disabled) {
        setIsChecked(prev => !prev)
      }
    }

    const handleCheckboxClick = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (nativeCheckboxRef.current && !disabled) {
        nativeCheckboxRef.current.click()
      }
    }

    const handleNativeCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(prev => !prev)
      onChange?.(e)
    }

    return (
      <>
        <div
          aria-hidden={true}
          className={createClassName([
            ns.root(),
            disabled ? ns.child('disabled').value() : '',
            disabled ? 'disabled' : '',
            native.className || '',
          ])}
          style={native.style}
          onClick={handleCheckboxClick}
          tabIndex={0}
          onKeyUp={handleKeyPress}
        >
          {isChecked && icon ? icon : null}
          {isChecked && !icon ? (
            <span
              aria-hidden={true}
              className={createClassName([
                ns.child('content').value(),
                isChecked ? ns.child('checked').value() : '',
              ])}
            >
              ✓
            </span>
          ) : null}
        </div>
        <input
          {...restNativeProps}
          ref={nativeCheckboxRef}
          type='checkbox'
          style={{ display: 'none' }}
          checked={isChecked}
          disabled={disabled}
          onChange={handleNativeCheckboxChange}
        />
      </>
    )
  },
)

const ns = createNameSpace(Object.keys({ Checkbox })[0])
