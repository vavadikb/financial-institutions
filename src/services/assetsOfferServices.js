import { pool } from "../dbConnection.js";
import { GetAllRecordFactory } from "../utils/getAllRecordsFactory.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { GetFactoryById } from "../utils/getByIdFactory.js";
import { riskValue, incomePercentCounter } from "../utils/riskCounter.js";

export class AssetsOffersServices {
  async get() {
    try {
      const tableName = "assets_offers";
      const factory = new GetAllRecordFactory();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecords();

      return result;
    } catch (e) {
      console.error(e);
      console.log(`failed to get Assets Offers`);
      throw e;
    }
  }

  async getById(id) {
    try {
      const tableName = "assets";
      const factory = new GetFactoryById();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecord(id);

      return result;
    } catch (e) {
      console.error(e);
      console.log(`failed to get Assets Offers by Id`);
      throw e;
    }
  }

  async create(body) {
    try {
      const { assets_ids, title, description } = body;
      const query = `
        SELECT risks, income_percent
        FROM assets
        WHERE id IN (${assets_ids.join(",")})
      `;

      const result = await pool.query(query);

      const risks = riskValue(result.rows);
      const income_percent = incomePercentCounter(result.rows);

      const offerQuery = `
        INSERT INTO offers(risks, income_percent,title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;

      const offerValues = [risks, income_percent, title, description];
      console.log(offerValues);
      const {
        rows: [{ id: offerId }],
      } = await pool.query(offerQuery, offerValues);

      const assetOffersValues = assets_ids.map((assetId) => [assetId, offerId]);
      console.log(assetOffersValues);
      const assetOffersQuery = `INSERT INTO assets_offers(asset_id, offer_id) VALUES ($1,$2)`;

      assetOffersValues.forEach(async (item) => {
        console.log(item);
        await pool.query(assetOffersQuery, item);
      });
      return offerValues;
    } catch (e) {
      console.error(e);
      console.log(`failed to create Assets Offers`);
      throw e;
    }
  }

  async delete(id) {
    try {
      const tableName = "assets_offers";
      const factory = new DeleteFactory();
      const deleteRecordQuery = factory.createDeleteQuery(tableName);
      await deleteRecordQuery.deleteRecord(id);
      const message = `assets offers with id ${id} deleted`;
      return message;
    } catch (e) {
      console.error(e);
      console.log(`failed to delete Assets Offers`);
      throw e;
    }
  }
}
