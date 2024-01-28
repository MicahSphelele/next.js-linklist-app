"use server";

import { Page } from "@/domain/models/page";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const actionGrabUsername = async(formData: FormData) => {
        
        const username = formData.get("username");

        await mongoose.connect(process.env.MONGODB_URI as string);

        const existingPage = await Page.findOne({ uri: username });

        if (existingPage) {
            
            return false;

        } else {

            return await Page.create({ uri: username });
        }
  }

 export default actionGrabUsername; 