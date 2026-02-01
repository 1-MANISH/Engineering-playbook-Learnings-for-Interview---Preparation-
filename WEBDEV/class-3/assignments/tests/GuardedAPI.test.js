const GuardedAPI = require("../callbacks/medium/GuardedAPI");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("GuardedAPI", () => {
  test("buffers calls until initialization completes", async () => {
    let initResolved = false;

    const initPromise = sleep(30).then(() => {
      initResolved = true;
    });

    const api = new GuardedAPI(initPromise);

    const call = jest.fn(() => "ok");

    const p = api.call(call);

    expect(initResolved).toBe(false);

    const result = await p;

    expect(initResolved).toBe(true);
    expect(result).toBe("ok");
    expect(call).toHaveBeenCalledTimes(1);
  });

  test("executes immediately if init already resolved", async () => {
    const api = new GuardedAPI(Promise.resolve());

    const call = jest.fn(() => "fast");

    const result = await api.call(call);

    expect(result).toBe("fast");
    expect(call).toHaveBeenCalledTimes(1);
  });

  test("multiple calls before init all wait and then execute", async () => {
    let ready;
    const initPromise = new Promise(res => (ready = res));

    const api = new GuardedAPI(initPromise);
    const results = [];

    const fn = (val) => {
      results.push(val);
      return val;
    };

    const p1 = api.call(() => fn(1));
    const p2 = api.call(() => fn(2));
    const p3 = api.call(() => fn(3));

    ready();

    const out = await Promise.all([p1, p2, p3]);

    expect(out).toEqual([1, 2, 3]);
    expect(results).toEqual([1, 2, 3]);
  });

  test("rejects calls if initialization fails", async () => {
    const api = new GuardedAPI(Promise.reject(new Error("init failed")));

    await expect(
      api.call(() => "never runs")
    ).rejects.toThrow("Initialization failed");
  });

  test("does not re-run initialization for subsequent calls", async () => {
    const initSpy = jest.fn();
    const initPromise = Promise.resolve().then(initSpy);

    const api = new GuardedAPI(initPromise);

    await api.call(() => "a");
    await api.call(() => "b");

    expect(initSpy).toHaveBeenCalledTimes(1);
  });
});
