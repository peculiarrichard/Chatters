import { connect } from "@/lib/dbConfig";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";
import { NextResponse, NextRequest } from "next/server";
import OnboardingRepository from "@/repositories/onboarding.repository";

const { findUsername, onboardUser } = OnboardingRepository;

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
    const username = await findUsername(userName);
    if (username) {
      return NextResponse.json(
        {
          message: "Oops, this username is already taken, try another",
          success: false,
        },
        { status: 400 }
      );
    }
    const updatedUser = await onboardUser(
      userName,
      topicsOfInterest,
      mainActivity,
      userId
    );
    return NextResponse.json(
      { message: "Onboarding successfull", success: true, updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "internal server error", success: false },
      { status: 500 }
    );
  }
}
