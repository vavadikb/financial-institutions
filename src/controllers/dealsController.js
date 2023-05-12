import { DealsServices } from "../services/dealsServices.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import ApiError from "../ApiError/ApiError.js";

const dealsService = new DealsServices();
export class DealsController {
  async getDeals(req, res, next) {
    try {
      const result = await dealsService.getDeals();
      console.log(result);
      return res.status(200).json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async getDealbyId(req, res, next) {
    try {
      const id = req.params.id;
      const result = await dealsService.getDealById(id);
      return res.json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async createDeal(req, res, next) {
    try {
      const message = await dealsService.createDeal(req.body);
      return res.json({ message: message }).status(201);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async putDeal(req, res, next) {
    try {
      const id = req.params.id;
      const updatedDealId = await dealsService.updatedeal(req.body, id);
      res.json(updatedDealId.rows[0]).status(200);
    } catch (err) {
      console.error(err.message);
      return next(ApiError.internal(e.message));
    }
  }

  async patchDeal(req, res, next) {
    try {
      const id = req.params.id;
      const updatedDealId = await dealsService.updatedeal(req.body, id);
      res.json(updatedDealId.rows[0]).status(200);
    } catch (err) {
      console.error(err.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteDeal(req, res, next) {
    try {
      const id = req.params.id;
      const tableName = "users_offers";
      const factory = new DeleteFactory();
      const deleteRecordQuery = factory.createDeleteQuery(tableName);
      await deleteRecordQuery.deleteRecord(id);
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async closeDeal(req, res, next) {
    try {
      const id = req.params.id;
      const message = await dealsService.closeDeal(id);
      return res.status(202).json({ message: message });
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }
}
