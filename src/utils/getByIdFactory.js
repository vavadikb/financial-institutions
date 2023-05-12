import { pool } from "../dbConnection.js";

export class GetRecordById {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  async getRecord(id) {
    const query = `SELECT * FROM ${this.table} WHERE id = $1`;
    const result = await this.connection.query(query, [id]);
    return result;
  }
}

export class GetFactoryById {
  constructor() {
    this.connection = pool;
  }

  createGetQuery(table) {
    return new GetRecordById(this.connection, table);
  }
}
