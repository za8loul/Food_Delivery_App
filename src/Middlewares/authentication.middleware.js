import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../DB/Models/users.model.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization?.startsWith("Bearer ")) {
        return next(new Error("Invalid token prefix", { cause: 400 }));
      }

      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, secretKey);

      if (!decoded?.id) {
        return next(new Error("Invalid token payload", { cause: 400 }));
      }

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return next(new Error("User not found", { cause: 404 }));
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new Error("Token expired", { cause: 401 }));
      }
      return next(new Error("Authentication error", { cause: 500 }));
    }
  };
};
