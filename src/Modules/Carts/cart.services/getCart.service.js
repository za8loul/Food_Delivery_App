import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";

// Get user's cart
export const getCart = async (userId) => {
  let cart = await Cart.findOne({
    where: { user_id: userId },
    include: [{ model: CartItem }],
  });

  if (!cart) {
    // Create a new empty cart if doesn't exist
    cart = await Cart.create({
      user_id: userId,
      restaurant_id: null,
      total_price: 0,
      total_items: 0,
    });
    cart.CartItems = [];
  }

  return cart;
};
