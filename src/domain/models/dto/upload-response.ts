import { ImageInfo } from "./image-info"
import { MessageResponse } from "../message-response"

export type ImageUploadResponse = {
    imageInfo?: ImageInfo
    message: MessageResponse
}