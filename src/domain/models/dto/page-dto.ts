import { ISODateString } from "next-auth"

export type PageDTO = {
    _id?: string
    uri?: string
    createdAt?: ISODateString
    updatedAt?: ISODateString
}