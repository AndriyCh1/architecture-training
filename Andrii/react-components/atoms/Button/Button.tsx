import { ButtonHTMLAttributes } from "react";

import css from "./Button.module.css";

export type IVariantType = "primary" | "secondary";

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IVariantType;
}

const variantToClassMap: Record<IVariantType, string> = {
  primary: css.primaryButton,
  secondary: css.secondaryButton,
};

export const Button: React.FC<IProps> = (props) => {
  const { children, className, variant = "primary", ...attributes } = props;

  const buttonAttributes = {
    ...attributes,
    className: [variantToClassMap[variant], className].join(" "),
  };

  return <button {...buttonAttributes}>{children}</button>;
};