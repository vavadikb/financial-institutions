import { riskValue, incomePercentCounter } from "../utils/riskCounter.js";

describe("riskValue", () => {
  it("returns low for rows with all low risks", () => {
    const rows = [{ risks: "low" }, { risks: "low" }, { risks: "low" }];
    const result = riskValue(rows);
    expect(result).toEqual("low");
  });

  it("returns middle for rows with all middle risks", () => {
    const rows = [
      { risks: "middle" },
      { risks: "middle" },
      { risks: "middle" },
    ];
    const result = riskValue(rows);
    expect(result).toEqual("middle");
  });

  it("returns high for rows with all high risks", () => {
    const rows = [
      { risks: "high" },
      { risks: "high" },
      { risks: "high" },
      { risks: "high" },
    ];
    const result = riskValue(rows);
    expect(result).toEqual("high");
  });

  it("return value of different rows", () => {
    const rows = [
      { risks: "low" },
      { risks: "middle" },
      { risks: "high" },
      { risks: "low" },
      { risks: "middle" },
      { risks: "high" },
    ];
    const result = riskValue(rows);
    expect(result).toEqual("middle");
  });
});

describe("incomePercentCounter", () => {
  it("calculates the average income percent for rows", () => {
    const rows = [{ income_percent: "1.0" }, { income_percent: "2.5" }];
    const result = incomePercentCounter(rows);
    expect(result).toEqual(1.75);
  });

  it("check return for empty rows arg", () => {
    const rows = [];
    const result = incomePercentCounter(rows);
    expect(result).toEqual(0);
  });
});
