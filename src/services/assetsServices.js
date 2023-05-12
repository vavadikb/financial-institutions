import { pool } from "../dbConnection.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { GetAllRecordFactory } from "../utils/getAllRecordsFactory.js";
import { GetFactoryById } from "../utils/getByIdFactory.js";

export class AssetsService {
  async getAssets() {
    try {
      const tableName = "assets";
      const factory = new GetAllRecordFactory();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecords();

      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAssetById(id) {
    try {
      const tableName = "assets";
      const factory = new GetFactoryById();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecord(id);

      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async postNewAsset(body) {
    try {
      const { title, description, risks, income_perсent } = body;
      const query = `INSERT INTO assets (title, description, risks, income_percent) VALUES ($1, $2, $3, $4)`;
      const result = await pool.query(query, [
        title,
        description,
        risks,
        income_perсent,
      ]);
      console.log(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateAsset(body, id) {
    try {
      const { risks, incomePercent, title, description } = body;
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
      queryValues.push(id);

      updateQuery += ` WHERE id = $${queryValues.length}`;

      await pool.query(updateQuery, queryValues);
    } catch (e) {
      console.error(e);
      console.log("failed to update fields");
      throw e;
    }
  }

  async deleteAsset(id) {
    try {
      const tableName = "assets";
      const factory = new DeleteFactory();
      const deleteRecordQuery = factory.createDeleteQuery(tableName);
      await deleteRecordQuery.deleteRecord(id);
    } catch (e) {
      console.error(e);
      console.log("failed delete");
      throw e;
    }
  }
}
