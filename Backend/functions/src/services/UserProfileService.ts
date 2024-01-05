import establishConnection from "../establishConnection";
import UserProfile from "../models/UserProfile";

export const createUserProfile = async (spotifyUserId: string, displayName: string): Promise<any> => {
  await establishConnection();
  try {
    let user = await UserProfile.findOne({ spotifyUserId });
    if (!user) user = await UserProfile.create({ spotifyUserId, displayName });
    return user
  } catch (err) {
    return "Error: " + err;
  }
}

// export class UserProfileService {
//   static async createUserProfile(
//     spotifyUserId: string,
//     username: string, // Changed from displayName to username
//     dob: string,
//     gender: string,
//     genderPreference: string,
//     location: string,
//     profilePictures: string[],
//     status: string,
//     bio: string = "", // Optional with default value
//     preferences: { genres: string[], artists: string[] } = { genres: [], artists: [] }
//   ): Promise<string> {
//     await establishConnection();
//     try {
//       let user = await UserProfile.findOne({ spotifyUserId });

//       if (!user) {
//         user = await UserProfile.create({
//           spotifyUserId,
//           username,
//           dob,
//           gender,
//           genderPreference,
//           location,
//           profilePictures,
//           status,
//           bio,
//           preferences
//         });

//         return "User created";
//       }

//       return "User exists";
//     } catch (err) {
//       return "Error: " + err;
//     }
//   }
// }
