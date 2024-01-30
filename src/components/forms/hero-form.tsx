"use client";

import { signIn } from "next-auth/react";
import { redirect ,useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const HeroForm = ({ user }: Props ) => {

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
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20">
          <span className="bg-white py-4 pl-4">
            linklist.to/
          </span>
      <input
        type="text"
        className="outline-none"
        style={{backgroundColor:'white',marginBottom:0,paddingLeft:0}}
        placeholder="username"/>
      <button
        type="submit"
        className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap">
        Join for Free
      </button>
    </form>
  );
};

export default HeroForm;
