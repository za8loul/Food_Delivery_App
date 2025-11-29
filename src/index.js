import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { db_connection } from "./DB/db.connection.js";
import "./DB/Models/associations.models.js";
import CartItem from "./DB/Models/cart-items.model.js";
import { globalErrorHandler } from "./Middlewares/error-handling.middleware.js";
import cartsController from "./Modules/Carts/cart.controller.js";
import categoriesController from "./Modules/Categories/categories.controller.js";
import dashboardController from "./Modules/Dashboard/dashboard.controller.js";
import menuController from "./Modules/Menu/menu.controller.js";
import ordersController from "./Modules/Orders/orders.controller.js";
import paymentsController from "./Modules/Payments/payments.controller.js";
import reviewsController from "./Modules/Reviews/reviews.controller.js";
import usersRouter from "./Modules/Users/users.controller.js";

const app = express();

// Parsing middleware
app.use(express.json());
app.use(cookieParser());

// Handle Routes
app.use("/users", usersRouter);
app.use("/orders", ordersController);
app.use("/payments", paymentsController);
app.use("/reviews", reviewsController);
app.use("/menu", menuController);
app.use("/categories", categoriesController);
app.use("/dashboard", dashboardController);
app.use("/carts", cartsController);

// IIFE to handle async startup
(async () => {
  // Database
  await CartItem.destroy({ truncate: true });
  db_connection();

  // Error handling middleware
  app.use(globalErrorHandler);

  // Not found middleware
  app.use((req, res) => {
    res.status(404).send("Not Found");
  });

  // Server
  const port = +process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
