import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { NextRequest, NextResponse } from "next/server";
import { MessageType } from "@/domain/enums/enums";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  if (formData.has("file")) {
    const file = formData.get("file") as File;

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
    });

    const randomId = uniqid();
    const ext = file.name.split(".").pop();

    const newFilename = `${randomId}.${ext}`;

    const stream = file.stream();
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];

    console.log("Uploading image-001");
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }

      console.log("Uploading image-002 " + chunks.length);

    const bucketName = process.env.S3_BUCKET_NAME as string

   await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        ACL: "public-read",
        Body: Buffer.concat(chunks),
        ContentType: file.type,
    }));
    
    console.log("Uploading image-003");

    const imageLink = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    const imageInfo = { imageLink, fileName: newFilename }
    const message = { type: MessageType.Success, message: "Image uploaded successfully"}

    return new NextResponse(JSON.stringify({ imageInfo, message }), { status: 200 });

  } else {
    
    const message = { type: MessageType.Error, message: "Image file not found"}

    return new NextResponse(JSON.stringify({ imageInfo: null, message }), {
      status: 404,
    });
  }
};

