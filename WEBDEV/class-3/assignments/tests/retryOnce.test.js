const retryOnce = require("../callbacks/easy/retryOnce");

describe("retryOnce", () => {
  test("retries once after failure and then succeeds", async () => {
    let calls = 0;

    const fn = async () => {
      calls++;
      if (calls === 1) throw "fail";
      return "success";
    };

    const wrapped = retryOnce(fn);
    const result = await wrapped();

    expect(result).toBe("success");
    expect(calls).toBe(2);
  });

  test("throws if both attempts fail", async () => {
    let calls = 0;

    const fn = async () => {
      calls++;
      throw "error";
    };

    const wrapped = retryOnce(fn);

    await expect(wrapped()).rejects.toBe("error");
    expect(calls).toBe(2);
  });
});
