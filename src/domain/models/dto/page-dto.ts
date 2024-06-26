import { ISODateString } from "next-auth"

export type PageDTO = {
    _id?: string;
    uri?: string;
    displayName?: string;
    location?: string;
    bio?: string;
    bgType?: string;
    bgColor?: string
    bgImageUrl: string,
    bgImageKey: string,
    avater: string,
    avaterKey: string,
    buttons: Array<{ [key: string]: string }>,
    links: Array<{ [key: string]: string }>,
    createdAt?: ISODateString;
    updatedAt?: ISODateString;
}

export type PageDTOKeys = keyof PageDTO;