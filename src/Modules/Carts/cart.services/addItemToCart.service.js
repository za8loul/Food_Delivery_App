import Cart from "../../../DB/Models/cart.model.js";
import CartItem from "../../../DB/Models/cart-items.model.js";
import MenuItem from "../../../DB/Models/menu-item.models.js";
import { updateCartTotals } from "./updateCartTotals.service.js";

// Add item to cart
export const addItemToCart = async (userId, itemData) => {
  const { menuItemId, quantity } = itemData;

  const menuItem = await MenuItem.findByPk(menuItemId);
  if (!menuItem) {
    throw new Error("Menu item not found");
  }

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
    where: { cart_id: cart.id, menu_item_id: menuItemId },
  });

  const itemTotalPrice = quantity * menuItem.price;

  if (cartItem) {
    // Update quantity and price
    cartItem.quantity += quantity;
    cartItem.product_name = menuItem.name;
    cartItem.unit_price = menuItem.price;
    cartItem.total_price = cartItem.quantity * cartItem.unit_price;
    await cartItem.save();
  } else {
    // Create new cart item
    cartItem = await CartItem.create({
      cart_id: cart.id,
      menu_item_id: menuItemId,
      product_name: menuItem.name,
      quantity,
      unit_price: menuItem.price,
      total_price: itemTotalPrice,
    });
  }

  // Update cart totals
  await updateCartTotals(cart.id);

  const updatedCart = await Cart.findByPk(cart.id, { include: "items" });

  return updatedCart;
};
