import { connect } from "@/lib/dbConfig";
import User from "@/schema/auth/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";

connect();

export async function PUT(request: NextRequest) {
  const { oldPassword, newPassword } = await request.json();
  try {
    const auth = getUserDataFromToken(request);
    if (auth.status === 401) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    let { email } = auth.data;
    const user = await User.findOne({ email });
    const validPassword = await bcryptjs.compare(oldPassword, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Your old password is not correct" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    await User.updateOne({ email: email }, { password: hashedPassword });
    return NextResponse.json(
      { message: "Password changed successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error || "internal server error" },
      { status: 500 }
    );
  }
}
