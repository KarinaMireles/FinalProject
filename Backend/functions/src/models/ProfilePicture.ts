import mongoose from 'mongoose'

const ProfilePictureSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

ProfilePictureSchema.set("toJSON", {
    virtuals: true,
	transform: function (doc, ret) {
		ret.id = ret._id.toHexString()
		delete ret._id
		delete ret.__v
	}
})

const ProfilePicture = mongoose.model('Profile_Picture', ProfilePictureSchema)
export default ProfilePicture
