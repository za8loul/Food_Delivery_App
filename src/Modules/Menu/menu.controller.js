import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { isAdmin } from "../../Middlewares/authorization.middleware.js";
import { getMenuItems } from "./menu.services/get-menu-items.service.js";
import { addMenuItemService } from "./menu.services/add-menu-item.service.js";
import { editMenuItemService } from "./menu.services/edit-menu-item.service.js";
import { deleteMenuItemService } from "./menu.services/delete-menu-item.service.js";

const menuController = Router();

menuController.get("/", asyncHandler(getMenuItems));

menuController.post(
  "/",
  authenticate,
  isAdmin,
  asyncHandler(addMenuItemService)
);

menuController.put(
  "/:id",
  authenticate,
  isAdmin,
  asyncHandler(editMenuItemService)
);

menuController.delete(
  "/:id",
  authenticate,
  isAdmin,
  asyncHandler(deleteMenuItemService)
);

export default menuController;
