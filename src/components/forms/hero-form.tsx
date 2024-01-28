"use client";

import { signIn } from "next-auth/react";
import { redirect ,useRouter } from "next/navigation";
import React, { useEffect } from "react";

type HeroFormProps = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const HeroForm = ({ user }: HeroFormProps ) => {

  const router = useRouter();

  useEffect(()=> {

    if('localStorage' in window && window.localStorage.getItem("_username")) {

      const username = window.localStorage.getItem("_username");
      window.localStorage.removeItem("_username");
      redirect(`/account?desiredUsername=${username}`);
    }

  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget[0] as HTMLInputElement).value;

    if (username.length > 0) {

      if(user) {

        router.push(`/account?desiredUsername=${username}`);
       
      } else {
        window.localStorage.setItem("_username", username);
        await signIn('google');
      }

    }
  };

  return (
  
    <form
      onSubmit={(e) => handleSubmit(e)}
      action=""
      className="inline-flex items-center shadow-lg shadow-gray/700"
    >
      <span className="bg-white py-4 pl-4">linklist.to/</span>

      <input type="text" placeholder="username" className="py-4 outline-none" />
      <button type="submit" className="bg-blue-500 text-white py-4 px-6">
        Join for free
      </button>
    </form>
  );
};

export default HeroForm;
