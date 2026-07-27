import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import User from "./src/models/user.js";

await connectDB();

const user = await User.create({
  username: "Test User",
  email: "youremail@example.com",
  password: "secret123",
});

console.log("Stored user:", user.toJSON());                 // no password field
console.log("Correct password?", await user.comparePassword("secret123")); // true
console.log("Wrong password?", await user.comparePassword("nope"));        // false

await User.deleteOne({ _id: user._id });                    // clean up
await mongoose.disconnect();
