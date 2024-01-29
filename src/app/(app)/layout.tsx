import type { Metadata } from "next";
import {  Lato } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";
import AppSiderbar from "@/components/layout/app-sider";

const lato = Lato({ subsets: ["latin"], weight: ['400','700'] });

export const metadata: Metadata = {
  title: "App Dashboard",
  description: "Generated by create next app",
};

const ApppLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={lato.className}>
        <main className="flex min-h-screen">
          <aside className="bg-white w-48 p-4 shadow">
            <div className="rounded-full overflow-hidden w-24 mx-auto">
              <Image
                alt="User image"
                width={256}
                height={256}
                src={session?.user?.image as string}
                priority
              />
            </div>
            <div className="text-center">
              <AppSiderbar />
            </div>
          </aside>
          <div className="grow">
            <div className="bg-white m-8 p-4 shadow">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default ApppLayout;
