"use server";

import { Page } from "@/domain/models/page";
import mongoose from "mongoose";

const actionGetPageByOwner = async(email?: string) => {

    await mongoose.connect(process.env.MONGODB_URI as string);

    const existingPage = await Page.findOne({ owner: email });

    return JSON.parse(JSON.stringify(existingPage));
};

export default actionGetPageByOwner;