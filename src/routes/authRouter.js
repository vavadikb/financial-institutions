import express from "express";

import {
  login,
  registration,
  getUsers,
} from "../controllers/authController.js";

import { AuthMiddleware } from "../middlewares/isAuth.js";

const isAuth = new AuthMiddleware();
const router = express.Router();

router.post("/login", login);
router.post("/registration", registration);
router.get("/login", isAuth.authenticateToken, getUsers);

export default router;
