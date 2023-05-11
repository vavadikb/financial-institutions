import { pool } from "../dbConnection.js";
export const updateDeal = async () => {
  try {
    const queryUpdateUsers_offers =
      "UPDATE users_offers SET money_in_deal = money_in_deal + (money_in_deal * (SELECT income_percent FROM offers WHERE id = users_offers.offers_id)/100), money_earned = money_earned + (money_in_deal * (SELECT income_percent FROM offers WHERE id = users_offers.offers_id)/100) WHERE status='opened'";

    await pool.query(queryUpdateUsers_offers);
    console.log("users_offers updated");

    const queryUpdateBalance =
      "UPDATE user_balance SET money_earned = COALESCE((SELECT SUM(money_earned) FROM users_offers WHERE users_offers.users_id = user_balance.user_id), 0), money_in_deals = COALESCE((SELECT SUM(money_in_deal) FROM users_offers WHERE users_offers.users_id = user_balance.user_id), 0), total_capital= money_in_deals + cash WHERE user_balance.user_id IN (SELECT users_offers.users_id FROM users_offers );";
    await pool.query(queryUpdateBalance);
    console.log("balance updated");
  } catch (e) {
    console.error(e);
    console.log("failed to update");
  }
};
