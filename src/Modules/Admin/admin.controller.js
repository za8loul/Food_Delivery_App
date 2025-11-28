import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { adminAuth } from "./admin.middleware.js";
import { adminLoginService } from "./admin.services/login-admin.service.js";

// Import all service functions
import {
  addCategoryService,
  deleteCategoryService,
  editCategoryService,
  listCategoriesService
} from "./admin.services/manage-categories.service.js";

import {
  addMenuItemService,
  deleteMenuItemService,
  editMenuItemService,
  listMenuItemsService
} from "./admin.services/manage-menu.service.js";

import {
  listUsersService,
} from "./admin.services/manage-users.service.js";

import {
  listOrdersService,
  updateOrderStatusService
} from "./admin.services/manage-orders.service.js";

const adminController = Router();

// PUBLIC ROUTES
// Admin login (no auth needed)
adminController.post("/login", asyncHandler(adminLoginService));

// PROTECTED ROUTES
// All routes below require admin authentication
adminController.use(adminAuth);

// Example dashboard route
adminController.get("/dashboard", (req, res) => {
  res.json({ message: "Admin dashboard access granted" });
});

// CATEGORY ROUTES
adminController.post("/categories", asyncHandler(addCategoryService));
adminController.put("/categories/:id", asyncHandler(editCategoryService));
adminController.delete("/categories/:id", asyncHandler(deleteCategoryService));
adminController.get("/categories", asyncHandler(listCategoriesService));

// MENU ROUTES
adminController.post("/menu", asyncHandler(addMenuItemService));
adminController.put("/menu/:id", asyncHandler(editMenuItemService));
adminController.delete("/menu/:id", asyncHandler(deleteMenuItemService));
adminController.get("/menu", asyncHandler(listMenuItemsService));

// USER ROUTES
adminController.get("/users", asyncHandler(listUsersService));

// ORDER ROUTES
adminController.get("/orders", asyncHandler(listOrdersService));
adminController.patch("/orders/:id/status", asyncHandler(updateOrderStatusService));

export default adminController;