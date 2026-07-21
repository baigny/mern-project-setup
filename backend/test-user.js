import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import User from "./src/models/user.js";

await connectDB();

const user = await User.create({
  name: "Test User",
  email: "youremail@example.com",
  password: "secret123",
});

console.log("Stored user:", user.toJSON());                 // no password field
console.log("Correct password?", await user.matchPassword("secret123")); // true
console.log("Wrong password?", await user.matchPassword("nope"));        // false

await User.deleteOne({ _id: user._id });                    // clean up
await mongoose.disconnect();
