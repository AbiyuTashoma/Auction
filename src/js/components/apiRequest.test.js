import { apiRequest } from "./apiRequest";

const apiUrl = "api-url";
const apiMethod = "api-method";

const mockApiSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    name: "student_1",
    email: "student1@stud.noroff.no",
    avatar: "https://gravatar.com/avatar/=robohash&r=x",
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik",
  }),
});

global.fetch = mockApiSuccess;

describe("verify api fetch function", () => {
  it("fetches api response and returns json", async () => {
    const apiResponse = await apiRequest(apiUrl, apiMethod);
    expect(apiResponse["json"]["name"]).toBe("student_1");
  });
});
