import { pool } from "../dbConnection.js";

export const getAssets = async (req, res) => {
  try {
    const query = "SELECT * FROM assets";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getAssetbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM assets WHERE id=$1";
    const result = await pool.query(query, [id]);
    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const postAsset = async (req, res) => {
  try {
    const { title, description, risks, income_perсent } = req.body;
    const query = `INSERT INTO assets (title, description, risks, income_percent) VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [title, description, risks, income_perсent]);
    return res.sendStatus(201);
  } catch (e) {}
};

export const putAsset = async (req, res) => {
  try {
    const id = req.params.id;
    const { risks, income_percent, title, description } = req.body;
    const queryParams = [];
    let query = "UPDATE assets SET ";

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

export const patchAsset = async (req, res) => {
  try {
    const assetId = req.params.id;
    const { risks, incomePercent, title, description } = req.body;
    const queryValues = [];
    let updateQuery = "UPDATE assets SET";
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

    const updatedAssetId = await pool.query(updateQuery, queryValues);

    res.json(updatedAssetId.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM assets WHERE id=$1";
    await pool.query(query, [id]);
    return res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
