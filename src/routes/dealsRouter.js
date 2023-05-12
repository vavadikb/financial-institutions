import express from "express";

import { DealsController } from "../controllers/dealsController.js";

const dealController = new DealsController();
const router = express.Router();

router.get("/deals", dealController.getDeals);
router.get("/deals/:id", dealController.getDealbyId);
router.post("/deals", dealController.createDeal);
router.put("/deals/:id", dealController.putDeal);
router.put("/close-deal/:id", dealController.closeDeal);
router.patch("/deals/:id", dealController.patchDeal);
router.delete("/deals/:id", dealController.deleteDeal);

export default router;
