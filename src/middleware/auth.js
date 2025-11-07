import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";

const authMiddleware = async (req) => {
  const token = req.headers.authorization || "";
  if (!token) return { user: null };
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    const user = await User.findById(decoded.id);
    return { user };
  } catch (err) {
    return { user: null };
  }
};

export default authMiddleware;
