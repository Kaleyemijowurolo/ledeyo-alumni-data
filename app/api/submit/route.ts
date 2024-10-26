import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Alumni from "@/models/Alumni";
import UserAgentParser from "user-agent-parser"; // Import the library for parsing User-Agent

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Extract User-Agent from request headers
    const userAgent = request.headers.get("user-agent") || "";
    const parsedUserAgent = UserAgentParser(userAgent); // Parse the User-Agent

    // Add dateCreated and dateUpdated fields
    const alumniData = {
      ...body,
      createdAt: new Date(), // Set the current date as dateCreated
      updatedAt: new Date(), // Set the current date as dateUpdated
      deviceInfo: {
        browser: parsedUserAgent.browser.name,
        version: parsedUserAgent.browser.version,
        os: parsedUserAgent.os.name,
        device: parsedUserAgent.device?.model || "Desktop", // Fallback to 'Desktop'
      },
    };

    // Check if an alumni entry with the same email already exists
    const existingAlumni = await Alumni.findOne({ email: body.email });
    if (existingAlumni) {
      return NextResponse.json(
        {
          success: false,
          message: "Sorry!, You have submitted your info already",
        },
        { status: 400 }
      );
    }

    // Create a new Alumni entry in the database
    const alumni = await Alumni.create(alumniData);

    // Return a successful response
    return NextResponse.json(
      { success: true, message: "Form submitted successfully!", data: alumni },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and return a 400 status response with the error message
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

// import crypto from "crypto";
// const secret = crypto.randomBytes(32).toString("hex");
// console.log(secret, "JWT secret");
