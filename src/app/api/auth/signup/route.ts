import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/schema/auth/UserSchema";
import { connect } from "@/lib/dbConfig";
import AuthRepository from "@/repositories/auth.repository";

const { findUser } = AuthRepository;

connect();

export async function POST(request: NextRequest) {
  const { fullName, email, password } = await request.json();
  try {
    const user = await findUser(email);
    if (user) {
      return NextResponse.json(
        { message: "An account with this email already exist", success: false },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const profilePicture = `https://ui-avatars.com/api/?name=${fullName}&format=png&background=EFEFEF&color=1E5ED4&rounded=true&bold=true`;
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePhotoUrl: profilePicture,
    });
    await newUser.save();
    return NextResponse.json(
      {
        message: "Account created successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
