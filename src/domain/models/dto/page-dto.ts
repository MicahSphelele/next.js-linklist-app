import { ISODateString } from "next-auth"

export type PageDTO = {
    _id?: string;
    uri?: string;
    displayName?: string;
    location?: string;
    bio?: string;
    bgType?: string;
    bgColor?: string
    createdAt?: ISODateString;
    updatedAt?: ISODateString;
}