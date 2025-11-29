import Orders from "../../../DB/Models/orders.models.js";

// Update order status
export const updateOrderStatusService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "preparing", "on the way", "delivered", "cancelled"

    const order = await Orders.findByPk(id);
    if (!order) return next(new Error("Order not found", { cause: 404 }));

    if (status) order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    next(err);
  }
};
