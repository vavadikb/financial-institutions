import { updateDeal } from "../cron/cron_func.js";
import { pool } from "../dbConnection.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { GetAllRecordFactory } from "../utils/getAllRecordsFactory.js";
import { GetFactoryById } from "../utils/getByIdFactory.js";

export class BalanceService {
  async getBalances() {
    try {
      const tableName = "user_balance";
      const factory = new GetAllRecordFactory();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecords();

      return result;
    } catch (e) {
      console.error(e);
      console.log("failed to get users balance");
      throw e;
    }
  }

  async getBalanceById(id) {
    try {
      const tableName = "user_balance";
      const factory = new GetFactoryById();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecord(id);

      return result;
    } catch (e) {
      console.error(e);
      console.log(`failed to get balance ith id ${id}`);
      throw e;
    }
  }

  async postBalance(body) {
    try {
      const { cash, users_id } = body;

      const queryEarn_Money =
        "SELECT SUM(money_earned) FROM users_offers WHERE users_id=$1";
      const money_earned = await pool.query(queryEarn_Money, [users_id]);

      const queryMoney_in_deals =
        "SELECT SUM(money_in_deal) FROM users_offers WHERE users_id=$1";
      const money_in_deals = await pool.query(queryMoney_in_deals, [users_id]);

      const total_capital = cash + +money_in_deals.rows[0].sum;
      const query =
        "INSERT INTO user_balance (user_id, cash, money_earned, total_capital, money_in_deals) VALUES($1,$2, $3, $4, $5)";

      await pool.query(query, [
        users_id,
        cash,
        +money_earned.rows[0].sum,
        total_capital,
        +money_in_deals.rows[0].sum,
      ]);
    } catch (e) {
      console.error(e);
      console.log("failed to post");
      throw e;
    }
  }

  async updateBalance(id, body) {
    try {
      const { user_id, cash, money_earned, total_capital, money_in_deal } =
        body;

      const queryValues = [];
      let updateQuery = "UPDATE user_balance SET";
      if (user_id !== undefined) {
        updateQuery += ` user_id = $${queryValues.length + 1}, `;
        queryValues.push(user_id);
      }
      if (cash !== undefined) {
        updateQuery += ` cash = $${queryValues.length + 1},`;
        queryValues.push(cash);
      }
      if (total_capital !== undefined) {
        updateQuery += ` total_capital = $${queryValues.length + 1} ,`;
        queryValues.push(total_capital);
      }
      if (money_earned !== undefined) {
        updateQuery += ` money_earned = $${queryValues.length + 1} `;
        queryValues.push(money_earned);
      }
      if (money_in_deal !== undefined) {
        updateQuery += ` money_in_deal = $${queryValues.length + 1} ,`;
        queryValues.push(money_in_deal);
      }
      updateQuery = updateQuery.slice(0, -1);
      queryValues.push(id);

      updateQuery += ` WHERE id = $${queryValues.length}`;
      console.log(queryValues);
      console.log(updateQuery);
      await pool.query(updateQuery, queryValues);

      return "updated 200";
    } catch (e) {
      console.error(e);
      console.log("failed to update");
      throw e;
    }
  }

  async deleteBalance(id) {
    try {
      const tableName = "user_balance";
      const factory = new DeleteFactory();
      const deleteRecordQuery = factory.createDeleteQuery(tableName);
      await deleteRecordQuery.deleteRecord(id);
    } catch (e) {
      console.error(e);
      console.log("failed to delete user_balance");
      throw e;
    }
  }
}
