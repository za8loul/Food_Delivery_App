import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { isAdmin } from "../../Middlewares/authorization.middleware.js";
import { addCategoryService } from "./categories.services/add-category.service.js";
import { deleteCategoryService } from "./categories.services/delete-category.service.js";
import { editCategoryService } from "./categories.services/edit-category.service.js";
import { listCategoriesService } from "./categories.services/list-categories.service.js";

const categoriesController = Router();

categoriesController.get("/", asyncHandler(listCategoriesService));

categoriesController.post(
  "/",
  authenticate,
  isAdmin,
  asyncHandler(addCategoryService)
);

categoriesController.put(
  "/:id",
  authenticate,
  isAdmin,
  asyncHandler(editCategoryService)
);

categoriesController.delete(
  "/:id",
  authenticate,
  isAdmin,
  asyncHandler(deleteCategoryService)
);

export default categoriesController;
