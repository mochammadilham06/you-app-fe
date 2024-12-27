import {
  ComponentPropsWithRef,
  ReactNode,
  useMemo,
  useState,
  ChangeEvent,
} from "react";
import {
  RiCheckFill,
  RiErrorWarningFill,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import classNames from "classnames";

import FormWrapper, { IFormBase } from "../form-wrapper";
import { IconType } from "react-icons";

export interface InputProps extends ComponentPropsWithRef<"input">, IFormBase {
  type?:
    | "text"
    | "password"
    | "date"
    | "time"
    | "number"
    | "email"
    | "multiple"
    | "integerOnly";
  icon?: ReactNode;
  blur?: boolean;
  IconLeft?: IconType;
  customIconLeft?: ReactNode;
  rtl?: boolean;
}

export function Input({
  blur,
  className = "",
  customIconLeft,
  desc,
  icon,
  IconLeft,
  id,
  label,
  onChange,
  required,
  type = "text",
  variant = "normal",
  wrapperProps = {},
  rtl,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const variantClasses = useMemo(() => {
    switch (variant) {
      case "danger":
        return ["border", "border-red-600"];
      default:
        return [
          "border-none",
          "shadow-md",
          "hover:border-blue-700",
          "focus:border-blue-700",
        ];
    }
  }, [variant]);

  const Icon = useMemo(() => {
    const baseClass = [
      "absolute",
      "text-base",
      "right-2",
      "top-1/2",
      "-translate-y-1/2",
    ];

    if (type === "password" || blur) {
      const PasswordIcon = showPassword ? RiEyeOffLine : RiEyeLine;
      return (
        <button
          type="button"
          className={classNames("text-neutral-50", ...baseClass)}
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          <PasswordIcon />
        </button>
      );
    }

    switch (variant) {
      case "success":
        return (
          <RiCheckFill className={classNames("text-green-700", ...baseClass)} />
        );
      case "danger":
        return (
          <RiErrorWarningFill
            className={classNames("text-red-600", ...baseClass)}
          />
        );
    }

    if (icon) {
      return icon;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon, showPassword, type, variant]);

  const IconLeftComponent = useMemo(() => {
    if (!IconLeft) return null;
    const baseClass = [
      "absolute",
      "text-base",
      "left-2",
      "top-1/2",
      "-translate-y-1/2",
    ];
    return <IconLeft className={classNames(...baseClass)} />;
  }, [IconLeft]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === "integerOnly") {
      const newChange = { ...event };
      newChange.target.value = newChange.target.value.replace(/\D/g, "");
      //@ts-ignore
      return onChange(newChange);
    }
    // @ts-ignore
    return onChange(event);
  };

  const handleType = (
    type: string,
    show: boolean,
    blur: boolean | undefined
  ) => {
    let typeInput = type;
    if (show && type !== "integerOnly") return "text";
    if (show && blur) return "integerOnly";
    if (!show && blur) return "password";
    return typeInput;
  };

  return (
    <FormWrapper
      desc={desc}
      id={id}
      label={label}
      required={required}
      variant={variant}
      {...wrapperProps}
    >
      {customIconLeft || IconLeftComponent}
      <input
        id={id}
        type={handleType(type, showPassword, blur)}
        onChange={handleChange}
        className={classNames(
          "form-input focus:ring-1 block h-14 w-full rounded-lg px-2 text-sm shadow-sm transition-all placeholder:text-white placeholder:opacity-40 focus:outline-0 focus:ring-white focus:ring-opacity-50 pr-8 bg-[#FFFFFF0F]",
          props.disabled ? "cursor-not-allowed opacity-[30%]" : "",
          rtl ? "text-right" : "",
          ...variantClasses,
          className
        )}
        required={required}
        {...props}
      />
      {Icon}
    </FormWrapper>
  );
}

export default Input;
