import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const Categories = sequelize_config.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Categories;