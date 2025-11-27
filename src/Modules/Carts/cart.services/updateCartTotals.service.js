import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";

// Update cart totals helper function
export const updateCartTotals = async (cartId) => {
  const cartItems = await CartItem.findAll({ where: { cart_id: cartId } });

  let totalPrice = 0;
  let totalItems = 0;

  cartItems.forEach((item) => {
    totalPrice += parseFloat(item.total_price);
    totalItems += item.quantity;
  });

  const cart = await Cart.findByPk(cartId);
  cart.total_price = totalPrice;
  cart.total_items = totalItems;
  await cart.save();
};
