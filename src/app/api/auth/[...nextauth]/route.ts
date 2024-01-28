import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import clientPromise from "@/libs/mongo-client";

export const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })],
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };