"use client";

import actionGrabUsername from "@/actions/action-grab-username";  
import { useState } from "react";
import SubmitButton from "../buttons/submit-button";

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

        <SubmitButton title="Claim username" />

      </div>
    </form>
  );
};

export default UsernameForm;
