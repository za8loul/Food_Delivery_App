import Category from "../../../DB/Models/categories.models.js";

// Delete Category
export const deleteCategoryService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return next(new Error("Category not found", { cause: 404 }));
    }

    await category.destroy();
    res.json({ message: "Category deleted" });

  } catch (err) {
    next(err);
  }
};
