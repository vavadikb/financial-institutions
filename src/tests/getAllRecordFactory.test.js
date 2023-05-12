import { pool } from "../dbConnection.js";
import {
  GetAllRecord,
  GetAllRecordFactory,
} from "../utils/getAllRecordsFactory.js";

jest.mock("../dbConnection.js");

describe("GetAllRecord", () => {
  let connection;
  let getRecord;

  beforeAll(() => {
    connection = pool;
    getRecord = new GetAllRecord(connection, "users");
  });

  test("getRecords returns expected result", async () => {
    const expected = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];

    connection.query.mockImplementation(() => Promise.resolve(expected));

    const result = await getRecord.getRecords();
    expect(result).toEqual(expected);
  });
});

describe("GetAllRecordFactory", () => {
  let connection;
  let factory;

  beforeAll(() => {
    connection = pool;
    factory = new GetAllRecordFactory();
  });

  test("createGetQuery returns an instance of GetAllRecord", () => {
    const getQuery = factory.createGetQuery("users");
    expect(getQuery).toBeInstanceOf(GetAllRecord);
  });
});
