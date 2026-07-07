"use client";

import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
import FloatButton, {
  type FloatButtonProps,
} from "@/src/components/common/FloatButton";

interface DiaryWriteFloatButtonProps
  extends Omit<FloatButtonProps, "icon" | "label" | "tooltip"> {
  label?: string;
  onWrite?: () => void;
  tooltip?: FloatButtonProps["tooltip"];
}

export function DiaryWriteFloatButton({
  label = "일기 작성",
  onWrite,
  tooltip = "일기 작성하기",
  ...props
}: DiaryWriteFloatButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onWrite) {
      onWrite();
      return;
    }

    router.push("/#diary-content");
  };

  return (
    <FloatButton
      {...props}
      icon={<FaPen />}
      label={label}
      onClick={handleClick}
      tooltip={tooltip}
    />
  );
}

export default DiaryWriteFloatButton;
