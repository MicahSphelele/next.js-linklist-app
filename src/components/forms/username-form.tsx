"use client";

import actionGrabUsername from "@/actions/action-grab-username";
import RightLongArrow from "@/components/icons/right-long-arrow";
import { useState } from "react";
import SubmitButton from "../buttons/submit-button";
import { redirect } from "next/navigation";
import { MessageResponse } from "@/domain/models/message-response";
import { MessageType } from "@/domain/enums/enums";

type Props = {
  desiredUsername: string;
};

const UsernameForm = ({ desiredUsername }: Props) => {
  const [taken, setTaken] = useState(false);

  const handleSubmit = async (formData: FormData) => {

    const result = await actionGrabUsername(formData) as MessageResponse;
    
    setTaken(result.type === MessageType.Error);

    if(result.type === MessageType.Success) {
      redirect(`/account?created=${formData.get("username")}`);
    }
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

      <p className="text-center mb-6 text-gray-500">Choose your username</p>
      
      <div className="max-w-xs mx-auto">
        
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

        <SubmitButton>
          <span>Claim username</span>
          <RightLongArrow />
        </SubmitButton>
      </div>
    </form>
  );
};

export default UsernameForm;
