"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: {children: React.ReactNode }) => {

  const { pending } = useFormStatus();

  return (
    <button
    disabled={pending}
      className="bg-blue-500 disabled:bg-blue-200 text-white disabled:text-gray-200 py-4 px-4 block mx-auto w-full"
      type="submit"
    >
      <div className="mx-auto flex gap-2 justify-center items-center">
        { children }
      </div>
    </button>
  );
};

export default SubmitButton;
