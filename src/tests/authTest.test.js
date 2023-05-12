import {
  getIdByUserName,
  generateAccessToken,
} from "../controllers/authController.js";

describe("getIdByUserName", () => {
  it("return user_id by username", async () => {
    const result = await getIdByUserName("vadick123");
    expect(result).toEqual({ id: 7 }); // in db vadick123 has id 7
  });

  it("should return undefined when given an invalid username", async () => {
    const result = await getIdByUserName("randomname"); // randomname is undefined in db
    expect(result).toBeUndefined();
  });
});

describe("generateAccessToken", () => {
  it("return jwt token for user vadick123", async () => {
    const token = await generateAccessToken("vadick123");
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);
  });
});
