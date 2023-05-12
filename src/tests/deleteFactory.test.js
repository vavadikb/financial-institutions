import { pool } from "../dbConnection.js";
import { DeleteRecord, DeleteFactory } from "../utils/deleteRecordFactory.js";

describe("DeleteRecord", () => {
  let connectionMock;
  let deleteRecord;

  beforeEach(() => {
    connectionMock = {
      query: jest.fn(),
    };
    deleteRecord = new DeleteRecord(connectionMock, "test_table");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a record by id", async () => {
    connectionMock.query.mockImplementationOnce((query, values, callback) => {
      expect(query).toBe("DELETE FROM test_table WHERE id = $1");
      expect(values).toEqual([1]);
      callback(null, { affectedRows: 1 });
    });

    const result = await deleteRecord.deleteRecord(1);

    expect(result).toBe(1);
    expect(connectionMock.query).toHaveBeenCalledTimes(1);
  });

  it("should reject with an error if delete query fails", async () => {
    const error = new Error("Delete query failed");
    connectionMock.query.mockImplementationOnce((query, values, callback) => {
      callback(error);
    });

    await expect(deleteRecord.deleteRecord(1)).rejects.toThrow(error);
    expect(connectionMock.query).toHaveBeenCalledTimes(1);
  });
});

describe("DeleteFactory", () => {
  let deleteFactory;

  beforeEach(() => {
    deleteFactory = new DeleteFactory();
  });

  it("should create an instance of DeleteRecord with pool connection", () => {
    const deleteQuery = deleteFactory.createDeleteQuery("test_table");
    expect(deleteQuery).toBeInstanceOf(DeleteRecord);
    expect(deleteQuery.connection).toBe(pool);
    expect(deleteQuery.table).toBe("test_table");
  });
});
