import User from "@/schema/auth/UserSchema";

export default class AuthRepository {
  static async findUser(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error: any) {
      throw new Error(`Error retrieving user, ${error.message}`);
    }
  }
}