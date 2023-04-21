import { pool } from "../dbConnection.js";

export default class BalanceController {
  async getBalanceAllUsers(req, res) {
    try {
      const query = "SELECT * FROM user_balance";

      const result = await pool.query(query);

      return res.status(200).json(result.rows);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  async getBalanceById(req, res) {
    try {
      const id = req.params.id;

      const query = "SELECT * FROM assets WHERE id=$1";
      const result = await pool.query(query, [id]);

      return res.json(result.rows);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  async postBalance(req, res) {
    try {
      const { cash, users_id } = req.body;

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

      return res.json({ message: "ok" });
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  }

  async putBalance(res, req) {
    try {
      const balanceId = req.params.id;
      const { user_id, cash, money_earned, total_capital, money_in_deal } =
        req.body;
      console.log(balanceId);
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
      queryValues.push(balanceId);

      updateQuery += ` WHERE id = $${queryValues.length}`;
      console.log(queryValues);
      console.log(updateQuery);
      const updatedDealId = await pool.query(updateQuery, queryValues);

      res.json(updatedDealId.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  async patchBalance(req, res) {
    try {
      const balanceId = req.params.id;
      const { user_id, cash, money_earned, total_capital, money_in_deal } =
        req.body;
      console.log(balanceId);
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
      queryValues.push(balanceId);

      updateQuery += ` WHERE id = $${queryValues.length}`;
      console.log(queryValues);
      console.log(updateQuery);
      // const updatedDealId = await pool.query(updateQuery, ...queryValues);
      const updatedDealId = await pool.query(updateQuery, queryValues);

      res.json(updatedDealId.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  async deleteBalance(req, res) {
    try {
      const id = req.params.id;
      const query = "DELETE FROM users_offers WHERE id=$1";
      await pool.query(query, [id]);
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
}
