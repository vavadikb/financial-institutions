import express from "express";

import BalanceController from "../controllers/balanceController.js";
const router = express.Router();
const balanceController = new BalanceController();

router.get("/balance", balanceController.getBalanceAllUsers);
router.get("/balance/:id", balanceController.getBalanceById);
router.post("/balance", balanceController.postBalance);
router.put("/balance/:id", balanceController.putBalance);
router.patch("/balance/:id", balanceController.patchBalance);
router.delete("/balance/:id", balanceController.deleteBalance);

export default router;
