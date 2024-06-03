import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { NextRequest, NextResponse } from "next/server";

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
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }

      const bucketName = process.env.S3_BUCKET_NAME as string

    await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        ACL: "public-read",
        Body: Buffer.concat(chunks),
        ContentType: file.type,
    }));

    const imageLink = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    return new NextResponse(JSON.stringify({ imageLink }), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: "File not found" }), {
      status: 404,
    });
  }
};

