const rejectAfter = require("../callbacks/easy/rejectAfter");

describe("rejectAfter", () => {
  test("rejects after given milliseconds", async () => {
    const start = Date.now();

    await expect(rejectAfter(100)).rejects.toThrow("Rejected after 100ms");

    const diff = Date.now() - start;
    expect(diff).toBeGreaterThanOrEqual(100);
  }, 300);
});
