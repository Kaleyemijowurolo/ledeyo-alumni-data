// pages/api/admin.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AlumniAdmin from "@/models/AlumniAdmin";
import Alumni from "@/models/Alumni";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

// POST request for admin login
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    // Find the admin by email
    const admin = await AlumniAdmin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = generateToken(admin.email);

    // if the alumni admin exist in admin database, get his user from the alumni list
    const alumniData = await Alumni.find({ email });

    // Handle case where alumni data is not found
    const alumniInfo = alumniData.length > 0 ? alumniData : {}; // Ensure alumniInfo is an array

    // Return a successful response with admin info (without the password)
    return NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        data: { alumniInfo, email: admin.email, token }, // Use alumniInfo here
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
