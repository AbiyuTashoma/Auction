import { cleanDescription } from "./clean_description";

const mockList = [
  {
    title: "title",
    description: null,
  },
  {
    title: "title",
    description: "description",
  },
  {
    title: "title",
    description: undefined,
  },
];

const mockExpectedList = [
  {
    title: "title",
    description: "",
  },
  {
    title: "title",
    description: "description",
  },
  {
    title: "title",
    description: "",
  },
];

describe("verify clean description method functions", () => {
  it("filters and replaces null/undefined with empty string", async () => {
    const mockCleanResult = await cleanDescription(mockList);
    console.log(mockCleanResult);
    expect(mockCleanResult).toEqual(mockExpectedList);
  });
});
