const {
    fetchWithTimeout,
    fetchWithTimeoutClean,
  } = require("../callbacks/easy/fetchWithTimeout");
  
  describe("fetchWithTimeout", () => {
    beforeEach(() => {
      jest.useRealTimers();
      global.fetch = jest.fn();
    });
  
    test("resolves if fetch completes within time", async () => {
      global.fetch.mockResolvedValue("data");
  
      const result = await fetchWithTimeout("url", 100);
      expect(result).toBe("data");
    });
  
    test("rejects with timeout message if fetch is too slow", async () => {
      global.fetch.mockImplementation(
        () => new Promise((res) => setTimeout(() => res("data"), 100))
      );
  
      await expect(fetchWithTimeout("url", 20))
        .rejects.toBe("Request Timed Out");
    });
  });
  
  describe("fetchWithTimeoutClean (Promise.race)", () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    test("resolves when fetch wins the race", async () => {
      global.fetch.mockResolvedValue("data");
  
      const result = await fetchWithTimeoutClean("url", 100);
      expect(result).toBe("data");
    });
  
    test("rejects when timeout wins the race", async () => {
      global.fetch.mockImplementation(
        () => new Promise((res) => setTimeout(() => res("data"), 100))
      );
  
      await expect(fetchWithTimeoutClean("url", 20))
        .rejects.toBe("Request Timed Out");
    });
  });
  