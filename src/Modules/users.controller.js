import { Router } from "express";
import loginservice from "./users.services/login.service.js";

const usersController = Router();


usersController.post("/login", loginservice);









export default usersController;