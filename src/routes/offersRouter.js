import express from "express";

import { OffresController } from "../controllers/offresController.js";

const offerController = new OffresController();
const router = express.Router();
router.get("/offers", offerController.getOffers);
router.get("/offers/:id", offerController.getOfferById);
router.post("/offers", offerController.postOffer);
router.put("/offers/:id", offerController.putOfferById);
router.patch("/offers/:id", offerController.patchOfferById);
router.delete("/offers/:id", offerController.deleteOffer);

export default router;
