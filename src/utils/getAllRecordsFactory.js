import { pool } from "../dbConnection.js";

export class GetAllRecord {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  async getRecords() {
    let query = `SELECT * FROM ${this.table}`;
    const result = this.connection.query(query);
    return result;
  }
}

export class GetAllRecordFactory {
  constructor() {
    this.connection = pool;
  }

  createGetQuery(table) {
    return new GetAllRecord(this.connection, table);
  }
}
