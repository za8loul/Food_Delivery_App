import "dotenv/config";
import express from "express";
import "./DB/Models/associations.models.js";
import usersController from "./Modules/users.controller.js";
import { db_connection } from "./DB/db.connection.js";

const app = express();

// Parsing middleware
app.use(express.json());

// Handle Routes
app.use("/users", usersController);

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