import { getMaxBid, getEnddate } from "./aListHtml";

const mockBids = [
  {
    id: "string 1",
    amount: 1,
    bidderName: "name 1",
    created: "2024-01-11T01:00:00.000Z",
  },
  {
    id: "string 2",
    amount: 15,
    bidderName: "name 2",
    created: "2024-01-12T02:00:00.000Z",
  },
  {
    id: "string 3",
    amount: 8,
    bidderName: "name 3",
    created: "2024-01-13T03:00:00.000Z",
  },
];

const mockDate = "2024-10-11T01:02:03.000Z";

describe("verify getMaxBid method functions", () => {
  it("filters and returns the maximum bid regardless of order in list", async () => {
    const mockMaxResult = await getMaxBid(mockBids);
    expect(mockMaxResult).toBe(15);
  });
});

describe("verify getEndDate method functions", () => {
  it("filters out unnecessary characters and returns date and time", async () => {
    const mockEndDateResult = await getEnddate(mockDate);
    expect(mockEndDateResult).toEqual("2024-10-11 at 01:02:03");
  });
});
