import { Router } from "express";
import { asyncHandler } from "../../Utils/async-handler.js";
import { createPayment } from "./payments.services/create-payment.service.js";
import { AppError } from "../../Middlewares/error-handling.middleware.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";

const paymentsController = Router();

const createPaymentControllerFn = asyncHandler(async (req, res, next) => {
  const { order_id, amount, method } = req.body;
  if (!order_id || !amount || !method) {
    return next(new AppError("order_id, amount, and method are required", 400));
  }
  const payment = await createPayment(order_id, amount, method);
  res.status(201).json({ message: "Payment created successfully", payment });
});

paymentsController.post("/", authenticate, createPaymentControllerFn);

export default paymentsController;
