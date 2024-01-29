import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/username-form";
import actionGetPageByOwner from "@/actions/action-get-account-page";
import { PageDTO } from "@/domain/models/dto/page-dto";

const AccountPage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  
  const session = await getServerSession(nextAuthOptions);
  const desiredUsername = searchParams["desiredUsername"];

  if (!session) {
    redirect("/");
  }

  const page = await actionGetPageByOwner(
    session.user?.email as string
  ) as PageDTO;

  return (
    <div>
      {!page && <UsernameForm desiredUsername={desiredUsername as string} />}

      {page && <p>Your page is: /{page.uri} </p>}
    </div>
  );
};

export default AccountPage;
