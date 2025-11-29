import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { isAdmin } from "../../Middlewares/authorization.middleware.js";
import { placeOrderService } from "./orders.services/place-order.service.js";
import { listOrdersService } from "./orders.services/list-orders.service.js";
import { listUserOrdersService } from "./orders.services/list-user-orders.service.js";
import { updateOrderStatusService } from "./orders.services/update-order-status.service.js";

const ordersController = Router();

ordersController.post("/", authenticate, asyncHandler(placeOrderService));

ordersController.get(
  "/my-orders",
  authenticate,
  asyncHandler(listUserOrdersService)
);

ordersController.get(
  "/",
  authenticate,
  isAdmin,
  asyncHandler(listOrdersService)
);

ordersController.patch(
  "/:id/status",
  authenticate,
  isAdmin,
  asyncHandler(updateOrderStatusService)
);

export default ordersController;
