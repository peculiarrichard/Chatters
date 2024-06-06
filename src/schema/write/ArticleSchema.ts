import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  body: {
    type: String,
    required: [true, "Please provide body"],
  },
  excerpt: {
    type: String,
    required: [true, "Please provide excerpt"],
  },
  topicsOfInterest: {
    type: [String],
    required: [true, "Please provide topics of interest"],
  },
  featuredImage: {
    type: String,
    required: [true, "Please provide featured image link"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide user id"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
    required: [true, "Please provide status"],
  },
});

const Article =
  mongoose.models.articles || mongoose.model("articles", articleSchema);
export default Article;
