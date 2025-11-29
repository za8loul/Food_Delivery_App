import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { isAdmin } from "../../Middlewares/authorization.middleware.js";
import { listUsersService } from "./users.services/list-users.service.js";
import loginservice from "./users.services/login.service.js";
import { adminLoginService } from "./users.services/login-admin.service.js";
import { refreshTokenService } from "./users.services/refresh-token.service.js";
import { signupService } from "./users.services/signup.service.js";

import { validateSignup } from "../../Middlewares/validation.middleware.js";

const usersController = Router();

usersController.post("/login", asyncHandler(loginservice));
usersController.post("/admin/login", asyncHandler(adminLoginService));

usersController.post("/signup", validateSignup, asyncHandler(signupService));

usersController.post("/refresh-token", asyncHandler(refreshTokenService));

usersController.get(
  "/",
  authenticate,
  isAdmin,
  asyncHandler(listUsersService)
);

export default usersController;