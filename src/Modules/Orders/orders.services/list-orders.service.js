import MenuItem from "../../../DB/Models/menu-item.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import Orders from "../../../DB/Models/orders.models.js";
import User from "../../../DB/Models/user.model.js";

// List all orders with items and user info
export const listOrdersService = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const whereClause = {};
    if (orderId) {
      whereClause.id = orderId;
    }

    const orders = await Orders.findAll({
      where: whereClause,
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
