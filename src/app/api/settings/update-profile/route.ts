import { connect } from "@/lib/dbConfig";
import User from "@/schema/auth/UserSchema";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function PUT(req: NextRequest) {
  const { userName, topicsOfInterest, bio, website } = await req.json();
  try {
    const auth = getUserDataFromToken(req);
    if (auth.status === 401) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    let userId = auth.data.id;
    const updatedProfile = await User.findOneAndUpdate(
      { _id: userId },
      {
        userName: userName,
        topicsOfInterest: topicsOfInterest,
        isProfileCompleted: true,
        bio: bio,
        website: website
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Profile updated successfully", updatedProfile },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "internal server error" },
      { status: 500 }
    );
  }
}
