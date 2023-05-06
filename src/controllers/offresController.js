import ApiError from "../ApiError/ApiError.js";
import { OfferServices } from "../services/offersServices.js";

const offerService = new OfferServices();
export class OffresController {
  async getOffers(req, res, next) {
    try {
      const result = await offerService.getOffers();
      return res.status(200).json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async getOfferById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await offerService.getOfferById(id);
      return res.json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async postOffer(req, res, next) {
    try {
      await offerService.postOffer(req.body);
      return res.sendStatus(201);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }
  async putOfferById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await offerService.updateOffer(req.body, id);
      return res.status(200).json(result);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async patchOfferById(req, res, next) {
    try {
      const id = req.params.id;
      const updatedofferId = await offerService.updateOffer(req.body, id);
      return res.json(updatedofferId.rows[0]).status(200);
    } catch (err) {
      console.error(err.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteOffer(req, res, next) {
    try {
      const id = req.params.id;
      await offerService.deleteOffer(id);
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }
}
