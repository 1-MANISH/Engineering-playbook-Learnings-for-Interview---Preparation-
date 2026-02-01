const once = require("../callbacks/easy/once");

describe("once", () => {
  test("calls the async function only once", async () => {
    let callCount = 0;

    const fn = async (x) => {
      callCount++;
      return x * 2;
    };

    const onceFn = once(fn);

    const r1 = await onceFn(2);
    const r2 = await onceFn(10);

    expect(callCount).toBe(1);
    expect(r1).toBe(4);
    expect(r2).toBe(4);
  });

  test("returns the same promise for concurrent calls", async () => {
    let callCount = 0;

    const fn = async () => {
      callCount++;
      await new Promise((res) => setTimeout(res, 50));
      return "done";
    };

    const onceFn = once(fn);

    const [r1, r2] = await Promise.all([onceFn(), onceFn()]);

    expect(callCount).toBe(1);
    expect(r1).toBe("done");
    expect(r2).toBe("done");
  });
});
