import { Fragment, forwardRef, useMemo } from "react";
import { RiLoader2Fill } from "react-icons/ri";
import { getVariantClasses } from "./helper";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon?: any;
  IconRight?: any;
  isLoading?: boolean | null;
  size?: "sm" | "md" | "lg" | "custom";
  variant?: "link" | "primary" | "secondary" | "link-primary";
  as?: "back" | "normal";
  value?: string;
  path?: string;
  customSize?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      Icon,
      IconRight,
      isLoading = false,
      size = "lg",
      title = "",
      value,
      variant = "ghost",
      as = "normal",
      path,
      customSize,
      ...props
    },
    ref
  ) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const variantClasses = useMemo(getVariantClasses(variant), [variant]);
    const router = useRouter();

    const sizeClasses = useMemo(() => {
      switch (size) {
        case "lg":
          return ["h-12", "text-base", "px-6"];
        case "md":
          return ["h-8", "text-sm", "px-3"];
        case "custom":
          return [customSize];
        default:
          return ["h-6", "text-[0.8125rem]", "px-2"];
      }
    }, [size]);

    let newChildren = children;
    if (value) newChildren = value;
    const newTitle = title;

    const isIconWasDefined = Icon || IconRight;

    const getVariantBack = useMemo(getVariantClasses("link"), [path]);

    return (
      <Fragment>
        {as === "back" && (
          <button
            className={[
              "disabled:cursor-not-allowed",
              "font-bold",
              "inline-flex",
              "items-center",
              "justify-center",
              "rounded-lg",
              "transition-all",
              "whitespace-nowrap",
              ...sizeClasses,
              ...getVariantBack,
              className,
            ]
              .join(" ")
              .trim()}
            ref={ref}
            title={newTitle}
            onClick={() => router.push(path as string)}
            {...props}
          >
            <>
              <div
                className={[
                  `${
                    size === "lg"
                      ? "text-2xl"
                      : size === "md"
                      ? "text-xl"
                      : "text-base"
                  }`,
                  "mr-2",
                  "only:mr-0",
                ].join(" ")}
              >
                <IoIosArrowBack className="size-5" id="icon" />
              </div>
              <span>Back</span>
            </>
          </button>
        )}
        {as === "normal" && (
          <button
            className={[
              "disabled:cursor-not-allowed",
              "focus:ring-1",
              "focus:ring-offset-1",
              "font-medium",
              "inline-flex",
              "items-center",
              "justify-center",
              "rounded-lg",
              "transition-all",
              // "whitespace-nowrap",
              isLoading ? "pointer-events-none" : "",
              ...sizeClasses,
              ...variantClasses,
              className,
            ]
              .join(" ")
              .trim()}
            ref={ref}
            title={newTitle}
            {...props}
          >
            {isLoading ? (
              <RiLoader2Fill
                id="btnLoading"
                className={[
                  size === "lg"
                    ? "text-2xl"
                    : size === "md"
                    ? "text-xl"
                    : "text-base",
                  "animate-spin",
                ]
                  .join(" ")
                  .trim()}
              />
            ) : (
              <>
                {Icon && (
                  <div
                    className={[
                      `${
                        size === "lg"
                          ? "text-2xl"
                          : size === "md"
                          ? "text-xl"
                          : "text-base"
                      }`,
                      "mr-2",
                      "only:mr-0",
                    ].join(" ")}
                  >
                    <Icon className="size-5" id="icon" />
                  </div>
                )}
                {!isIconWasDefined && newChildren && <span>{newChildren}</span>}
                {IconRight && (
                  <IconRight
                    id="iconRight"
                    className={[
                      `${
                        size === "lg"
                          ? "text-base"
                          : size === "md"
                          ? "text-sm"
                          : "text-xs"
                      }`,
                      "ml-2",
                      "only:ml-0",
                    ].join(" ")}
                  />
                )}
              </>
            )}
          </button>
        )}
      </Fragment>
    );
  }
);

Button.displayName = "Button";

export default Button;
