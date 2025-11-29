import Categories from "../../../DB/Models/categories.models.js";
import MenuItem from "../../../DB/Models/menu-item.models.js";
import OrderItem from "../../../DB/Models/order-item.models.js";
import { sequelize_config } from "../../../DB/db.connection.js";

export const getCategoryAnalytics = async () => {
  const topCategories = await Categories.findAll({
    attributes: [
      "id",
      "name",
      [
        sequelize_config.literal(
          "(SELECT COUNT(*) FROM MenuItems WHERE MenuItems.category_id = `Category`.`id`)"
        ),
        "menuItemsCount",
      ],
      [
        sequelize_config.literal(
          "(SELECT SUM(quantity) FROM OrderItems INNER JOIN MenuItems ON OrderItems.menu_item_id = MenuItems.id WHERE MenuItems.category_id = `Category`.`id`)"
        ),
        "totalQuantity",
      ],
    ],
    group: ["`Category`.`id`", "`Category`.`name`"],
    order: [[sequelize_config.literal("totalQuantity"), "DESC"]],
    limit: 5,
  });

  return {
    topCategories,
  };
};
