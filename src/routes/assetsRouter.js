import express from "express";
import { AssetsController } from "../controllers/assetsControllers.js";

const assetsController = new AssetsController();
const router = express.Router();

router.get("/assets", assetsController.getAssets);
router.get("/assets/:id", assetsController.getAssetbyId);
router.post("/assets", assetsController.postAsset);
router.put("/assets/:id", assetsController.putAsset);
router.patch("/assets/:id", assetsController.patchAsset);
router.delete("/assets/:id", assetsController.deleteAsset);

export default router;
