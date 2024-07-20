import { InputHTMLAttributes, ReactNode, MutableRefObject } from 'react';

export type CheckboxProps = {
  checkIcon?: ReactNode;
  uncheckIcon?: ReactNode;
  native?: InputHTMLAttributes<HTMLInputElement>;
};

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLInputElement | null>;
  setChecked: (isChecked: boolean) => void;
  setFocused: (isFocused: boolean) => void;
};
