const Scheduler = require("../callbacks/hard/Scheduler");

describe("Scheduler", () => {
  test("runs higher priority task first", async () => {
    const scheduler = new Scheduler();
    const order = [];

    scheduler.schedule(async () => order.push("low"), 1);
    scheduler.schedule(async () => order.push("high"), 10);

    await scheduler.run();
    expect(order[0]).toBe("high");
  });
});
