"use server";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { MessageType } from "@/domain/enums/enums";
import { Page } from "@/domain/models/db/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export const actionGetPageByOwner = async(email?: string) => {

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

    if(session) {

        const displayName = formData.get("displayName");
        const location = formData.get("location");
        const bio = formData.get("bio");

     await Page.updateOne({ owner: session.user?.email }, { displayName, location, bio });

     response.type = MessageType.Success;
     response.message = "Your page details have been updated";

     return JSON.parse(JSON.stringify(response));

    } else {
        response.type = MessageType.Error;
        response.message = "Session not found please try and authenticate";
        return JSON.parse(JSON.stringify(response));
    }
};