import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import HelpAndFeedback from "@/schema/settings/HelpSchema";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";

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

    const newFeeback = new HelpAndFeedback({
      message: message,
      userEmail: email,
      usersName: fullName,
      subject: subject,
      userId: id,
    });

    await newFeeback.save();
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
