import MenuItem from "../../../DB/Models/menu-item.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import Orders from "../../../DB/Models/orders.models.js";
import User from "../../../DB/Models/user.model.js";

// List all orders with items and user info
export const listOrdersService = async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] },
        { model: OrderItem, as: "items", include: [{ model: MenuItem, as: "order_item" }] },
      ],
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

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
