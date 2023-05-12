import express from "express";

import { OffresController } from "../controllers/offresController.js";
import { AssetsOffersControlller } from "../controllers/assetsOffersController.js";

const assetsOffersController = new AssetsOffersControlller();
const offerController = new OffresController();
const router = express.Router();
router.get("/offers", offerController.getOffers);
router.get("/offers/:id", offerController.getOfferById);
router.post("/offers", assetsOffersController.createOffer);
router.put("/offers/:id", offerController.putOfferById);
router.patch("/offers/:id", offerController.patchOfferById);
router.delete("/offers/:id", offerController.deleteOffer);

export default router;
