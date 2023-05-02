import ApiError from "../ApiError/ApiError.js";
import { OfferServices } from "../services/offersServices.js";

const offerService = new OfferServices();
export const getOffers = async (req, res, next) => {
  try {
    const result = await offerService.getOffers();
    return res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const getOfferById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await offerService.getOfferById(id);
    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};
export const postOffer = async (req, res, next) => {
  try {
    await offerService.postOffer(req.body);
    return res.sendStatus(201);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const putOfferById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await offerService.updateOffer(req.body, id);
    return res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};

export const patchOfferById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedofferId = await offerService.updateOffer(req.body, id);
    return res.json(updatedofferId.rows[0]).status(200);
  } catch (err) {
    console.error(err.message);
    return next(ApiError.internal(e.message));
  }
};

export const deleteOffer = async (req, res, next) => {
  try {
    const id = req.params.id;
    await offerService.deleteOffer(id);
    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    return next(ApiError.internal(e.message));
  }
};
