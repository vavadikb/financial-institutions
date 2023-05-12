import { pool } from "../dbConnection";
import { GetRecordById, GetFactoryById } from "../utils/getByIdFactory.js";

jest.mock("../dbConnection");

describe("GetRecordById", () => {
  describe("getRecord", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call query with the correct parameters", async () => {
      const connection = pool;
      const table = "users";
      const id = 1;
      const record = { id: 1, name: "test" };
      connection.query.mockResolvedValueOnce({ rows: [record] });

      const getRecordById = new GetRecordById(connection, table);
      const result = await getRecordById.getRecord(id);

      expect(connection.query).toHaveBeenCalledWith(
        `SELECT * FROM ${table} WHERE id = $1`,
        [id]
      );
      expect(result).toEqual({ rows: [record] });
    });
  });
});

describe("GetFactoryById", () => {
  describe("createGetQuery", () => {
    it("should return a new instance of GetRecordById", () => {
      const getFactoryById = new GetFactoryById();
      const table = "users";
      const getQuery = getFactoryById.createGetQuery(table);

      expect(getQuery).toBeInstanceOf(GetRecordById);
      expect(getQuery.connection).toEqual(require("../dbConnection").pool);
      expect(getQuery.table).toEqual(table);
    });
  });
});
