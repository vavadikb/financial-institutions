import express from "express";

import { UserController } from "../controllers/usersController.js";

const userController = new UserController();
const router = express.Router();
router.get("/users", userController.getUser);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.putUser);
router.patch("/users/:id", userController.patchUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
