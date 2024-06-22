"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import SignOutButton from "@/components/buttons/sign-out-button";
import { usePathname, useRouter } from "next/navigation";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const AppSiderbar = () => {

    const router = useRouter();
    const path = usePathname();
    const activeClasses = "text-blue-500 flex gap-4 p-2";
    const inActiveClasses = "flex gap-4 p-2";

    const getLinkClasses = (href: string): string => {

        return (path === href ? activeClasses : inActiveClasses)
    }

  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-500">
      <Link className={getLinkClasses('/account')} href={"/account"}>
        <FontAwesomeIcon
          fixedWidth={true}
          className="h-6 w-6"
          icon={faFileLines}
        /> 
        <span>My Page</span>
      </Link>

      <Link onClick={()=> router.refresh()} className={getLinkClasses('/analytics')} href={"/analytics"}>
        <FontAwesomeIcon
          fixedWidth={true}
          className="h-6 w-6"
          icon={faChartLine}
        />
        <span>Analytics</span>
      </Link>

      <SignOutButton
        className="flex gap-4 items-center p-2"
        iconClasses="h-6 w-6"
        iconLeft={true}
      />

      <Link
        className="flex gap-4 items-center text-xs text-gray-500 border-t pt-4"
        href={"/"}
      >
        <FontAwesomeIcon className="h-3 w-3" icon={faArrowLeftLong} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
};

export default AppSiderbar;
