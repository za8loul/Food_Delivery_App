import { Sequelize } from "sequelize";

export const sequelize_config = new Sequelize(process.env.DATABASE_URL, {
  logging: true,
});

export const db_connection = async () => {
  try {
    // Import models after sequelize_config is defined
    const User = (await import("./Models/users.model.js")).default;
    const Cart = (await import("./Models/cart.model.js")).default;
    const CartItem = (await import("./Models/cart-items.model.js")).default;
    const Orders = (await import("./Models/orders.models.js")).default;

    // Define associations
    User.hasOne(Cart, { foreignKey: "user_id" });
    Cart.belongsTo(User, { foreignKey: "user_id" });

    Cart.hasMany(CartItem, { foreignKey: "cart_id", onDelete: "CASCADE" });
    CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

    User.hasMany(Orders, { foreignKey: "user_id" });
    Orders.belongsTo(User, { foreignKey: "user_id" });

    await sequelize_config.sync({ force: false, alter: true });
    await sequelize_config.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};