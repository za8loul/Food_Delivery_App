import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const User = sequelize_config.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
          is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          isStrongPassword(value) {
            if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
                value
              )
            ) {
              throw new Error(
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
              );
            }
          },
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING(100),
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          fields: ["phone_number"],
        },
        {
          fields: ["email"],
        },
      ],
    }
  );

export default User;