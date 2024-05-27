import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const res = NextResponse.json({ message: "Logout successful" });
    res.cookies.delete("chatterstoken");
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}