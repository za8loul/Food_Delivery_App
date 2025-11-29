import Category from "../../../DB/Models/categories.models.js";

// List Categories
export const listCategoriesService = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });

  } catch (err) {
    next(err);
  }
};
