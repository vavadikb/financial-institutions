import express from "express";

import {
  getDeals,
  getDealbyId,
  putDeal,
  patchDeal,
  deleteDeal,
  createDeal,
} from "../controllers/dealsController.js";

const router = express.Router();

router.get("/deals", getDeals);
router.get("/deals/:id", getDealbyId);
router.post("/deals", createDeal);
router.put("/deals/:id", putDeal);
router.patch("/deals/:id", patchDeal);
router.delete("/deals/:id", deleteDeal);

export default router;
