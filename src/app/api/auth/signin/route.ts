import { connect } from "@/lib/dbConfig";
import User from "@/schema/auth/UserSchema";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invlid email or password" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "2 days",
    });
    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
    response.cookies.set("chatterstoken", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
