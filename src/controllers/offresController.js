import { pool } from "../dbConnection.js";

export const getOffers = async (req, res) => {
  try {
    const query = "SELECT * FROM offers";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getOfferById = async (req, res) => {
    const {id} = req.body
    const query = 'SELECT '
};

export const postOffer = async (req, res) => {};

export const putOfferById = async (req, res) => {};

export const patchOfferById = async (req, res) => {};

export const deleteOffer = async (req, res) => {};
