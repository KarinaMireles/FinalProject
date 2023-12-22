import mongoose, { Schema } from "mongoose"

export const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

MessageSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString()
    delete ret._id
    delete ret.__v
  }
})

const Message = mongoose.model("Message", MessageSchema)

export { Message }
