import { Sequelize } from "sequelize";

const connectionString = process.env.DATABASE_URL;

// Parse SQLite or standard database URL
let sequelizeOptions = {};

if (connectionString.includes("sqlite")) {
  sequelizeOptions = {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  };
} else {
  sequelizeOptions = {
    logging: false,
  };
}

export const sequelize_config = new Sequelize(connectionString, sequelizeOptions);

export const db_connection = async() =>{
    try{
        // Import models after sequelize_config is defined
        const User = (await import("./Models/users.model.js")).default;
        const Cart = (await import("./Models/cart.model.js")).default;
        const CartItem = (await import("./Models/cart-items.model.js")).default;

        // Define associations
        User.hasOne(Cart, { foreignKey: "user_id" });
        Cart.belongsTo(User, { foreignKey: "user_id" });

        Cart.hasMany(CartItem, { foreignKey: "cart_id", onDelete: "CASCADE" });
        CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

        await sequelize_config.sync({force: false, alter: true});
        await sequelize_config.authenticate();
        console.log("Database connected successfully");
    }catch(error){
        console.log('Error connecting to the database', error);
    }
}