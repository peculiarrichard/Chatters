import { connect } from "@/lib/dbConfig";
import User from "@/schema/auth/UserSchema";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function PUT(req: NextRequest) {
  const { userName, topicsOfInterest, mainActivity } = await req.json();
  try {
    const auth = getUserDataFromToken(req);
    if (auth.status === 401) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    let userId = auth.data.id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        userName: userName,
        topicsOfInterest: topicsOfInterest,
        hasOnboarded: true,
        mainActivity: mainActivity,
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Onboarding successfull", updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "internal server error" },
      { status: 500 }
    );
  }
}
