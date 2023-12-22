import mongoose, { Schema } from "mongoose"

const FinalProjectSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

FinalProjectSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id.toHexString()
		delete ret._id
		delete ret.__v
	}
})

const FinalProject = mongoose.model("Final_Project", FinalProjectSchema)
export default FinalProject
