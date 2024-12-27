import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FC, ReactNode, Fragment } from "react";
interface PopoverProps {
  items: Array<ReactNode>;
}
const PopoverComponent: FC<PopoverProps> = ({ items }) => {
  return (
    <Popover className="group">
      <PopoverButton className="flex items-center gap-2">
        <HiDotsHorizontal className="size-5 group-data-[open]:rotate-180" />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col bg-white p-4 rounded-lg shadow-md"
      >
        {items?.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </PopoverPanel>
    </Popover>
  );
};

export default PopoverComponent;
