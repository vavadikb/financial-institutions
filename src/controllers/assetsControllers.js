import { AssetsService } from "../services/assetsServices.js";
import ApiError from "../ApiError/ApiError.js";

const AssetService = new AssetsService();
export const getAssets = async (req, res, next) => {
  try {
    const result = await AssetService.getAssets();
    return res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const getAssetbyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await AssetService.getAssetById(id);
    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const postAsset = async (req, res, next) => {
  try {
    await AssetService.postNewAsset(req.body);
    return res.sendStatus(201);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const putAsset = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AssetService.updateAsset(req.body, id);
    return res.json({ message: "put 200 OK" }).status(200);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const patchAsset = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AssetService.updateAsset(req.body, id);
    res.json({ message: "patch 200 OK" }).status(200);
  } catch (err) {
    console.error(err.message);
    return next(ApiError.internal(e.message));
  }
};

export const deleteAsset = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AssetService.deleteAsset(id);
    return res.json({ message: `record with id = ${id} deleted` }).status(204);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};
