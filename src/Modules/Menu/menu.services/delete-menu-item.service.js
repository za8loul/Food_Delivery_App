import MenuItem from "../../../DB/Models/menu-item.models.js";

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
