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
  try {
    const id = req.params.id;
    const query = "SELECT * FROM offers WHERE id=$1";
    const result = await pool.query(query, [id]);
    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const postOffer = async (req, res) => {
  const { risks, income_persent, title, description } = req.body;
  const query =
    "INSERT INTO offers (risks, income_percent, title, description) VALUES ($1, $2, $3, $4)";
  await pool.query(query, [risks, income_persent, title, description]);
  return res.sendStatus(201);
};

export const putOfferById = async (req, res) => {
  try {
    const id = req.params.id;
    const { risks, income_percent, title, description } = req.body;
    const queryParams = [];
    let query = "UPDATE offers SET ";

    if (risks) {
      query += `risks = $${queryParams.length + 1}, `;
      queryParams.push(risks);
    }

    if (income_percent) {
      query += `income_percent = $${queryParams.length + 1}, `;
      queryParams.push(income_percent);
    }

    if (title) {
      query += `title = $${queryParams.length + 1}, `;
      queryParams.push(title);
    }

    if (description) {
      query += `description = $${queryParams.length + 1}, `;
      queryParams.push(description);
    }

    query = query.slice(0, -2);
    query += ` WHERE id = $${queryParams.length + 1}`;

    queryParams.push(id);

    await pool.query(query, queryParams);

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

export const patchOfferById = async (req, res) => {
  try {
    const offerId = req.params.id;
    const { risks, incomePercent, title, description } = req.body;
    const queryValues = [];
    let updateQuery = "UPDATE offers SET";
    if (risks !== undefined) {
      updateQuery += ` risks = $${queryValues.length + 1},`;
      queryValues.push(risks);
    }
    if (incomePercent !== undefined) {
      updateQuery += ` income_percent = $${queryValues.length + 1},`;
      queryValues.push(incomePercent);
    }
    if (title !== undefined) {
      updateQuery += ` title = $${queryValues.length + 1},`;
      queryValues.push(title);
    }
    if (description !== undefined) {
      updateQuery += ` description = $${queryValues.length + 1},`;
      queryValues.push(description);
    }

    updateQuery = updateQuery.slice(0, -1);
    queryValues.push(offerId);

    updateQuery += ` WHERE id = $${queryValues.length}`;

    const updatedofferId = await pool.query(updateQuery, queryValues);

    res.json(updatedofferId.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM offers WHERE id=$1";
    await pool.query(query, [id]);
    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
