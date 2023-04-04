import CryptoJS from "crypto-js";
import { pool } from "../dbConnection.js";

const secret = process.env.SECRET;

const getIdByUserName = async (username) => {
  const queryText = `SELECT id FROM users WHERE username=$1`;
  const result = await pool.query(queryText, [username]);
  return result.rows[0];
};

const generateAccessToken = async (username) => {
  const header = { alg: "HS256", typ: "JWT" };
  const id = await getIdByUserName(username);
  const payload = { id };

  const encodedHeader = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  );
  const encodedPayload = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
  );
  const signature = CryptoJS.HmacSHA256(
    encodedHeader + "." + encodedPayload,
    secret
  );
  const encodedSignature = CryptoJS.enc.Base64.stringify(signature);
  const token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  return token;
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
  const header = JSON.parse(
    CryptoJS.enc.Base64.parse(encodedHeader).toString(CryptoJS.enc.Utf8)
  );
  const payload = JSON.parse(
    CryptoJS.enc.Base64.parse(encodedPayload).toString(CryptoJS.enc.Utf8)
  );
  const secret = process.env.SECRET;
  const signature = CryptoJS.enc.Base64.parse(encodedSignature);

  try {
    const isVerified = CryptoJS.HmacSHA256(
      encodedHeader + "." + encodedPayload,
      secret
    ).toString();

    if (
      isVerified !== CryptoJS.enc.Hex.parse(signature.toString()).toString()
    ) {
      return res.sendStatus(403);
    }

    req.user = payload;
    next();
  } catch (err) {
    console.error("auth error", err);
    return res.sendStatus(500);
  }
};

export async function registration(req, res) {
  try {
    const { username, password } = req.body;

    try {
      const queryText = "SELECT * FROM users WHERE username=$1";
      const result = await pool.query(queryText, [username]);
      if (result.rows.length > 0) {
        return res
          .status(400)
          .json({ message: `User with username ${username} already created` });
      }
      const hashPassword = CryptoJS.SHA256(password).toString();
      const insertText = "INSERT INTO users(username, password) VALUES($1, $2)";
      await pool.query(insertText, [username, hashPassword]);

      return res.json({
        message: `User ${username} successfully registered`,
      });
    } catch (err) {
      console.error("Error during registration", err);
      return res.status(500).json({ message: "Internal server error" });
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
      return res.status(400).json({ message: `User ${username} not found` });
    }

    const user = result.rows[0];
    const hashPassword = CryptoJS.SHA256(password).toString();

    if (user.password !== hashPassword) {
      return res.status(400).json({ message: "Bad password" });
    }

    const token = await generateAccessToken(username);
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
