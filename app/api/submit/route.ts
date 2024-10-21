// import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../../lib/dbConnect";
// import Alumni from "../../../models/Alumni";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();

//   if (req.method === "POST") {
//     try {
//       const alumni = await Alumni.create(req.body);
//       res.status(201).json({ success: true, data: alumni });
//     } catch (error) {
//       res.status(400).json({ success: false, error });
//     }
//   } else {
//     res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }
// }

// app/api/alumni/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Alumni from "@/models/Alumni";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Create a new Alumni entry in the database
    const alumni = await Alumni.create(body);

    // Return a successful response
    return NextResponse.json({ success: true, data: alumni }, { status: 201 });
  } catch (error) {
    // Handle errors and return a 400 status response with the error message
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    // Retrieve all alumni records from the database
    const alumni = await Alumni.find({});

    // Return the list of alumni in the response
    return NextResponse.json({ success: true, data: alumni }, { status: 200 });
  } catch (error) {
    // Handle errors and return a 500 status response
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
