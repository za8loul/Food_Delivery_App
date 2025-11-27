import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { placeOrderService } from "./orders.services/place-order.service.js";

const ordersController = Router();

ordersController.post("/", authenticate, asyncHandler(placeOrderService));

export default ordersController;
