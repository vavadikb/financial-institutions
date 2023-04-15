import express from "express";

import {
  getDeals,
  getDealbyId,
  putDeal,
  postDeal,
  patchDeal,
  deleteDeal,
} from "../controllers/dealsController";

const router = express.Router();

router.get("/deals", getDeals);
router.get("/deals/:id", getDealbyId);
router.post("/deals", postDeal);
router.put("/deals/:id", putDeal);
router.patch("/deals/:id", patchDeal);
router.delete("/deals/:id", deleteDeal);

export default router;
