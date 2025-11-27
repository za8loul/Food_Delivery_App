import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import "./DB/Models/associations.models.js";
import usersRouter from "./Modules/Users/users.controller.js";
import ordersController from "./Modules/Orders/orders.controller.js";
import paymentsController from "./Modules/Payments/payments.controller.js";
import reviewsController from "./Modules/Reviews/reviews.controller.js";
import menuController from "./Modules/Menu/menu.controller.js";
import { db_connection } from "./DB/db.connection.js";

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

// Database
db_connection();

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Server
const port = +process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});