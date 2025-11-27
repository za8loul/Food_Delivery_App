import MenuItem from "../../../DB/Models/menu-item.models.js";
import Categories from "../../../DB/Models/categories.models.js";
import { Op } from "sequelize";

export const getMenuItems = async (req, res, next) => {
  const { category_id, search } = req.query;
  const filter = {};

  if (category_id) {
    filter.category_id = category_id;
  }

  if (search) {
    filter[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  const menuItems = await MenuItem.findAll({
    where: filter,
    include: {
      model: Categories,
      attributes: ["name"],
    },
  });

  res.status(200).json({ message: "Menu items fetched successfully", menuItems });
};
