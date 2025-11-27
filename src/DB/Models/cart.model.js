import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const Cart = sequelize_config.define(
  "Cart",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      allowNull: false,
    },
    total_items: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Cart;
