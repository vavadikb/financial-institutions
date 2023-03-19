import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../dbConnection.js";

const generateAccessToken = (username) => {
  const payload = {
    username,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

export async function registration(req, res) {
  try {
    const { username, password } = req.body;

    try {
      // Check if the user already exists
      const queryText = "SELECT * FROM users WHERE username=$1";
      const result = await pool.query(queryText, [username]);
      if (result.rows.length > 0) {
        return res
          .status(400)
          .json({ message: `user with username ${username} already created` });
      }

      // Hash the password and create a new user record
      const hashPassword = bcrypt.hashSync(password, 7);
      const insertText = "INSERT INTO users(username, password) VALUES($1, $2)";
      await pool.query(insertText, [username, hashPassword]);

      return res.json({
        message: `User ${username}succsuccessfully registered`,
      });
    } catch (err) {
      console.error("Error during registration", err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      pool.release();
    }
  } catch (err) {
    console.error("Error connecting to database", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ message: `user ${username} not found` });
    }

    const user = result.rows[0];

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `bad password` });
    }

    const token = generateAccessToken(username);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Login error" });
  }
}

export async function getUsers(req, res) {
  try {
    const result = await pool.query("SELECT username FROM users;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
