"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string
}

const SubmitButton = ({ children, className = "" }: Props) => {

  const { pending } = useFormStatus();

  const getClassName = (): string  => {

    return `bg-blue-500 disabled:bg-blue-400 text-white disabled:text-gray-200 py-2 px-4 block mx-auto w-full flex gap-2 items-center justify-center ${className}`;
  };

  return (
    <button
    disabled={pending}
      className={getClassName()}
      type="submit"
    >
      <div className="mx-auto flex gap-2 justify-center items-center">
        { children }
      </div>
    </button>
  );
};

export default SubmitButton;
