import mongoose, { Schema, model, models } from "mongoose";

const pageSchema = new Schema({
    uri : { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true, min: 1 },
    displayName: { type: String, default: ""},
    location: { type: String, default: ""},
    bio: { type: String, default: ""},
    bgType: { type: String, default: "color"},
    bgColor: { type: String, default: "#000000"}

}, { timestamps: true, versionKey: false });

export const Page = models?.Page || model("Page", pageSchema);