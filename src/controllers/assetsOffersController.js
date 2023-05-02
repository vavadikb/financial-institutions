import ApiError from "../ApiError/ApiError.js";
import { AssetsOffersServices } from "../services/assetsOfferServices.js";

const assetsOffersService = new AssetsOffersServices();
export class AssetsOffersControlller {
  async getAssetsOffers(req, res, next) {
    try {
      const result = await assetsOffersService.get();
      return res.status(200).json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async getAssetsOffer(req, res, next) {
    try {
      const id = req.params.id;
      const result = await assetsOffersService.getById(id);
      return res.json(result.rows).status(200);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async createOffer(req, res, next) {
    try {
      const values = await assetsOffersService.create(req.body);
      return res.status(201).json(values);
    } catch (err) {
      console.error(err);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteAssetsOffers(req, res, next) {
    try {
      const id = req.params.id;
      const message = await assetsOffersService.delete(id);
      console.log(message);
      return res.json(message).status(204);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }
}
