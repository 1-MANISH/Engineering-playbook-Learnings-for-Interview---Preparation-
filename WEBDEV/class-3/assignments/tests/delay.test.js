const delay = require("../callbacks/easy/delay");

describe("delay", () => {
  test("resolves with value after given time", async () => {
    const start = Date.now();
    const result = await delay(100, "hello");

    const diff = Date.now() - start;
    expect(result).toBe("hello");
    expect(diff).toBeGreaterThanOrEqual(100);
  }, 300);
});
