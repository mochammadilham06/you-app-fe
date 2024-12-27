import classNames from "classnames";
import { BiLoaderCircle } from "react-icons/bi";

const variantStyle = new Map<any, string>([
  [
    "overlay",
    "flex justify-center fixed top-0 left-0 w-full h-full items-center bg-black/50 z-50 pb-16",
  ],
  ["vanilla", ""],
]);

const sizeStyles = new Map<any, any>([
  ["xs", { text: "text-3xl", icon: "text-sm" }],
  ["sm", { text: "text-4xl", icon: "text-md" }],
  ["md", { text: "text-6xl", icon: "text-xl" }],
  ["lg", { text: "text-8xl", icon: "text-2xl" }],
]);

export interface LoadingOverlayProps {
  className?: string;
  iconClassName?: string;
  isShow?: boolean;
  label?: string;
  labelClassName?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "overlay" | "vanilla";
}

export function LoadingOverlay({
  className,
  iconClassName,
  isShow = true,
  label = "Loading...",
  labelClassName,
  size = "lg",
  variant = "overlay",
}: LoadingOverlayProps) {
  const sizeStyle = sizeStyles.get(size);

  return (
    <div
      className={classNames(
        variantStyle.get(variant),
        className,
        !isShow ? "hidden" : ""
      )}
    >
      <div
        className={`flex-col items-center justify-center flex text-gray-400`}
      >
        <BiLoaderCircle
          className={classNames(
            sizeStyle.text,
            "m-0 animate-spin p-0",
            iconClassName
          )}
        />
        {label && (
          <span className={classNames(sizeStyle.icon, labelClassName)}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export default LoadingOverlay;
