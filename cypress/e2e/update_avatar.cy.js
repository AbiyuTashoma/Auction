beforeEach(() => {
  cy.visit("/");
});

const uUrl = "http://www";

const validEmail = "student2@stud.noroff.no";
const validPassword = "12345678";
const validName = "student_2";

describe("Verify only logged in can create list", () => {
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

    cy.get(".user-menu").click();
    cy.get(".profile-btn").click();
    cy.get("#edit-btn").click();
    cy.get("#edit-avatar").type(uUrl);
    cy.get("#update-form").submit();

    cy.get(".note-update").should(
      "have.text",
      "Enter proper url and try again",
    );
    cy.get("#modal-edit").find("button").click();
    cy.get(".user-menu").click();
    cy.get(".logout-btn").click();
  });
});
