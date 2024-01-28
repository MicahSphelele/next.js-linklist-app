import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/username-form";


const AccountPage = async ({
  searchParams, ...rest
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  
  const session = await getServerSession(nextAuthOptions);
  const desiredUsername = searchParams["desiredUsername"];

  if (!session) {
    redirect("/");
  }

  return (
    <div>
        <UsernameForm desiredUsername={desiredUsername as string} />
    </div>
  );
};

export default AccountPage;
