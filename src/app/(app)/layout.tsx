import type { Metadata } from "next";
import {  Lato } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import {faBars, faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { redirect } from "next/navigation";
import AppSiderbar from "@/components/layout/app-sider";
import { Toaster } from "react-hot-toast";
import { PageDTO } from "@/domain/models/dto/page-dto";
import { actionGetPageByOwner } from "@/actions/actions-for-page";
import Link from "next/link";

const lato = Lato({ subsets: ["latin"], weight: ['400','700'] });

export const metadata: Metadata = {
  title: {
    default: "App Dashboard",
    template: "%s | Dashboard"
  },
  description: "This is the user dashboard",
};

const ApppLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/");
  }

  const page = (await actionGetPageByOwner(
    session.user?.email as string
  )) as PageDTO;

  return (
    <html lang="en">
      <body className={lato.className}>
      <Toaster />
      <main className="md:flex min-h-screen">
      <label htmlFor="navCb" className="md:hidden ml-8 mt-4 p-4 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer">
        <FontAwesomeIcon icon={faBars} />
        <span>Open navigation</span>
      </label>
      <input id="navCb" type="checkbox" className="hidden" />
      <label htmlFor="navCb" className="hidden backdrop fixed inset-0 bg-black/80 z-10"></label>
      <aside className="bg-white w-48 p-4 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all">
        <div className="sticky top-0 pt-2">
          <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
            <Image src={ session.user?.image ?? ""} width={256} height={256} alt={'avatar'} />
          </div>
          {page && (
            <Link
              target="_blank"
              href={'/'+page.uri}
              className="text-center mt-4 flex gap-1 items-center justify-center">
              <FontAwesomeIcon size="lg" icon={faLink} className="text-blue-500" />
              <span className="text-xl text-gray-300">/</span>
              <span>{ page.uri }</span>
            </Link>
          )}
          <div className="text-center">
            <AppSiderbar />
          </div>
        </div>
      </aside>
      <div className="grow">
        {children}
      </div>
    </main>
      </body>
    </html>
  );
};

export default ApppLayout;
