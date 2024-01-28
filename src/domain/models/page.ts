import mongoose, { Schema, model, models } from "mongoose";

const pageSchema = new Schema({
    uri : { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true, min: 1 }

}, { timestamps: true });

export const Page = models?.Page || model("Page", pageSchema);