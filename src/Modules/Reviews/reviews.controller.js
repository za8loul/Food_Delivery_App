import { Router } from "express";
import { createReview } from "./reviews.services/create-review.service.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { validateReviewCreation } from "../../Middlewares/validation.middleware.js";

const reviewsController = Router();

reviewsController.post("/", authenticate, validateReviewCreation, createReview);

export default reviewsController;
