import User from "../../../DB/Models/user.model.js";
import { Op } from "sequelize";
import Orders from "../../../DB/Models/orders.models.js";
import { sequelize_config } from "../../../DB/db.connection.js";

export const getUserAnalytics = async () => {
  const totalUsers = await User.count();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newUsersLastWeek = await User.count({
    where: {
      createdAt: {
        [Op.gte]: oneWeekAgo,
      },
    },
  });

  const topUsers = await User.findAll({
    attributes: [
      "id",
      "first_name",
      "last_name",
      [
        sequelize_config.literal(
          "(SELECT COUNT(*) FROM Orders WHERE Orders.user_id = User.id)"
        ),
        "ordersCount",
      ],
    ],
    group: ["User.id", "User.first_name", "User.last_name"],
    order: [[sequelize_config.literal("ordersCount"), "DESC"]],
    limit: 5,
  });

  return {
    totalUsers,
    newUsersLastWeek,
    topUsers,
  };
};
