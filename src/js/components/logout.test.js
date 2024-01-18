import { logout } from "./logout";

beforeAll(() => {
  localStorage.setItem("user", "user data");
});

describe("user data exists in local storage", () => {
  it("verifies user exists in local storage", () => {
    expect(localStorage.__STORE__["user"]).toBe("user data");
  });
});

describe("Verify logout method functions", () => {
  it("verifies user date does not exist in local storage", () => {
    logout();
    const localData = localStorage.getItem("user");
    expect(localData).toBe(null);
  });
});
