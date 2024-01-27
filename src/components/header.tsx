"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl mx-auto px-6 flex justify-between">
        <div className="flex gap-6">
          <Link href={"/"}>LinkList</Link>
          <nav className="flex items-center gap-4 text-gray-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>

        <nav className="flex gap-4 text-sm text-slate-500">
          <Link href={"/sign-in"}>Sign In</Link>
          <Link href={"/sign-up"}>Create Account</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
