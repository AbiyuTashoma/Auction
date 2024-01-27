beforeEach(() => {
  cy.visit("/");
  cy.intercept("POST", "https://api.noroff.dev/api/v1/auction/listings", {
    statusCode: 201,
    body: createListResponse,
  });
});

const createListResponse = {
  created: "2024-01-24T18:43:19.834Z",
  description: "Cute dogs",
  endsAt: "2024-04-25T20:43:00.000Z",
  id: "dad7db9c-8037-455c-8321-5da34f223d4c",
  media: ["https://images.unsplash.com/photo"],
  tags: [],
  title: "Dogs",
  updated: "2024-01-24T18:43:19.834Z",
};

const lTitle = " ";
const lDescription = "ivld";
const lUrl = "http://www";
const lDate = "2024-01-12T02:00";

const validListTitle = "Title";
const validListDescription = "Valid Description";
const validListUrl = "https://unsplash.com/photos/blue";
const ValidListDate = "2030-01-12T02:00";

const validEmail = "student2@stud.noroff.no";
const validPassword = "12345678";
const validName = "student_2";

describe("Verify logged in user can create a list", () => {
  it("opens log in page if user is not logged in", () => {
    cy.get("button").contains("Create list").click();
    cy.get("#createlist").submit();
    cy.url().should("include", "src/html/login");
  });

  it("validates and submits list form if user is logged in", () => {
    cy.get(".user-menu").click();
    cy.get(".login-btn").click();
    cy.get("#login-email").type(validEmail);
    cy.get("#login-password").type(validPassword);
    cy.get("#submit-login")
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem("user"))["name"]).to.eql(
          validName,
        );
      });

    cy.get("button").contains("Create list").click();
    cy.get("#list-title").type(lTitle);
    cy.get("#list-description").type(lDescription);
    cy.get("#list-media").type(lUrl);
    cy.get("#list-enddate").type(lDate);

    cy.get("#createlist").submit();
    cy.get(".note-title").should(
      "have.text",
      "Title should be between 1 to 50 characters.",
    );
    cy.get(".note-description").should(
      "have.text",
      "Description should be minimum of 5 characters.",
    );
    cy.get(".note-media").should(
      "have.text",
      "Add proper url. Urls are separated by comma",
    );
    cy.get(".note-enddate").should(
      "have.text",
      "Add proper end date and time.",
    );

    cy.get("#list-title").clear().type(validListTitle);
    cy.get("#list-description").clear().type(validListDescription);
    cy.get("#list-media").clear().type(validListUrl);
    cy.get("#list-enddate").clear().type(ValidListDate);

    cy.get("#createlist").submit();
    cy.get(".note-createlist").should("have.text", "List successfully created");

    cy.get(".user-menu").click();
    cy.get(".logout-btn").click();
  });
});
