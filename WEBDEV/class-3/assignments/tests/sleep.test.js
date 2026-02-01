const sleep = require("../callbacks/easy/sleep");

describe("sleep function", () => {
  test("sleeps for 1 second", async () => {
    const start = Date.now();
    await sleep(1000);
    expect(Date.now() - start).toBeGreaterThanOrEqual(1000);
  }, 2000);

  test("sleeps for 500 ms", async () => {
    const start = Date.now();
    await sleep(500);
    expect(Date.now() - start).toBeGreaterThanOrEqual(500);
  }, 1500);
});
