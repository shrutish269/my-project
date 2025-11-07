import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config.js";

export default {
  Query: {
    me: (_, __, { user }) => user
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const hashed = await bcrypt.hash(input.password, 10);
      const user = await User.create({ ...input, password: hashed, role: "customer" });
      return user;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    }
  }
};
