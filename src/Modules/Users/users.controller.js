import { Router } from "express";
import loginservice from "./users.services/login.service.js";
import { signupService } from "./users.services/signup.service.js";
import { refreshTokenService } from "./users.services/refresh-token.service.js";
import { asyncHandler } from "../../Utils/async-handler.js";


const usersController = Router();



usersController.post("/login", asyncHandler(loginservice));

usersController.post("/signup", asyncHandler(signupService));

usersController.post("/refresh-token", asyncHandler(refreshTokenService));












export default usersController;