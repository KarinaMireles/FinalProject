import mongoose, { Schema } from "mongoose"

export const ChatSchema = new mongoose.Schema(
  {
    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
  },
  { timestamps: true }
)

ChatSchema.set("toJSON", {
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString()
      delete ret._id
      delete ret.__v
    }
})

const Chat = mongoose.model("Chat", ChatSchema)

export { Chat }
