// pages/api/alumni.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AlumniAdmin from "@/models/AlumniAdmin";
import userAgentParser from "user-agent-parser";
import { IAlumniAdmin as AlumniType } from "@/types/AlumniAdmin";
import bcrypt from "bcryptjs";

// Helper function to parse request body
async function parseRequestBody(request: Request): Promise<AlumniType> {
  const body = await request.json();
  const userAgent = request.headers.get("user-agent") || "";
  const parsedUserAgent = userAgentParser(userAgent);

  return {
    ...body,
    createdAt: {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString().split("T")[1].split(".")[0],
    },
    updatedAt: {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString().split("T")[1].split(".")[0],
    },
    deviceInfo: {
      browser: parsedUserAgent.browser.name,
      version: parsedUserAgent.browser.version,
      os: parsedUserAgent.os.name,
      device: parsedUserAgent.device?.model || "Desktop",
    },
  };
}

// POST request: Create a new alumni entry
export async function POST(request: Request) {
  await dbConnect();

  try {
    const alumniAdminData = await parseRequestBody(request);

    // Check if an alumni entry with the same email already exists
    const existingAlumniAdmin = await AlumniAdmin.findOne({
      email: alumniAdminData.email,
    });
    if (existingAlumniAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(alumniAdminData.password, 10);

    // Create a new AlumniAdmin entry in the database
    const alumniAdmin = await AlumniAdmin.create({
      email: alumniAdminData.email,
      password: hashedPassword,
    });

    // Return a successful response
    return NextResponse.json(
      {
        success: true,
        message: "Admin registered successfully!",
        data: alumniAdmin,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}

// GET request: Retrieve all alumni records
export async function GET() {
  await dbConnect();

  try {
    const alumni = await AlumniAdmin.find({});
    return NextResponse.json({ success: true, data: alumni }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT request: Update an existing alumni record
export async function PUT(request: Request) {
  await dbConnect();

  try {
    const { _id, ...updates } = await request.json();
    const alumni = await AlumniAdmin.findByIdAndUpdate(_id, updates, {
      new: true,
    });

    if (!alumni) {
      return NextResponse.json(
        { success: false, message: "Alumni Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Alumni Admin updated successfully!",
        data: alumni,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}

// DELETE request: Delete an alumni record
export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const { id } = await request.json();
    const alumni = await AlumniAdmin.findByIdAndDelete(id);

    if (!alumni) {
      return NextResponse.json(
        { success: false, message: "AlumniAdmin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "AlumniAdmin deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
