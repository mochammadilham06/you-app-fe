import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ModalProps } from "@youapp/hooks/use-modal";
import classNames from "classnames";
import React, { FC } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Button from "../button";

const Modal: FC<ModalProps> = ({
  onClose,
  children,
  description,
  className,
  isStatic,
  title,
  xButton,
  open,
  variant,
}) => {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        onClose={onClose}
        className={classNames(
          "fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out",
          className
        )}
        static={isStatic}
      >
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPanel className="max-w-lg space-y-4 bg-white w-full p-8 rounded-xl text-center relative">
            {/* Icon Section */}
            {variant && (
              <div className="flex justify-center mb-4">
                <div
                  className={classNames(
                    "flex items-center justify-center h-20 w-20 rounded-full",
                    {
                      "bg-green-100": variant === "success",
                      "bg-red-100": variant === "error",
                    }
                  )}
                >
                  {variant === "success" ? (
                    <FaCheck className="h-10 w-10 text-green-500" />
                  ) : (
                    <RxCross1 className="h-10 w-10 text-red-500" />
                  )}
                </div>
              </div>
            )}

            {/* Title Section */}
            {title && (
              <DialogTitle className="font-bold text-black text-xl">
                {title}
              </DialogTitle>
            )}
            {description && (
              <Description className="text-black">{description}</Description>
            )}

            <Button
              variant={"secondary"}
              className={"w-full"}
              onClick={onClose}
              value={"Close"}
              size={"lg"}
            />

            <div>{children}</div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export { Modal };
