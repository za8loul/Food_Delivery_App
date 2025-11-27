import Cart from "../DB/Models/cart.model.js";
import CartItem from "../DB/Models/cart-items.model.js";
import { AppError } from "../Middlewares/error-handling.middleware.js";

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

// Update cart totals helper function
const updateCartTotals = async (cartId) => {
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

// Empty cart (for checkout)
export const emptyCart = async (userId) => {
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
