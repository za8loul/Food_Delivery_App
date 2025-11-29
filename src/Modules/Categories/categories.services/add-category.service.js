import Category from "../../../DB/Models/categories.models.js";

// Add Category
export const addCategoryService = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(new Error("Category name is required", { cause: 400 }));
    }

    // Prevent duplicates
    const exists = await Category.findOne({ where: { name } });
    if (exists) {
      return next(new Error("Category already exists", { cause: 409 }));
    }

    const category = await Category.create({ name });
    res.json({ message: "Category added", category });

  } catch (err) {
    next(err);
  }
};
