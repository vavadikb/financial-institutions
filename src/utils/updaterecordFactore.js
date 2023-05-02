import { pool } from "../dbConnection";

export class UpdateRecord {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  async update(table, id, data) {
    const fields = Object.keys(data)
      .map((field, i) => `${field} = $${i + 1}`)
      .join(", ");
    const values = Object.values(data);
    const query = `UPDATE ${table} SET ${fields} WHERE id = $${
      values.length + 1
    } RETURNING *`;
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, [...values, id]);
      return result.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export class UpdateFactory {
  constructor() {
    this.connection = pool;
  }

  updateRecords() {
    return new UpdateRecord(this.connection, table);
  }
}
