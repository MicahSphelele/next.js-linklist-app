import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/username-form";
import { actionGetPageByOwner } from "@/actions/actions-for-page";
import { PageDTO } from "@/domain/models/dto/page-dto";
import PageSettingsForm from "@/components/forms/page-settings-form";
import PageButtonsForm from "@/components/forms/page-buttons-form";
import PageLinksForm from "@/components/forms/page-links-form";

export const metadata: Metadata = {
  title: "Account",
  description: "This is the main account settings page",
};

const AccountPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(nextAuthOptions);
  const desiredUsername = searchParams["desiredUsername"] as string;

  if (!session) {
    redirect("/");
  }

  const page = (await actionGetPageByOwner(
    session.user?.email as string
  )) as PageDTO;

  if (page) {
    return (
      <>
        <PageSettingsForm page={page} user={session.user} />
        <PageButtonsForm page={page} user={session.user} />
        <PageLinksForm page={page} user={session.user} />
      </>
    );
  } else {
    return (
      <>
        <UsernameForm desiredUsername={desiredUsername} />
      </>
    );
  }
};

export default AccountPage;
