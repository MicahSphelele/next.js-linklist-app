import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "../buttons/sign-out-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Header = async () => {

  const session = await getServerSession(nextAuthOptions);

  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <div className="flex gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-blue-500">
            <FontAwesomeIcon icon={faLink} className="text-blue-500"/>
            <span className="font-bold">LinkList</span>
          </Link>
          <nav className="flex items-center gap-4 text-gray-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>

        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {
            !!session && (
              <>
              <Link href={"/account"}>Hello, {session.user?.name}</Link>
              <SignOutButton />
              </>
            )
          }
          {!session && (
            <>
              <Link href={"/sign-in"}>Sign In</Link>
              <Link href={"/sign-up"}>Create Account</Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;
