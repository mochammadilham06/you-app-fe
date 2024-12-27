import { useRouter } from "next/navigation";
import Button from "../button";

interface HeaderProps {
  title?: string;
  onClickBack?: () => void;
  onCustomAction?: React.ReactNode;
}

export default function Header({
  title = "",
  onCustomAction,
  onClickBack,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-between mb-6">
      <Button
        onClick={() => {
          onClickBack ? onClickBack() : router.back();
        }}
        variant="link"
        size="lg"
        className="-ml-5"
        as="back"
      />

      {title && (
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-white">
          {title}
        </h2>
      )}

      {onCustomAction ? onCustomAction : <div className="w-8 h-8" />}
    </div>
  );
}
