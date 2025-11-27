import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const Payment = sequelize_config.define(
  "Payment",
  {
    method: {
      type: DataTypes.ENUM("cash", "card"),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: [["pending", "completed", "failed"]],
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
  },
  {
    timestamps: true,
  }
);

export default Payment;