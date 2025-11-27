import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../DB/Models/users.model.js";
import { AppError } from "./error-handling.middleware.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

// Direct authentication middleware (no need to call as function)
export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith("Bearer ")) {
      return next(new AppError("Invalid token prefix", 400));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);

    if (!decoded?.id) {
      return next(new AppError("Invalid token payload", 400));
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    }
    return next(new AppError("Authentication error", 500));
  }
};
