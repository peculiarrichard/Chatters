import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/helpers/upload-to-s3";
import { getUserDataFromToken } from "@/helpers/get-user-data-from-token";
import { connect } from "@/lib/dbConfig";
import WriteRepository from "@/repositories/write.repository";

const { createNewArticle, findExistingArticle } = WriteRepository;
connect();

export async function POST(req: NextRequest) {
  try {
    const auth = getUserDataFromToken(req);
    if (auth.status === 401) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    let userId = auth.data.id;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const excerpt = formData.get("excerpt") as string;
    const topicsOfInterest = formData.getAll("topicsOfInterest") as string[];
    const featuredImage = formData.get("file") as File;
    const action = formData.get("action") as string;

    const imageUrl = await uploadToS3(featuredImage);
    const timestamp = new Date();
    const existingArticle = await findExistingArticle(title, userId);

    const articleData = {
      title,
      body,
      excerpt,
      topicsOfInterest,
      featuredImage: imageUrl,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: action,
    };

    if (existingArticle) {
      Object.assign(existingArticle, articleData);
      await existingArticle.save();
    } else {
      await createNewArticle(articleData);
    }

    const successMessage =
      action === "draft"
        ? "Article saved as draft"
        : "Article created successfully";
    return NextResponse.json(
      {
        message: successMessage,
        success: true,
        data: articleData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error || "internal server error" },
      { status: 500 }
    );
  }
}
