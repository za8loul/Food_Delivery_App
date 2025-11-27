import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";
import { AppError } from "../../../Middlewares/error-handling.middleware.js";
import { updateCartTotals } from "./updateCartTotals.service.js";

// Update item quantity in cart
export const updateItemQuantity = async (userId, itemId, quantity) => {
  if (quantity < 1) {
    throw new AppError("Quantity must be at least 1", 400);
  }

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

  cartItem.quantity = quantity;
  cartItem.total_price = quantity * cartItem.unit_price;
  await cartItem.save();

  // Update cart totals
  await updateCartTotals(cart.id);

  return cart;
};
