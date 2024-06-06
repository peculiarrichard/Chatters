import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";
import SettingsRepository from "@/repositories/settings.repository";

const { saveNewFeedback } = SettingsRepository;

connect();

export async function POST(request: NextRequest) {
  const { subject, message } = await request.json();

  try {
    const auth = getUserDataFromToken(request);
    if (auth.status === 401) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    let { id, email, fullName } = auth.data;

    const feedBackData = {
      message: message,
      userEmail: email,
      usersName: fullName,
      subject: subject,
      userId: id,
    };
    const newFeeback = await saveNewFeedback(feedBackData);
    return NextResponse.json(
      {
        message:
          "We have received your feedback/suggestion and will get back to you soon",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "internal server error" },
      { status: 500 }
    );
  }
}
