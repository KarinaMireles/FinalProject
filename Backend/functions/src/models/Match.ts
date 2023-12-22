import mongoose, { Schema } from "mongoose"

export const MatchSchema = new mongoose.Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    user1Status: {
        type: String,
        required: true,
        default: "pending"
    },
    user2Status: {
        type: String,
        required: true,
        default: "pending"
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
},
{ timestamps: true })

MatchSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id.toHexString()
        delete ret._id
        delete ret.__v
    }
})

const Match = mongoose.model("Match", MatchSchema)
export default Match
