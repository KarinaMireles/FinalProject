import establishConnection from "../establishConnection";
import UserProfile from "../models/UserProfile";

export class UserProfileService {
  static async createUserProfile(spotifyUserId: string, displayName: string): Promise<string> {
    await establishConnection();
    // Check if user already exists
    console.log("----------------------------------------------");
    console.log(spotifyUserId);
    try {
      let user = await UserProfile.findOne({ spotifyUserId });
      console.log(user);

      if (!user) {
        // User does not exist, so create a new user profile
        console.log("-----------------------1-----------------------");

        user = await UserProfile.create({ spotifyUserId, displayName });
        console.log("-----------------------2-----------------------");

        console.log(user);

        return "User created";
      }

      return "User exists";
    } catch (err) {
      return "Error: " + err;
    }
  }
}
