import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    
    const formData  = await req.formData();

    if(formData.has("file")) {

        const file = formData.get("file") as File;
    
        return new NextResponse(JSON.stringify({ file }), {status: 200});
    } else {
        return new NextResponse(JSON.stringify({ message: "File not found" }), {status: 404});
    }


}