import Orders from "../../../DB/Models/orders.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import MenuItem from "../../../DB/Models/menu-item.models.js";

// List all orders for the authenticated user
export const listUserOrdersService = async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: OrderItem, as: "items", include: [{ model: MenuItem, as: "order_item" }] },
      ],
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};
