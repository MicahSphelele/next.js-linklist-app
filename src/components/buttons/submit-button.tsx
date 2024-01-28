"use client";

import RightLongArrow from "@/components/icons/right-long-arrow";

type SubmitButtonProps = {
  title: string;
  showArrowIcon?: boolean;
};

const SubmitButton = ({ title, showArrowIcon = true }: SubmitButtonProps) => {
  return (
    <button
      className="bg-blue-500 disabled:bg-blue-200 text-white disabled:text-gray-200 py-4 px-4 block mx-auto w-full"
      type="submit"
    >
      <div className="mx-auto flex gap-2 justify-center">
        <span>{title}</span>
        {showArrowIcon && <RightLongArrow />}
      </div>
    </button>
  );
};

export default SubmitButton;
