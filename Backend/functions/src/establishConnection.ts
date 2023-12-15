import * as functions from "firebase-functions"
import mongoose from "mongoose"

const uri = functions.config().mongodb.uri

mongoose.connect(uri)

const connection = mongoose.connection

connection.on(
 "error",
 console.error.bind(console, "MongoDB connection error:")
)
connection.once("open", () => {
 console.log("Connected to MongoDB successfully")
})

const establishConnection = async () => {
 if (mongoose.connection.readyState === 0) {
  console.log("Re-establishing MongoDB connection...")
  await mongoose.connect(uri)
 }
 return connection
}
export default establishConnection
