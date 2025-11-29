import { AppError } from "./error-handling.middleware.js";

export const isAdmin = (req, res, next) => {
  if (req.auth.role !== "admin") {
    return next(new AppError("Admin access only", 403));
  }
  next();
};
