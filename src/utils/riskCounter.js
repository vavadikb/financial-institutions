export const riskValue = (rows) => {
  let resCount = 0;
  rows.forEach((item) => {
    if (item.risks === "low") {
      resCount += 1;
    } else if (item.risks === "middle") {
      resCount += 2;
    } else if (item.risks === "high") {
      resCount += 3;
    }
  });

  let mean = resCount / rows.length;
  let result;
  if (mean === 1) {
    result = "low";
  } else if (mean === 2) {
    result = "middle";
  } else if (mean === 3) {
    result = "high";
  }
  console.log(result, "result");
  return result;
};

export const incomePercentCounter = (rows) => {
  const percetOfIncome =
    rows.reduce((acc, item) => {
      return acc + +item.income_percent;
    }, 0) / rows.length;
  return percetOfIncome;
};
