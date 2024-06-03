"use server";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { MessageType } from "@/domain/enums/enums";
import { Page } from "@/domain/models/db/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const actionGrabUsername = async (formData: FormData) => {
  const username = formData.get("username");

  await mongoose.connect(process.env.MONGODB_URI as string);

  const existingPage = await Page.findOne({ uri: username });

  const response = {
    type: MessageType.Unknown,
    message: "",
  };

  if (existingPage) {
    response.message = "Username is already taken";
    response.type = MessageType.Error;

    return JSON.parse(JSON.stringify(response));
  } else {
    const session = await getServerSession(nextAuthOptions);
    const email = session?.user?.email;

    const pageAlreadyExist = await Page.findOne({ owner: email });

    if (pageAlreadyExist) {
      response.message = `${email} already has a username`;
      response.type = MessageType.Error;

      return JSON.parse(JSON.stringify(response));
    } else {
      const pageCreated = await Page.create({
        uri: username,
        owner: email,
      });

      if (pageCreated) {
        response.message = "Username has been succesfully created";
        response.type = MessageType.Success;
        return await JSON.parse(JSON.stringify(response));
      } else {
        response.message = "Unable to add username: database error";
        response.type = MessageType.Error;
        return await JSON.parse(JSON.stringify(response));
      }
    }
  }
};

export default actionGrabUsername;
