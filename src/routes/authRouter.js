import express from "express";

import {
  login,
  registration,
  getUsers,
  authenticateToken,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/login", login);
router.post("/registration", registration);
router.get("/login", authenticateToken, getUsers);

export default router;
