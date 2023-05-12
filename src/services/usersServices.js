import { pool } from "../dbConnection.js";
import { DeleteFactory } from "../utils/DeleteRecordFactory.js";
import { GetAllRecordFactory } from "../utils/getAllRecordsFactory.js";
import { GetFactoryById } from "../utils/getByIdFactory.js";

export class UserServices {
  async getUsers() {
    try {
      const tableName = "users";
      const factory = new GetAllRecordFactory();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecords();
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getUserById(id) {
    try {
      const tableName = "users";
      const factory = new GetFactoryById();
      const getQuery = factory.createGetQuery(tableName);
      const result = await getQuery.getRecord(id);
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateUser(body, id) {
    try {
      const { username, password } = body;
      const queryParams = [];
      let query = "UPDATE users SET ";

      if (username) {
        query += `username = $${queryParams.length + 1}, `;
        queryParams.push(username);
      }

      if (password) {
        query += `password = $${queryParams.length + 1}, `;
        queryParams.push(password);
      }
      query = query.slice(0, -2);
      query += ` WHERE id = $${queryParams.length + 1}`;

      queryParams.push(id);

      await pool.query(query, queryParams);

      const message = `user with id ${id} updated`;
      return message;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteUser(id) {
    try {
      const tableName = "users";
      const factory = new DeleteFactory();
      const deleteRecordQuery = factory.createDeleteQuery(tableName);
      await deleteRecordQuery.deleteRecord(id);
      const message = `user with id ${id} deleted`;
      return message;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
