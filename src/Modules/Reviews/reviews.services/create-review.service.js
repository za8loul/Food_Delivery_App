import Reviews from "../../../DB/Models/reviews.models.js";
import Orders from "../../../DB/Models/orders.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import { AppError } from "../../../Middlewares/error-handling.middleware.js";
import { asyncHandler } from "../../../Utils/async-handler.js"; // Import asyncHandler

export const createReview = asyncHandler(async (req, res, next) => {
  const { menu_item_id, rating, comment } = req.validatedData;
  const user_id = req.user.id;

  const hasUserReviewed = await Reviews.findOne({
    where: {
      user_id,
      menu_item_id,
    },
  });
  if (hasUserReviewed) {
    throw new AppError("You have already reviewed this item", 400);
  }

  const orders = await Orders.findAll({
    where: { user_id },
    attributes: ["id"],
  });

  if (!orders.length) {
    throw new AppError("You have not ordered this item yet", 403);
  }

  const orderIds = orders.map((order) => order.id);

  const orderItem = await OrderItem.findOne({
    where: {
      order_id: orderIds,
      menu_item_id,
    },
  });

  if (!orderItem) {
    throw new AppError("You have not ordered this item yet", 403);
  }

  const review = await Reviews.create({
    user_id,
    menu_item_id,
    rating,
    comment,
  });

  res.status(201).json({ message: "Review created successfully", review });
});
