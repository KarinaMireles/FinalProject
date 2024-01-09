import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  // uid: {
  //   type: String,
  //   required: true,
  // },
  spotifyUserId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  genderPreference: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  profilePictures: [
    {
      type: String,
      required: false,
    },
  ],
  bio: {
    type: String,
    required: false,
  },
  topArtists: [
    {
      name: {
        type: String,
        required: true,
      },
      genres: [String], // An array of strings for genres
    },
  ],
  status: {
    type: String,
    required: false,
  },
});

UserProfileSchema.virtual("user1Matches", {
  ref: "Match",
  localField: "_id",
  foreignField: "user1",
});

UserProfileSchema.virtual("user2Matches", {
  ref: "Match",
  localField: "_id",
  foreignField: "user2",
});

UserProfileSchema.set("toObject", { virtuals: true });

UserProfileSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

const UserProfile = mongoose.model("User_Profile", UserProfileSchema);
export default UserProfile;
