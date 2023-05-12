import { pool } from "../dbConnection.js";
export const migration = async () => {
  try {
    await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL
          );
    
          CREATE TABLE IF NOT EXISTS user_balance (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            cash NUMERIC(100, 3),
            money_earned NUMERIC(100, 3),
            total_capital NUMERIC(100, 3),
            money_in_deals NUMERIC(100, 3),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          );
    
          CREATE TABLE IF NOT EXISTS offers (
            id SERIAL PRIMARY KEY,
            assets_id INTEGER[] NOT NULL,
            risks VARCHAR(50) NOT NULL,
            income_percent NUMERIC(5, 2) NOT NULL,
            title VARCHAR(50) NOT NULL,
            description TEXT NOT NULL
          );
    
          CREATE TABLE IF NOT EXISTS assets (
            id SERIAL PRIMARY KEY,
            income_percent NUMERIC(5, 2) NOT NULL,
            risks VARCHAR(50) NOT NULL,
            title VARCHAR(50) NOT NULL,
            description TEXT NOT NULL
          );
    
          CREATE TABLE IF NOT EXISTS assets_offers (
            id SERIAL PRIMARY KEY,
            asset_id INTEGER NOT NULL,
            offer_id INTEGER NOT NULL,
            FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
            FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE
          );
    
          CREATE TABLE IF NOT EXISTS users_offers (
            id SERIAL PRIMARY KEY,
            users_id INTEGER NOT NULL,
            offers_id INTEGER NOT NULL,
            money_earned NUMERIC(100, 3),
            money_in_deal NUMERIC(100, 3) NOT NULL,
            status VARCHAR(50),
            FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (offers_id) REFERENCES offers(id) ON DELETE CASCADE
          );
        `);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
