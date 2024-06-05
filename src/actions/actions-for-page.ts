"use server";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { MessageType } from "@/domain/enums/enums";
import { Page } from "@/domain/models/db/page";
import { PageDTO } from "@/domain/models/dto/page-dto";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export const actionGetPageByOwner = async (email?: string) => {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const page = await Page.findOne({ owner: email });

  return JSON.parse(JSON.stringify(page));
};

export const actionSavePageSettings = async (formData: FormData) => {
  const response = {
    type: MessageType.Unknown,
    message: "",
  };

  await mongoose.connect(process.env.MONGODB_URI as string);
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const displayName = formData.get("displayName") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const bgType = formData.get("bgType") as string;
    const bgColor = formData.get("bgColor") as string;
    const bgImageUrl = formData.get("bgImageUrl") as string;
    const bgImageKey = formData.get("bgImageKey") as string;

    const updateData = { displayName, location, bio, bgType } as PageDTO

    if(bgColor) updateData.bgColor = bgColor

    if(bgImageUrl) updateData.bgImageUrl = bgImageUrl

    if(bgImageKey) updateData.bgImageKey = bgImageKey

    await Page.updateOne(
      { owner: session.user?.email },
      updateData
    );

    response.type = MessageType.Success;
    response.message = "Your page details have been updated";

    return JSON.parse(JSON.stringify(response));
  } else {
    response.type = MessageType.Error;
    response.message = "Session not found please try and authenticate";

    return JSON.parse(JSON.stringify(response));
  }
};
