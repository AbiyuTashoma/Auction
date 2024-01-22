beforeEach(() => {
  cy.visit("/");
});

const lTitle = " ";
const lDescription = "ivld";
const lUrl = "http://www";
const lDate = "2024-01-12T02:00";

const validEmail = "student2@stud.noroff.no";
const validPassword = "12345678";
const validName = "student_2";

describe("Verify only logged in can create list", () => {
  it("opens log in page if user is not logged in", () => {
    cy.get("button").contains("Create list").click();
    cy.get("#createlist").submit();
    cy.url().should("include", "src/html/login");
  });

  it("submits list form if user is logged in", () => {
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
    cy.get(".user-menu").click();
    cy.get(".logout-btn").click();
  });
});
