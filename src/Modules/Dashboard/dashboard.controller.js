import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { isAdmin } from "../../Middlewares/authorization.middleware.js";
import { getDashboardAnalytics } from "./dashboard.services/dashboard.service.js";

const dashboardController = Router();

dashboardController.get(
  "/",
  authenticate,
  isAdmin,
  asyncHandler(getDashboardAnalytics)
);

export default dashboardController;
