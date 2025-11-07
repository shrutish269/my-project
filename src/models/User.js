import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "customer" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
