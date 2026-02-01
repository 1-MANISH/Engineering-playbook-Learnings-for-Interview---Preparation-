const runWithDependencies = require("../callbacks/medium/runWithDependencies");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

describe("runWithDependencies", () => {
  test("runs tasks respecting dependencies", async () => {
    const order = [];

    const tasks = [
      {
        id: "A",
        run: async () => {
          await sleep(10);
          order.push("A");
          return "A-result";
        },
      },
      {
        id: "B",
        deps: ["A"],
        run: async () => {
          order.push("B");
          return "B-result";
        },
      },
      {
        id: "C",
        deps: ["B"],
        run: async () => {
          order.push("C");
          return "C-result";
        },
      },
    ];

    const result = await runWithDependencies(tasks);

    expect(order).toEqual(["A", "B", "C"]);
    expect(result).toEqual(["A-result", "B-result", "C-result"]);
  });

  test("runs independent tasks in parallel", async () => {
    const start = Date.now();

    const tasks = [
      {
        id: "A",
        run: async () => sleep(30),
      },
      {
        id: "B",
        run: async () => sleep(30),
      },
    ];

    await runWithDependencies(tasks);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(60);
  });

  test("does not re-run completed dependencies", async () => {
    let count = 0;

    const tasks = [
      {
        id: "A",
        run: async () => {
          count++;
          return "A";
        },
      },
      {
        id: "B",
        deps: ["A"],
        run: async () => "B",
      },
      {
        id: "C",
        deps: ["A"],
        run: async () => "C",
      },
    ];

    await runWithDependencies(tasks);
    expect(count).toBe(1);
  });

  test("throws error on circular dependency", async () => {
    const tasks = [
      {
        id: "A",
        deps: ["B"],
        run: async () => "A",
      },
      {
        id: "B",
        deps: ["A"],
        run: async () => "B",
      },
    ];

    await expect(runWithDependencies(tasks)).rejects.toThrow(
      "Circular Dependency Detected",
    );
  });
});
