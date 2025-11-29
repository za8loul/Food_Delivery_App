import MenuItem from "../../../DB/Models/menu-item.models.js";
import Categories from "../../../DB/Models/categories.models.js";

// Add Menu Item
export const addMenuItemService = async (req, res, next) => {
  try {
    const { name, price, category_id, description, image_url, isAvailable } = req.body;
    if (!name || !price || !category_id || !description || !image_url)
      return next(new Error("Missing fields", { cause: 400 }));

    const category = await Categories.findByPk(category_id);
    if (!category) return next(new Error("Category not found", { cause: 404 }));

    const item = await MenuItem.create({ name, price, category_id, description, image_url, isAvailable });
    res.json({ message: "Menu item added", item });
  } catch (err) {
    next(err);
  }
};
