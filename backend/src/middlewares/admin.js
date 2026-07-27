import ApiError from "../utils/api-errors.js";

// Runs AFTER authenticate, which sets req.user
export const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    throw new ApiError(403, "Admin access required");
  }
  next();
};