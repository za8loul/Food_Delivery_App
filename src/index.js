import 'dotenv/config';
import express from "express";
import usersController from "./Modules/Users/users.controller.js";
import cartController from "./Modules/Carts/cart.controller.js";
import {db_connection} from "./DB/db.connection.js";
import { globalErrorHandler } from './Middlewares/error-handling.middleware.js';

import cookieParser from 'cookie-parser';

const app = express();

// Parsing middleware
app.use(express.json());
app.use(cookieParser());

// Handle Routes 
app.use("/users", usersController);
app.use("/cart", cartController);

// Database
await db_connection();


// Error handling middleware
app.use(globalErrorHandler);

// Not found middleware
app.use((req , res) =>{
    res.status(404).send("Not Found");
});

// Server
const port = +process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`); 
});