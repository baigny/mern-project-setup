import jwt from "jsonwebtoken";
import ApiError from "../utils/api-errors.js";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token missing");
  }

  const token = header.split(" ")[1];

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(payload.id).select("-password");
  if (!user) throw new ApiError(401, "User no longer exists");

  req.user = user; // available to every handler after this
  next();
};