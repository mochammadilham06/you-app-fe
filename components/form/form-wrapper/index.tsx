import classNames from "classnames";
import { ComponentPropsWithoutRef, ReactElement } from "react";
export interface IFormWrapperProps {
  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}
export interface IFormBase extends IFormWrapperProps {
  label?: string | ReactElement;
  desc?: string;
  variant?: "normal" | "success" | "danger";
}
export interface FormWrapperProps
  extends ComponentPropsWithoutRef<"div">,
    Omit<IFormBase, "wrapperProps"> {
  isClassNameEmpty?: boolean;
  required?: boolean;
}

export function FormWrapper({
  children,
  className = "",
  desc,
  id,
  isClassNameEmpty = false,
  label,
  required = false,
  variant = "normal",
  ...props
}: FormWrapperProps) {
  const variants: Record<typeof variant, string> = {
    normal: "text-neutral-300",
    success: "text-green-600",
    danger: "text-red-600",
  };

  return (
    <div
      id={id}
      className={
        isClassNameEmpty
          ? "w-1/2 "
          : classNames("relative inline-block w-full", className)
      }
      {...props}
    >
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            "mb-1 text-xs font-medium text-neutral-200",
            required ? "after:ml-1 after:text-red-600 after:content-['*']" : ""
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">{children}</div>
      {desc && (
        <p className={classNames("mt-1 px-2 text-xxs", variants[variant])}>
          {desc}
        </p>
      )}
    </div>
  );
}

export default FormWrapper;
