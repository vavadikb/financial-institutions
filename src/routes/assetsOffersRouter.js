import { AssetsOffersControlller } from "../controllers/assetsOffersController.js";
import express from "express";

const router = express.Router();
const AssetsController = new AssetsOffersControlller();

router.get("/assets-offers", AssetsController.getAssetsOffers);
router.get("/assets-offers/:id", AssetsController.getAssetsOffer);
router.post("/assets-offers", AssetsController.createOffer);
router.delete("/assets-offers/:id", AssetsController.deleteAssetsOffers);

export default router;
