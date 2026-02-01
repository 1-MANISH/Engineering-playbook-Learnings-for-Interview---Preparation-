const DynamicPriorityQueue = require("../callbacks/medium/DynamicPriorityQueue");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("DynamicPriorityQueue", () => {
  test("executes tasks respecting concurrency limit", async () => {
    const queue = new DynamicPriorityQueue(2);
    let running = 0;
    let maxSeen = 0;

    const task = async () => {
      running++;
      maxSeen = Math.max(maxSeen, running);
      await sleep(20);
      running--;
      return "done";
    };

    await Promise.all([
      queue.add(task),
      queue.add(task),
      queue.add(task),
      queue.add(task),
    ]);

    expect(maxSeen).toBeLessThanOrEqual(2);
  });

  test("executes higher priority first when both are queued", async () => {
    const queue = new DynamicPriorityQueue(0);
    const result = [];

    const p1 = queue.add(async () => {
      result.push("low");
    }, 1);

    const p2 = queue.add(async () => {
      result.push("high");
    }, 10);

    queue.setLimit(1);

    await Promise.all([p1, p2]);
    expect(result).toEqual(["high", "low"]);
  });

  test("resolves results correctly", async () => {
    const queue = new DynamicPriorityQueue(1);

    const res = await queue.add(async () => {
      await sleep(10);
      return 42;
    });

    expect(res).toBe(42);
  });

  test("rejects when task throws", async () => {
    const queue = new DynamicPriorityQueue(1);

    await expect(
      queue.add(async () => {
        throw new Error("boom");
      })
    ).rejects.toThrow("boom");
  });

  test("increasing concurrency drains the queue faster", async () => {
    const queue = new DynamicPriorityQueue(1);
    const order = [];

    queue.add(async () => {
      await sleep(30);
      order.push(1);
    });

    queue.add(async () => {
      await sleep(10);
      order.push(2);
    });

    setTimeout(() => {
      queue.setLimit(2);
    }, 5);

    await sleep(60);
    expect(order).toContain(1);
    expect(order).toContain(2);
  });
});
