import { Router } from "express";
import { authenticate } from "../Middlewares/authentication.middleware.js";
import { asyncHandler } from "../Utils/async-handler.js";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
  emptyCart,
} from "./cart.services.js";
import { validateCartItem } from "../Middlewares/validation.middleware.js";

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
  validateCartItem,
  asyncHandler(async (req, res) => {
    const { product_id, product_name, quantity, unit_price, notes } = req.body;

    const cart = await addItemToCart(req.user.id, {
      product_id,
      product_name,
      quantity: parseInt(quantity),
      unit_price: parseFloat(unit_price),
      notes,
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
