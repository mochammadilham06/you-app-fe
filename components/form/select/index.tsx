import classNames from "classnames";
import React, { ComponentPropsWithoutRef, FC, ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface OptionSelect {
  options: Option[];
  onChange: (selected: Option | null) => void;
  rtl?: boolean;
}

export interface SelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "onChange">,
    OptionSelect {}

const Select: FC<SelectProps> = ({
  options,
  onChange,
  className,
  disabled,
  rtl,
  ...rest
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selected = options.find((option) => option?.value === value) || null;
    onChange(selected);
  };

  return (
    <select
      className={classNames(
        `form-select w-full rounded-lg h-14 text-sm placeholder:text-white text-gray-400 bg-[#FFFFFF0F] border-none focus:outline-none focus:ring-1 focus:ring-white`,
        disabled && "cursor-not-allowed",
        rtl ? "text-right" : "px-5",
        className
      )}
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    >
      <option value="" disabled className="text-black">
        Please select
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-black">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
