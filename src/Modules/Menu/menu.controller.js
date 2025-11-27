import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { getMenuItems } from "./menu.services/get-menu-items.service.js";

const menuController = Router();

menuController.get("/", asyncHandler(getMenuItems));

export default menuController;
