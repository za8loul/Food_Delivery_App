import Joi from "joi";
import { AppError } from "./error-handling.middleware.js";

// Add Cart Item validation schema
export const addCartItemSchema = Joi.object({
  menuItemId: Joi.number().integer().required().messages({
    "number.base": "Menu item ID must be a number",
    "any.required": "Menu item ID is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

// Validation middleware for adding cart items
export const validateAddCartItem = (req, res, next) => {
  const { error, value } = addCartItemSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new AppError(messages.join(", "), 400));
  }

  req.validatedData = value;
  next();
};

// Update quantity validation schema
export const updateQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

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

// Signup validation schema
export const signupSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(30).required(),
  last_name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  gender: Joi.string().valid("male", "female").required(),
  phone_number: Joi.string().trim().required(),
  address: Joi.string().trim().optional(),
});

// Validation middleware for signup
export const validateSignup = (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new AppError(messages.join(", "), 400));
  }

  req.validatedData = value;
  next();
};