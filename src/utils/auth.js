import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";

export const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    return await User.findById(decoded._id);
  } catch {
    return null;
  }
};

export const createToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
};
