"use client";

import actionGrabUsername from "@/actions/action-grab-username";
import RightLongArrow from "@/components/icons/right-long-arrow";
import { useState } from "react";

type UsernameFormProps = {
  desiredUsername: string;
};

const UsernameForm = ({
  desiredUsername
}: UsernameFormProps) => {
  const [taken, setTaken] = useState(false);

  const handleSubmit = async (formData: FormData) => {

    const result = await actionGrabUsername(formData);

    setTaken(result === false);

  };

  const clear = () => {
    if (taken) {
      setTaken(false);
    }
  };

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>
      <div className="max-w-xs mx-auto">
        <p className="text-center mb-6 text-gray-500">Choose your username</p>
        <input
          onChange={() => clear()}
          name="username"
          className="block p-2 mx-auto border w-full mb-2 text-center outline-none"
          type="text"
          defaultValue={desiredUsername}
          placeholder="Username"
        />

        {taken && (
          <div className="bg-red-200 border border-red-600 p-2 mb-2 text-center">
            This username is taken
          </div>
        )}

        <button
          className="bg-blue-500 text-white py-4 px-4 block mx-auto w-full"
          type="submit"
        >
          <div className="mx-auto flex gap-2 justify-center">
            <span>Claim usename</span>
            <RightLongArrow />
          </div>
        </button>
      </div>
    </form>
  );
};

export default UsernameForm;
