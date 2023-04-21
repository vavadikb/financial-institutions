import express from "express";

import {
  getAssets,
  getAssetbyId,
  putAsset,
  postAsset,
  patchAsset,
  deleteAsset,
} from "../controllers/assetsControllers.js";

const router = express.Router();

router.get("/assets", getAssets);
router.get("/assets/:id", getAssetbyId);
router.post("/assets", postAsset);
router.put("/assets/:id", putAsset);
router.patch("/assets/:id", patchAsset);
router.delete("/assets/:id", deleteAsset);

export default router;
