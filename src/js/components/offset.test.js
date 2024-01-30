import { setOffset, resetOffset } from "./offset";

const objMockSet = { offset: 50 };
const objMockReset = { offset: 500 };

describe("verify set and reset offset method functions", () => {
  it("increaments offset value by a given value", () => {
    setOffset(objMockSet, 100);
    expect(objMockSet["offset"]).toBe(150);
  });
  it("resets offset value to 100", () => {
    resetOffset(objMockReset);
    expect(objMockReset["offset"]).toBe(100);
  });
});
