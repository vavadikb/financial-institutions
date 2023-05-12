import { pool } from "../dbConnection.js";
import { GetAllRecordFactory } from "../utils/getAllRecordsFactory.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { GetFactoryById } from "../utils/getByIdFactory.js";

export class OfferServices {
  async getOffers() {
    try {
      const tableName = "offers";
      const factory = new GetAllRecordFactory();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecords();
      return result;
    } catch (e) {
      console.error(e);
      console.log("failed to get users balance");
      throw e;
    }
  }

  async getOfferById(id) {
    try {
      const tableName = "offers";
      const factory = new GetFactoryById();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecord(id);

      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async postOffer(body) {
    try {
      const { title, description, assets_ids } = body;
      console.log(title, description, assets_ids);
      const queryAssets =
        "SELECT risks, income_percent FROM assets WHERE id = ANY($1::integer[])";

      const result = await pool.query(queryAssets, [assets_ids]);

      const riskValue = (rows) => {
        let resCount = 0;
        rows.forEach((item) => {
          if (item.risks === "low") {
            resCount += 1;
          } else if (item.risks === "middle") {
            resCount += 2;
          } else if (item.risks === "hight") {
            resCount += 3;
          }
        });

        let mean = resCount / rows.length;
        let result;

        if (mean === 1) {
          result = "low";
        } else if (mean === 2) {
          result = "middle";
        } else if (mean === 3) {
          result = "hight";
        }

        return result;
      };

      const risk = riskValue(result.rows);

      const percetOfIncome =
        result.rows.reduce((acc, item) => {
          return acc + +item.income_percent;
        }, 0) / result.rowCount;

      const query =
        "INSERT INTO offers (risks, income_percent, title, description, assets_ids) VALUES ($1, $2, $3, $4, $5)";
      await pool.query(query, [
        risk,
        percetOfIncome,
        title,
        description,
        assets_ids,
      ]);
      return res.sendStatus(201);
    } catch (e) {
      console.error(e);
      console.log("failed to create offer");
      throw e;
    }
  }

  async updateOffer(body, id) {
    try {
      const { risks, income_percent, title, description } = body;
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

      return "updated";
    } catch (e) {
      console.error(e);
      console.log("failed to update");
      throw e;
    }
  }

  async deleteOffer(id) {
    try {
      const tableName = "offers";
      const factory = new DeleteFactory();
      const deleteRecordQuery = factory.createDeleteQuery(tableName);
      await deleteRecordQuery.deleteRecord(id);
    } catch (e) {
      console.error(e);
      console.log("failed to delete offer");
      throw e;
    }
  }
}
