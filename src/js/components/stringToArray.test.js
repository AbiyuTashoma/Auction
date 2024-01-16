import { toArray } from "./stringToArray";

const mockString = "a string,another string, needs trimming ";
const mockExpected = ["a string", "another string", "needs trimming"];
const mockSplitter = ",";

describe("verify to array method splits string and returns trimmed array elements", () => {
  it("splits string after  and returns trimmed array", () => {
    const toArrayResult = toArray(mockString, mockSplitter);
    expect(toArrayResult).toEqual(mockExpected);
  });
});
