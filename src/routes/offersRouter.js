import express from "express";

import {
  getOffers,
  getOfferById,
  postOffer,
  putOfferById,
  patchOfferById,
  deleteOffer,
} from "../controllers/offresController.js";

const router = express.Router();
router.get("/offers", getOffers);
router.get("/offers/:id", getOfferById);
router.post("/offers", postOffer);
router.put("/offers/:id", putOfferById);
router.patch("/offers/:id", patchOfferById);
router.delete("/offers/:id", deleteOffer);

export default router;
