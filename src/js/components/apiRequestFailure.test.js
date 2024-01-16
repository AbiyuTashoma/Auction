import { apiRequest } from "./apiRequest";

const apiUrl = "api-url";
const apiMethod = "api-method";

const mockApiFailure = jest.fn().mockResolvedValue({
  ok: false,
  statusText: "Error fetching api data",
});

global.fetch = mockApiFailure;

describe("verify api fetch failure function", () => {
  it("responds with error on api failure", async () => {
    await expect(apiRequest(apiUrl, apiMethod)).rejects.toThrow(
      "Error fetching api data",
    );
  });
});
