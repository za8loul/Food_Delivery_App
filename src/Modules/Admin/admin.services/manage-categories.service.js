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

// List Categories
export const listCategoriesService = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });

  } catch (err) {
    next(err);
  }
};
