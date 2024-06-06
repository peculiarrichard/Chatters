import User from "@/schema/auth/UserSchema";

export default class OnboardingRepository {
  static async findUsername(userName: string) {
    try {
      const userNameExists = await User.findOne({ _id: userName });
      return userNameExists;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }

  static async onboardUser(
    userName: string,
    topicsOfInterest: string[],
    mainActivity: string,
    userId: string
  ) {
    try {
      const onboardedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          userName: userName,
          topicsOfInterest: topicsOfInterest,
          mainActivity: mainActivity,
          hasOnboarded: true,
        },
        { new: true }
      );
      return onboardedUser;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }
}
