import express from "express";

import {
  getUser,
  getUserById,
  putUser,
  patchUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();
router.get("/users", getUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", putUser);
router.patch("/users/:id", patchUser);
router.delete("/users/:id", deleteUser);

export default router;
