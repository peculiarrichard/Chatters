import { connect } from "@/lib/dbConfig";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";
import { NextResponse, NextRequest } from "next/server";
import SettingsRepository from "@/repositories/settings.repository";

const { updateProfile } = SettingsRepository;

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
    const updatedProfile = await updateProfile(
      userName,
      topicsOfInterest,
      userId,
      bio,
      website
    )
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
