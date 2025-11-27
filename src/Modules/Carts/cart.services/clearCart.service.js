import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";
import { AppError } from "../../../Middlewares/error-handling.middleware.js";

// Clear cart
export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ where: { user_id: userId } });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  await CartItem.destroy({ where: { cart_id: cart.id } });

  cart.total_price = 0;
  cart.total_items = 0;
  await cart.save();

  return cart;
};
