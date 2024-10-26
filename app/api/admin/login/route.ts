// pages/api/admin.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AlumniAdmin from "@/models/AlumniAdmin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // Return a successful response with admin info (without the password)
    return NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        data: { email: admin.email, token },
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
