import { pool } from "../dbConnection.js";

export class DeleteRecord {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  deleteRecord(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `DELETE FROM ${this.table} WHERE id = $1`,
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  }
}

export class DeleteFactory {
  constructor() {
    this.connection = pool;
  }

  createDeleteQuery(table) {
    return new DeleteRecord(this.connection, table);
  }
}
