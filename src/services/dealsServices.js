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
      throw e;
    }
  }

  async getDealById(id) {
    try {
      const tableName = "users_offers";
      const factory = new GetFactoryById();
      console.log(id);
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
      console.log(users_id, offers_id, money_in_deal);

      const checkUserQuery = "SELECT * FROM users WHERE id=$1";
      const user = await pool.query(checkUserQuery, [users_id]);
      if (user.rowCount) {
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
      } else {
        return `user with id ${users_id} not found`;
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
      throw e;
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
      throw e;
    }
  }

  async closeDeal(id) {
    try {
      const checkDealQuery = `SELECT * FROM users_offers WHERE id=${id}`;
      const deal = await pool.query(checkDealQuery);
      console.log(deal.rows);

      console.log(deal.rows[0].status, deal.rowCount, "deal");
      if (deal.rowCount) {
        if (deal.rows[0].status === "opened") {
          const moneyQuery = `SELECT money_in_deal FROM users_offers WHERE id=${id}`;
          const money = await pool.query(moneyQuery);
          console.log(+money.rows[0].money_in_deal);

          const queryUpdate = `UPDATE user_balance SET cash = cash + ${+money
            .rows[0].money_in_deal}, money_in_deals = money_in_deals -${+money
            .rows[0].money_in_deal} WHERE user_id = ${deal.rows[0].users_id}`;
          console.log(queryUpdate);

          await pool.query(queryUpdate);

          const query = "UPDATE users_offers SET status='closed' WHERE id=$1";
          await pool.query(query, [id]);

          const message = `Deal with id = ${id} closed`;
          return message;
        } else {
          const message = `Deal with id ${id} already closed`;
          return message;
        }
      } else {
        const message = `Deal with id = ${id} not found`;
        return message;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
