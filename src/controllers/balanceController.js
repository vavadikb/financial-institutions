import { pool } from "../dbConnection.js";
import ApiError from "../ApiError/ApiError.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { BalanceService } from "../services/balaneServices.js";

const balanceServices = new BalanceService();

export default class BalanceController {
  async getBalanceAllUsers(req, res, next) {
    try {
      const result = await balanceServices.getBalances();
      return res.status(200).json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async getBalanceById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await balanceServices.getBalanceById(id);
      return res.json(result.rows);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async postBalance(req, res, next) {
    try {
      await balanceServices.postBalance(req.body);
      return res.json({ message: "ok" });
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }

  async putBalance(req, res, next) {
    try {
      const id = req.params.id;
      const updatedDealId = await balanceServices.updateBalance(req.body, id);
      return res.json(updatedDealId.rows[0]);
    } catch (err) {
      console.error(err.message);
      return next(ApiError.internal(e.message));
    }
  }

  async patchBalance(req, res, next) {
    try {
      const id = req.params.id;
      const updatedDealId = await balanceServices.updateBalance(req.body, id);
      return res.json(updatedDealId.rows[0]);
    } catch (err) {
      console.error(err.message);
      return next(ApiError.internal(e.message));
    }
  }

  async deleteBalance(req, res, next) {
    try {
      const id = req.params.id;
      await balanceServices.deleteBalance(id);
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  }
}
