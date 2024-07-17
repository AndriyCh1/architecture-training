import { HTMLAttributes, MouseEvent, MutableRefObject } from "react";

export type CheckboxProps = {
  native?: HTMLAttributes<HTMLDivElement>;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: MouseEvent<HTMLDivElement>) => void;
};

export type CheckboxRefs = {
  checkboxRef: MutableRefObject<HTMLDivElement | null>;
};
