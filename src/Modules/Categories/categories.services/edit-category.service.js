import Category from "../../../DB/Models/categories.models.js";

// Edit Category
export const editCategoryService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return next(new Error("Category not found", { cause: 404 }));
    }

    if (name) category.name = name;

    await category.save();
    res.json({ message: "Category updated", category });

  } catch (err) {
    next(err);
  }
};
