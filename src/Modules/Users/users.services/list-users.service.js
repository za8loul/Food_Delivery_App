import Orders from "../../../DB/Models/orders.models.js";
import User from "../../../DB/Models/user.model.js";

// List all users with their orders
export const listUsersService = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "first_name", "last_name", "email", "role", "gender", "phone_number", "address"],
      include: [
        {
          model: Orders,
          as: "orders",
        },
      ],
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
};
