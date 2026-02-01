const LeakyBucket = require("../callbacks/hard/LeakyBucket");

describe("LeakyBucket", () => {
  test("processes tasks in FIFO order", async () => {
    const bucket = new LeakyBucket(5, 10);
    const results = [];

    const task = (value) => async () => {
      results.push(value);
      return value;
    };

    const p1 = bucket.add(task(1));
    const p2 = bucket.add(task(2));
    const p3 = bucket.add(task(3));

    const resolved = await Promise.all([p1, p2, p3]);

    expect(resolved).toEqual([1, 2, 3]);
    expect(results).toEqual([1, 2, 3]);
  });

  test("enforces leak rate between task executions", async () => {
    const bucket = new LeakyBucket(5, 50);
    const timestamps = [];

    const task = async () => {
      timestamps.push(Date.now());
    };

    await Promise.all([
      bucket.add(task),
      bucket.add(task),
      bucket.add(task),
    ]);

    expect(timestamps.length).toBe(3);
    expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(45);
    expect(timestamps[2] - timestamps[1]).toBeGreaterThanOrEqual(45);
  }, 1000);

  test("rejects immediately when bucket capacity is exceeded", async () => {
    const bucket = new LeakyBucket(1, 20);

    const slowTask = async () => {
      await new Promise(r => setTimeout(r, 100));
    };

    const p1 = bucket.add(slowTask);
    const p2 = bucket.add(slowTask);

    await expect(p2).rejects.toThrow("Rate Limit Exceeded");
    await p1;
  });

  test("continues processing even if a task fails", async () => {
    const bucket = new LeakyBucket(5, 10);
    const results = [];

    const goodTask = async () => {
      results.push("ok");
      return "ok";
    };

    const badTask = async () => {
      throw new Error("fail");
    };

    const p1 = bucket.add(goodTask);
    const p2 = bucket.add(badTask);
    const p3 = bucket.add(goodTask);

    await expect(p2).rejects.toThrow("fail");

    const resolved = await Promise.all([p1, p3]);
    expect(resolved).toEqual(["ok", "ok"]);
    expect(results).toEqual(["ok", "ok"]);
  });
});
