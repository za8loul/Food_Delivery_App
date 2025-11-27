import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";
import { AppError } from "../../../Middlewares/error-handling.middleware.js";
import { updateCartTotals } from "./updateCartTotals.service.js";

// Remove item from cart
export const removeItemFromCart = async (userId, itemId) => {
  const cart = await Cart.findOne({ where: { user_id: userId } });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const cartItem = await CartItem.findOne({
    where: { id: itemId, cart_id: cart.id },
  });

  if (!cartItem) {
    throw new AppError("Item not found in cart", 404);
  }

  await cartItem.destroy();

  // Update cart totals
  await updateCartTotals(cart.id);

  return cart;
};
