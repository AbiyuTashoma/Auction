import { searchText } from "./search";

const mockJsn = [
  {
    id: 1,
    title: "wrong title",
    description: "description",
  },
  {
    id: 2,
    title: "correct",
    description: "incorrect description",
  },
];

describe("verify search method function", () => {
  it("filters and returns objects containing the search value", async () => {
    const searchRes = await searchText(mockJsn, "r");
    expect(searchRes.length).toBe(2);
  });

  it("returns none if objects does not match search value", async () => {
    const searchRes = await searchText(mockJsn, "z");
    expect(searchRes.length).toBe(0);
  });
});
