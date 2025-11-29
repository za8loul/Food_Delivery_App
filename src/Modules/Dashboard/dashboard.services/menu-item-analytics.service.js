import MenuItem from "../../../DB/Models/menu-item.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import Reviews from "../../../DB/Models/reviews.models.js";
import { sequelize_config } from "../../../DB/db.connection.js";

export const getMenuItemAnalytics = async () => {
  const totalMenuItems = await MenuItem.count();

  const topSellingItems = await MenuItem.findAll({
    attributes: [
      "id",
      "name",
      [
        sequelize_config.literal(
          "(SELECT SUM(quantity) FROM OrderItems WHERE OrderItems.menu_item_id = MenuItem.id)"
        ),
        "totalQuantity",
      ],
      [
        sequelize_config.literal(
          "(SELECT SUM(quantity * price) FROM OrderItems WHERE OrderItems.menu_item_id = MenuItem.id)"
        ),
        "totalRevenue",
      ],
    ],
    group: ["MenuItem.id", "MenuItem.name"],
    order: [[sequelize_config.literal("totalQuantity"), "DESC"]],
    limit: 5,
  });

  const mostReviewedItems = await MenuItem.findAll({
    attributes: [
      "id",
      "name",
      [
        sequelize_config.literal(
          "(SELECT COUNT(*) FROM Reviews WHERE Reviews.menu_item_id = MenuItem.id)"
        ),
        "reviewsCount",
      ],
    ],
    group: ["MenuItem.id", "MenuItem.name"],
    order: [[sequelize_config.literal("reviewsCount"), "DESC"]],
    limit: 5,
  });

  const topRatedItems = await MenuItem.findAll({
    attributes: [
      "id",
      "name",
      [
        sequelize_config.literal(
          "(SELECT AVG(rating) FROM Reviews WHERE Reviews.menu_item_id = MenuItem.id)"
        ),
        "averageRating",
      ],
    ],
    group: ["MenuItem.id", "MenuItem.name"],
    order: [[sequelize_config.literal("averageRating"), "DESC"]],
    limit: 5,
  });

  return {
    totalMenuItems,
    topSellingItems,
    mostReviewedItems,
    topRatedItems,
  };
};
