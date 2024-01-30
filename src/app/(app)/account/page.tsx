import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/username-form";
import actionGetPageByOwner from "@/actions/action-get-account-page";
import { PageDTO } from "@/domain/models/dto/page-dto";
import PageSettingsForm from "@/components/forms/page-settings-form";

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

      {page && <PageSettingsForm page={page} />}
    </div>
  );
};

export default AccountPage;
