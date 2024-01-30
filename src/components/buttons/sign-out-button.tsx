"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

type Props = {
  className?: string;
  iconLeft?: boolean;
  iconClasses?: string;
};

const SignOutButton = ({
  className = "text-slate-500 border shadow flex items-center hover:bg-gray-500 hover:text-white gap-2 p-2 rounded-md",
  iconLeft = false,
  iconClasses = "h-3",
}: Props) => {
  return (
    <button onClick={() => signOut()} className={className}>
      { iconLeft && (
        <FontAwesomeIcon
          className={iconClasses}
          icon={faArrowRightFromBracket}
        />
      )}
      <span>Sign Out</span>
      {!iconLeft && (
        <FontAwesomeIcon
          className={iconClasses}
          icon={faArrowRightFromBracket}
        />
      )}
    </button>
  );
};

export default SignOutButton;
