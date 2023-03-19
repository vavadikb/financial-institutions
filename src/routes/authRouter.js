import express from "express";

import {
  login,
  registration,
  getUsers,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/login", login);
router.post("/registration", registration);
router.get("/login", getUsers);

export default router;
