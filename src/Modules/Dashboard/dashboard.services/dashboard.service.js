import { getUserAnalytics } from "./user-analytics.service.js";
import { getOrderAnalytics } from "./order-analytics.service.js";
import { getMenuItemAnalytics } from "./menu-item-analytics.service.js";
import { getCategoryAnalytics } from "./category-analytics.service.js";

export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const userAnalytics = await getUserAnalytics();
    const orderAnalytics = await getOrderAnalytics();
    const menuItemAnalytics = await getMenuItemAnalytics();
    const categoryAnalytics = await getCategoryAnalytics();

    res.json({
      userAnalytics,
      orderAnalytics,
      menuItemAnalytics,
      categoryAnalytics,
    });
  } catch (err) {
    next(err);
  }
};
