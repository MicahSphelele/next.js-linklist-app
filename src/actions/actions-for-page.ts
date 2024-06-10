"use server";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { MessageType } from "@/domain/enums/enums";
import { Page } from "@/domain/models/db/page";
import { User } from "@/domain/models/db/user";
import { PageDTO } from "@/domain/models/dto/page-dto";
import { UserDTO } from "@/domain/models/dto/user-dto";
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
    
    const pageDataToUpdate: Partial<PageDTO> = {};

    const pageDataKeys: (keyof PageDTO)[] = [
      "displayName",
      "location",
      "bio",
      "bgType",
      "bgColor",
      "bgImageUrl",
      "bgImageKey",
    ];

    for (const key of pageDataKeys) {
      if (formData.has(key)) {
        pageDataToUpdate[key] = formData.get(key) as string;
      }
    }

    await Page.updateOne({ owner: session.user?.email }, pageDataToUpdate);

    if(formData.has("avater") && formData.has("avaterKey")) {
      
           const avater = formData.get("avater");
           const avaterKey = formData.get("avaterKey");

           await User.updateOne(
            {email: session.user?.email},
            {image: avater, imageKey: avaterKey},
          );
    }

    response.type = MessageType.Success;
    response.message = "Your page details have been updated";

    return JSON.parse(JSON.stringify(response));
  } else {
    response.type = MessageType.Error;
    response.message = "Session not found please try and authenticate";

    return JSON.parse(JSON.stringify(response));
  }
};
