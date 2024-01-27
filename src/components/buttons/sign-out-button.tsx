"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-slate-500 border shadow flex items-center hover:bg-gray-500 hover:text-white gap-2 p-2 rounded-md"
    >
      <span>Sign Out</span>
      <FontAwesomeIcon className="h-3" icon={faArrowRightFromBracket} />
    </button>
  );
};

export default SignOutButton;
