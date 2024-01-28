"use server";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/domain/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const actionGrabUsername = async(formData: FormData) => {
        
        const username = formData.get("username");

        await mongoose.connect(process.env.MONGODB_URI as string);

        const existingPage = await Page.findOne({ uri: username });

        if (existingPage) {
            
            return false;

        } else {

            const session = await getServerSession(nextAuthOptions);
            const email = session?.user?.email

            const alreadyExist = await Page.findOne({ owner: email });

            if(alreadyExist) {

                return false;
                
            } else {

                return await JSON.parse(JSON.stringify(Page.create({ uri: username, owner: email })));
            }

            
        }
  }

 export default actionGrabUsername; 