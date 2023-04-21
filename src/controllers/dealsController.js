import { pool } from "../dbConnection.js";

export const getDeals = async (req, res) => {
  try {
    const query = "SELECT * FROM users_offers";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getDealbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM users_offers WHERE id=$1";
    const result = await pool.query(query, [id]);
    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const createDeal = async (req, res) => {
  try {
    const { users_id, offers_id, money_in_deal } = req.body;
    const userCashQuery = "SELECT cash FROM user_balance WHERE user_id=$1";
    const userCash = await pool.query(userCashQuery, [users_id]);
    if (money_in_deal < +userCash.rows[0].cash) {
      console.log("post 201");
      console.log(userCash.rows[0]);
      console.log(users_id, offers_id, money_in_deal);
      const query =
        "INSERT INTO users_offers (users_id, offers_id, deal_opened, deal_updatedAt, money_earned, money_in_deal,status) VALUES ( $1, $2 , $3 , $4 , $5, $6, $7 )";
      await pool.query(query, [
        users_id,
        offers_id,
        "NOW()",
        "NOW()",
        0,
        money_in_deal,
        "opened",
      ]);
      console.log("created", users_id, offers_id, money_in_deal);
      return res.json({
        message: `created deal for user ${users_id} with offer ${offers_id} and money amount ${money_in_deal}`,
      });
    } else {
      return res.json({
        message: `you have no money to open this deal, please top up your balance`,
      });
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const putDeal = async (req, res) => {
  try {
    const dealId = req.params.id;
    const { deal_opened, deal_updatedAt, money_earned, money_in_deal, status } =
      req.body;

    const queryValues = [];
    let updateQuery = "UPDATE users_offers SET deal_updatedAt = $1,";
    queryValues.push("NOW()");
    if (deal_opened !== undefined) {
      updateQuery += ` deal_opened = $${queryValues.length + 1}, `;
      queryValues.push(deal_opened);
    }
    if (deal_updatedAt !== undefined) {
      updateQuery += ` deal_updatedAt = $${queryValues.length + 1},`;
      queryValues.push(deal_updatedAt);
    }
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
    queryValues.push(dealId);

    updateQuery += ` WHERE id = $${queryValues.length}`;
    console.log(updateQuery);
    const updatedDealId = await pool.query(updateQuery, queryValues);

    res.json(updatedDealId.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const patchDeal = async (req, res) => {
  try {
    const dealId = req.params.id;
    const { deal_opened, deal_updatedAt, money_earned, money_in_deal, status } =
      req.body;

    const queryValues = [];
    let updateQuery = "UPDATE users_offers SET deal_updatedAt = $1,";
    queryValues.push("NOW()");
    if (deal_opened !== undefined) {
      updateQuery += ` deal_opened = $${queryValues.length + 1}, `;
      queryValues.push(deal_opened);
    }
    if (deal_updatedAt !== undefined) {
      updateQuery += ` deal_updatedAt = $${queryValues.length + 1},`;
      queryValues.push(deal_updatedAt);
    }
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
    queryValues.push(dealId);

    updateQuery += ` WHERE id = $${queryValues.length}`;
    console.log(updateQuery);
    const updatedDealId = await pool.query(updateQuery, queryValues);

    res.json(updatedDealId.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM users_offers WHERE id=$1";
    await pool.query(query, [id]);
    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

export const closeDeal = async (req, res) => {
  try {
    const id = req.params;
    const query =
      "UPDATE users_offers SET status='closed', deal_updatedAt=$2 WHERE id=$1";
    await pool.query(query, [id, "NOW()"]);
    res.status(202).json({ message: `deal with id=${id} closed` });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
