import { Router } from "express";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { asyncHandler } from "../../Utils/async-handler.js";
import { getCart } from "./cart.services/getCart.service.js";
import { addItemToCart } from "./cart.services/addItemToCart.service.js";
import { removeItemFromCart } from "./cart.services/removeItemFromCart.service.js";
import { updateItemQuantity } from "./cart.services/updateItemQuantity.service.js";
import { clearCart } from "./cart.services/clearCart.service.js";
import { emptyCart } from "./cart.services/emptyCart.service.js";
import { validateAddCartItem } from "../../Middlewares/validation.middleware.js";

const router = Router();

// Get user's cart
router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const cart = await getCart(req.user.id);
    res.status(200).json({
      status: "success",
      message: "Cart retrieved successfully",
      data: cart,
    });
  })
);

// Add item to cart
router.post(
  "/add",
  authenticate,
  validateAddCartItem,
  asyncHandler(async (req, res) => {
    const { menuItemId, quantity } = req.body;

    const cart = await addItemToCart(req.user.id, {
      menuItemId,
      quantity: parseInt(quantity),
    });

    res.status(201).json({
      status: "success",
      message: "Item added to cart successfully",
      data: cart,
    });
  })
);

// Update item quantity in cart
router.patch(
  "/items/:itemId",
  authenticate,
  asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Quantity must be at least 1",
      });
    }

    const cart = await updateItemQuantity(req.user.id, req.params.itemId, quantity);

    res.status(200).json({
      status: "success",
      message: "Item quantity updated successfully",
      data: cart,
    });
  })
);

// Remove item from cart
router.delete(
  "/items/:itemId",
  authenticate,
  asyncHandler(async (req, res) => {
    const cart = await removeItemFromCart(req.user.id, req.params.itemId);

    res.status(200).json({
      status: "success",
      message: "Item removed from cart successfully",
      data: cart,
    });
  })
);

// Clear all items from cart
router.delete(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const cart = await clearCart(req.user.id);

    res.status(200).json({
      status: "success",
      message: "Cart cleared successfully",
      data: cart,
    });
  })
);

// Empty cart (for checkout)
router.post(
  "/checkout/empty",
  authenticate,
  asyncHandler(async (req, res) => {
    const cart = await emptyCart(req.user.id);

    res.status(200).json({
      status: "success",
      message: "Cart emptied successfully",
      data: cart,
    });
  })
);

export default router;
