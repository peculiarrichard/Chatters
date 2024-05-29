import mongoose from "mongoose";

const helpAndFeedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Please write a message"],
  },
  userEmail: {
    type: String,
    required: [true, "Please provide email"],
  },
  usersName: {
    type: String,
    required: [true, "Please provide the user's name"],
  },
  subject: {
    type: String,
    required: [true, "Please write a subject"],
  },
  userId: {
    type: String,
    required: [true, "please provide the user's id"],
  },
});

const HelpAndFeedback =
  mongoose.models.helpAndFeedbacks ||
  mongoose.model("helpAndFeedbacks", helpAndFeedbackSchema);

export default HelpAndFeedback;
