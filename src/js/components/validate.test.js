import {
  validateName,
  validateEmail,
  validateUrl,
  validateLength,
  validateNumber,
  validateDate,
} from "./validate";

const mockValidName = "name_";
const mockInvalidName = "name#¤";
const mockValidEmail = "student1@stud.noroff.no";
const mockInvalidEmail = "student1@.no";
const mockValidUrl = "https://www.noroff.no/";
const mockInvalidUrl = "hts://www.noroff.n/";
const mockValidNumber = 2;
const mockInvalidNumber = "a";
const mockValidDate = "2030-01-12T02:00";
const mockInvalidDate = "2023-01-12T02:00";

describe("verify validate name method functions", () => {
  it("validates allowed characters and length", () => {
    const vNameOne = validateName(mockValidName, 5, 20);
    expect(vNameOne).toBe(true);
  });
  it("invalidates un-allowed characters", () => {
    const vNameTwo = validateName(mockInvalidName, 5, 20);
    expect(vNameTwo).toBe(false);
  });
  it("invalidates un-allowed string length", () => {
    const vNameThree = validateName(mockValidName, 10, 20);
    expect(vNameThree).toBe(false);
  });
});

describe("verify validate email method functions", () => {
  it("validates proper email", () => {
    const vEmailOne = validateEmail(mockValidEmail);
    expect(vEmailOne).toBe(true);
  });
  it("invalidates improper email", () => {
    const vEmailTwo = validateEmail(mockInvalidEmail);
    expect(vEmailTwo).toBe(false);
  });
});

describe("verify validate url method functions", () => {
  it("validates proper url", () => {
    const vUrlOne = validateUrl(mockValidUrl);
    expect(vUrlOne).toBe(true);
  });
  it("invalidates improper url", () => {
    const vUrlTwo = validateEmail(mockInvalidUrl);
    expect(vUrlTwo).toBe(false);
  });
});

describe("verify validate length method functions", () => {
  it("validates string with in length range", () => {
    const vLengthOne = validateLength(mockValidName, 2, 10);
    expect(vLengthOne).toBe(true);
  });
  it("invalidates string outside length range", () => {
    const vLengthTwo = validateNumber(mockValidName, 10, 20);
    expect(vLengthTwo).toBe(false);
  });
});

describe("verify validate number method functions", () => {
  it("validates a positive number", () => {
    const vNumOne = validateNumber(mockValidNumber);
    expect(vNumOne).toBe(true);
  });
  it("invalidates non-number values", () => {
    const vNumTwo = validateNumber(mockInvalidNumber);
    expect(vNumTwo).toBe(false);
  });
});

describe("verify validate date method functions", () => {
  it("validates dates later than now", () => {
    const vDateOne = validateDate(mockValidDate);
    expect(vDateOne).toBe(true);
  });
  it("invalidates dates older than now", () => {
    const vDateTwo = validateDate(mockInvalidDate);
    expect(vDateTwo).toBe(false);
  });
});
