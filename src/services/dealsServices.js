import { pool } from "../dbConnection.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { GetAllRecordFactory } from "../utils/getAllRecordsFactory.js";
import { GetFactoryById } from "../utils/getByIdFactory.js";

export class DealsServices {
  async getDeals() {
    try {
      const tableName = "users_offers";
      const factory = new GetAllRecordFactory();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecords();
      return result;
    } catch (e) {
      console.error(e);
      console.log("failed to get users balance");
    }
  }

  async getDealById(id) {
    try {
      const tableName = "user_balance";
      const factory = new GetFactoryById();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecord(id);
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async createDeal(body) {
    try {
      const { users_id, offers_id, money_in_deal } = body;
      const userCashQuery = "SELECT cash FROM user_balance WHERE user_id=$1";
      const userCash = await pool.query(userCashQuery, [users_id]);
      if (money_in_deal < +userCash.rows[0].cash) {
        const query =
          "INSERT INTO users_offers (users_id, offers_id, money_earned, money_in_deal,status) VALUES ( $1, $2 , $3 , $4 , $5)";
        await pool.query(query, [
          users_id,
          offers_id,
          0,
          money_in_deal,
          "opened",
        ]);

        const cashResult = +userCash.rows[0].cash - money_in_deal;

        const updateCashQuery =
          "UPDATE user_balance SET cash=$1 WHERE user_id=$2 ";
        await pool.query(updateCashQuery, [cashResult, users_id]);
        let message = `created deal for user ${users_id} with offer ${offers_id} and money amount ${money_in_deal}`;
        return message;
      } else {
        let message = `you have no money to open this deal, please top up your balance`;
        return message;
      }
    } catch (e) {
      console.error(e);
      console.log("failed to create deal");
      throw e;
    }
  }

  async updatedeal(body, id) {
    try {
      const { money_earned, money_in_deal, status } = body;

      const queryValues = [];
      let updateQuery = "UPDATE users_offers SET ";

      if (money_earned !== undefined) {
        updateQuery += ` money_earned = $${queryValues.length + 1},`;
        queryValues.push(money_earned);
      }
      if (money_in_deal !== undefined) {
        updateQuery += ` money_in_deal = $${queryValues.length + 1},`;
        queryValues.push(money_in_deal);
      }
      if (status !== undefined) {
        updateQuery += ` status = $${queryValues.length + 1},`;
        queryValues.push(status);
      }

      updateQuery = updateQuery.slice(0, -1);
      queryValues.push(id);

      updateQuery += ` WHERE id = $${queryValues.length}`;
      console.log(updateQuery);
      const updatedDealId = await pool.query(updateQuery, queryValues);
      return updatedDealId;
    } catch (e) {
      console.error(e);
      console.log("failed to update deal");
    }
  }

  async deleteDeal(id) {
    try {
      const tableName = "users_offers";
      const factory = new DeleteFactory();
      const deleteBalance = factory.createDeleteQuery(id);
      await deleteBalance.deleteRecord(tableName);
    } catch (e) {
      console.error(e);
      console.log("failed to delete user_balance");
    }
  }

  async closeDeal(id) {
    try {
      const query = "UPDATE users_offers SET status='closed' WHERE id=$1";
      await pool.query(query, [id]);
      const message = `Deal with id = ${id} closed`;
      return message;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
