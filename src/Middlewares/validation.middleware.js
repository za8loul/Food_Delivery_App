import Joi from "joi";
import { AppError } from "./error-handling.middleware.js";

// Cart Item validation schema
export const cartItemSchema = Joi.object({
  product_id: Joi.number().integer().required().messages({
    "number.base": "Product ID must be a number",
    "any.required": "Product ID is required",
  }),
  product_name: Joi.string().trim().max(100).required().messages({
    "string.base": "Product name must be a string",
    "string.max": "Product name must not exceed 100 characters",
    "any.required": "Product name is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
  unit_price: Joi.number().positive().required().messages({
    "number.base": "Unit price must be a number",
    "number.positive": "Unit price must be positive",
    "any.required": "Unit price is required",
  }),
  notes: Joi.string().trim().max(500).optional().messages({
    "string.max": "Notes must not exceed 500 characters",
  }),
});

// Update quantity validation schema
export const updateQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

// Validation middleware for cart items
export const validateCartItem = (req, res, next) => {
  const { error, value } = cartItemSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new AppError(messages.join(", "), 400));
  }

  req.validatedData = value;
  next();
};

// Validation middleware for update quantity
export const validateUpdateQuantity = (req, res, next) => {
  const { error, value } = updateQuantitySchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new AppError(messages.join(", "), 400));
  }

  req.validatedData = value;
  next();
};

// Review validation schema
export const reviewSchema = Joi.object({
  menu_item_id: Joi.number().integer().required().messages({
    "number.base": "Menu item ID must be a number",
    "any.required": "Menu item ID is required",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
    "any.required": "Rating is required",
  }),
  comment: Joi.string().trim().max(500).optional().messages({
    "string.max": "Comment must not exceed 500 characters",
  }),
});

// Validation middleware for review creation
export const validateReviewCreation = (req, res, next) => {
  const { error, value } = reviewSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new AppError(messages.join(", "), 400));
  }

  req.validatedData = value;
  next();
};
