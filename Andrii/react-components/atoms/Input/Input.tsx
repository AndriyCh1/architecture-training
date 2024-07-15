import { ChangeEvent, FC, useEffect, useState } from "react";

import css from "./Input.module.css";

export interface IProps {
  className?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<IProps> = (props) => {
  const { label, className, onChange, ...attributes } = props;

  const [value, setValue] = useState("");

  const inputAttributes = {
    ...attributes,
    className: [className, css.input].join(" "),
  };

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {label && <label className={css.label}>{label}</label>}
      <input {...inputAttributes} onChange={handleOnChange} value={value} />
    </div>
  );
};