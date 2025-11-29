import MenuItem from "../../../DB/Models/menu-item.models.js";
import Categories from "../../../DB/Models/categories.models.js";

// Edit Menu Item
export const editMenuItemService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await MenuItem.findByPk(id);
    if (!item) {
      return next(new Error("Menu item not found", { cause: 404 }));
    }

    // If a new category is provided, validate it
    if (updateData.category_id) {
      const category = await Categories.findByPk(updateData.category_id);
      if (!category) {
        return next(new Error("Category not found", { cause: 404 }));
      }
    }

    // Update the item with the new data
    Object.assign(item, updateData);

    await item.save();

    res.json({ message: "Menu item updated", item });
  } catch (err) {
    next(err);
  }
};
