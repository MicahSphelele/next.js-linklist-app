import { MessageType } from "../enums/enums";

export interface MessageResponse {
    type: MessageType,
    message: string
}