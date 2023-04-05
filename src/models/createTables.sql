CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  balance DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS capital (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  money_amount DECIMAL(10, 2) NOT NULL,
  capital_earned DECIMAL(10, 2) NOT NULL,
  initial_capital DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,
  risks DECIMAL(5, 2) NOT NULL,
  income_percent DECIMAL(5, 2) NOT NULL,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS deals_offers (
  id SERIAL PRIMARY KEY,
  deals_id INTEGER NOT NULL,
  offers_id INTEGER NOT NULL,
  FOREIGN KEY (deals_id) REFERENCES deals(id) ON DELETE CASCADE,
  FOREIGN KEY (offers_id) REFERENCES offers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assets (
  id SERIAL PRIMARY KEY,
  offer_id INTEGER NOT NULL,
  reference TEXT NOT NULL,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE
);