import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Alumni from "@/models/Alumni";

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
