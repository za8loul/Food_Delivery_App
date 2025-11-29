import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const Orders = sequelize_config.define(
  "Orders",
  {
    status: {
      type: DataTypes.ENUM("preparing", "on the way", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "preparing",
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: [["preparing", "on the way", "delivered", "cancelled"]],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Orders;