import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const OrderItem = sequelize_config.define(
  "OrderItem",
  {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    total_price: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.quantity * this.price;
      },
    },
  },
  {
    timestamps: true,
  }
);

export default OrderItem;