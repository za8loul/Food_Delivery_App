import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";
import { updateCartTotals } from "./updateCartTotals.service.js";

// Add item to cart
export const addItemToCart = async (userId, itemData) => {
  const { product_id, product_name, quantity, unit_price, notes } = itemData;

  let cart = await Cart.findOne({ where: { user_id: userId } });

  if (!cart) {
    cart = await Cart.create({
      user_id: userId,
      total_price: 0,
      total_items: 0,
    });
  }

  // Check if item already exists in cart
  let cartItem = await CartItem.findOne({
    where: { cart_id: cart.id, product_id },
  });

  const itemTotalPrice = quantity * unit_price;

  if (cartItem) {
    // Update quantity and price
    cartItem.quantity += quantity;
    cartItem.total_price = cartItem.quantity * cartItem.unit_price;
    await cartItem.save();
  } else {
    // Create new cart item
    cartItem = await CartItem.create({
      cart_id: cart.id,
      product_id,
      product_name,
      quantity,
      unit_price,
      total_price: itemTotalPrice,
      notes,
    });
  }

  // Update cart totals
  await updateCartTotals(cart.id);

  return cart;
};
