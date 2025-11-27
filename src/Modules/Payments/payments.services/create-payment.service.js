import Payment from "../../../DB/Models/payment.models.js";
import Orders from "../../../DB/Models/orders.models.js";
import { AppError } from "../../../Middlewares/error-handling.middleware.js";

export const createPayment = async (order_id, amount, method) => {
  const order = await Orders.findByPk(order_id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.total_price !== amount) {
    throw new AppError("Invalid payment amount", 400);
  }

  let payment_status = "completed";
  if (method === "cash") {
    payment_status = "pending";
  }

  const payment = await Payment.create({
    order_id,
    amount,
    method,
    status: payment_status,
  });

  return payment;
};
