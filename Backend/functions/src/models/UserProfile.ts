import mongoose, { Schema } from "mongoose"

const UserProfileSchema = new mongoose.Schema(
	{
        uid: {
            type: String,
            required: true
        },
        spotifyUserId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        genderPreference: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        profilePictures: [{
            type: String,
            required: true
        }],
        bio: {
            type: String,
            required: false
        },
        preferences: {
            genres: {
                type: [String]
            },
            artists: {
                type: [String]
            }
        },
        status: {
            type: String,
            required: true
        }
	}
)

UserProfileSchema.virtual('user1Matches', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'user1'
})
  
UserProfileSchema.virtual('user2Matches', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'user2'
})

UserProfileSchema.set('toObject', { virtuals: true })

UserProfileSchema.set("toJSON", {
    virtuals: true,
	transform: function (doc, ret) {
		ret.id = ret._id.toHexString()
		delete ret._id
		delete ret.__v
	}
})

const UserProfile = mongoose.model("Final_Project", UserProfileSchema)
export default UserProfile
