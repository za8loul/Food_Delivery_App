import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const MenuItem = sequelize_config.define(
  "MenuItem",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

export default MenuItem;