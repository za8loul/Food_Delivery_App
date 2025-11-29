import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";
import Orders from "../../../DB/Models/orders.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import Payment from "../../../DB/Models/payment.models.js";
import { sequelize_config } from "../../../DB/db.connection.js";
import { AppError } from "../../../Middlewares/error-handling.middleware.js";
import { randomUUID } from "crypto";

export const placeOrderService = async (req, res, next) => {
  const { delivery_address, paymentMethod } = req.body;
  if (!delivery_address) {
    return next(new AppError("Delivery address is required", 400));
  }
  if (!paymentMethod || !["cash", "card"].includes(paymentMethod)) {
    return next(
      new AppError("Invalid or no payment method provided", 400)
    );
  }

  const t = await sequelize_config.transaction();
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [{ model: CartItem, as: "items" }],
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError("Cart is empty", 404);
    }

    const order = await Orders.create(
      {
        user_id: req.user.id,
        total_price: cart.total_price,
        delivery_address,
      },
      { transaction: t }
    );

    const orderItems = cart.items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      price: item.unit_price,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction: t });

    await CartItem.destroy({ where: { cart_id: cart.id }, transaction: t });
    await cart.update(
      { total_price: 0, total_items: 0 },
      { transaction: t }
    );

    const payment = await Payment.create(
      {
        order_id: order.id,
        amount: order.total_price,
        method: paymentMethod,
        status: "completed",
        transaction_id: randomUUID(),
      },
      { transaction: t }
    );

    await t.commit();

    res
      .status(201)
      .json({
        message: "Order created and paid successfully",
        order,
        payment,
      });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
