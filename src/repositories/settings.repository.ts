import User from "@/schema/auth/UserSchema";
import HelpAndFeedback from "@/schema/settings/HelpSchema";
import { feedback } from "@/models/apiTypes/settings";

export default class SettingsRepository {
  static async updateProfile(
    userName: string,
    topicsOfInterest: string[],
    userId: string,
    bio: string,
    website: string
  ) {
    try {
      const profile = await User.findOneAndUpdate(
        { _id: userId },
        {
          userName: userName,
          topicsOfInterest: topicsOfInterest,
          isProfileCompleted: true,
          bio: bio,
          website: website,
        },
        { new: true }
      );
      return profile;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }

  static async saveNewFeedback(info: feedback) {
    try {
      const feedback = new HelpAndFeedback(info);
      await feedback.save();
      return feedback;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }

  static async updateUserPassword(hashedPassword: string, email: string) {
    try {
      const updatedPassword = await User.updateOne(
        { email: email },
        { password: hashedPassword }
      );
      return updatedPassword;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }
}
