import { useState } from "react";

export interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  description?: string;
  isStatic?: boolean;
  onClose: () => void;
  open: boolean;
  title?: string;
  xButton?: boolean;
  variant?: "success" | "error";
}
export const useModal = <T = any>(
  initialProps?: Omit<T, "open" | "onClose" | "children"> & { open?: boolean }
): [T, (props?: Partial<T>) => void, () => void] => {
  const [modalState, setModalState] = useState<T | ModalProps | any>({
    open: false,
    ...initialProps,
  });

  const hide = () => {
    setModalState((prev: any) => ({ ...prev, open: false }));
  };

  const show = (props: Partial<T> | any = {}) => {
    setModalState((prev: any) => ({ ...prev, ...props, open: true }));
  };

  return [
    {
      onClose: () => {
        hide();
      },
      ...modalState,
    },
    show,
    hide,
  ];
};
