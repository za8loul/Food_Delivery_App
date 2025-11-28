import Categories from "../../../DB/Models/categories.models.js";
import MenuItem from "../../../DB/Models/menu-item.models.js";

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

// Edit Menu Item
export const editMenuItemService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category_id, description, image_url, isAvailable } = req.body;

    const item = await MenuItem.findByPk(id);
    if (!item) return next(new Error("Menu item not found", { cause: 404 }));

    if (category_id) {
      const category = await Categories.findByPk(category_id);
      if (!category) return next(new Error("Category not found", { cause: 404 }));
      item.category_id = category_id;
    }

    item.name = name || item.name;
    item.price = price || item.price;
    item.description = description || item.description;
    item.image_url = image_url || item.image_url;
    item.isAvailable = isAvailable !== undefined ? isAvailable : item.isAvailable;

    await item.save();
    res.json({ message: "Menu item updated", item });
  } catch (err) {
    next(err);
  }
};

// Delete Menu Item
export const deleteMenuItemService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);
    if (!item) return next(new Error("Menu item not found", { cause: 404 }));

    await item.destroy();
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    next(err);
  }
};

// List Menu Items
export const listMenuItemsService = async (req, res, next) => {
  try {
    const items = await MenuItem.findAll({
      include: [
        {
          model: Categories,
          as: "category",
        },
      ],
    });
    res.json({ items });
  } catch (err) {
    next(err);
  }
};
