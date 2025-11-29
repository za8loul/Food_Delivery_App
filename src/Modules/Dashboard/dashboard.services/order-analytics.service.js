import Orders from "../../../DB/Models/orders.models.js";
import { Op } from "sequelize";
import { sequelize_config } from "../../../DB/db.connection.js";

export const getOrderAnalytics = async () => {
  const totalOrders = await Orders.count();

  const totalRevenue = await Orders.sum("total_price");

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const ordersLast24Hours = await Orders.count({
    where: {
      createdAt: {
        [Op.gte]: twentyFourHoursAgo,
      },
    },
  });

  const orderStatusDistribution = await Orders.findAll({
    attributes: [
      "status",
      [sequelize_config.fn("COUNT", sequelize_config.col("status")), "count"],
    ],
    group: ["status"],
  });

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    ordersLast24Hours,
    orderStatusDistribution,
  };
};
