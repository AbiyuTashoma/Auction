beforeEach(() => {
  cy.visit("/");
});

const rName = "name";
const rEmail = "invalid_email.noroff.no";
const rPassword = "123pas";
const rAvatar = "http://www";

describe("Verify feedback on register failure functionality", () => {
  it("displays error on register failure, optional avatar url is verified if filled", () => {
    cy.get(".user-menu").click();
    cy.get(".register-btn").click();
    cy.get("#register-name").type(rName);
    cy.get("#register-email").type(rEmail);
    cy.get("#register-password").type(rPassword);

    cy.get(".register-form").submit();
    cy.get(".feedback-success").should("have.text", "");
    cy.get(".note-name").should(
      "have.text",
      "Username should be between 5 and 20 characters. Allowed characters are: a-z, A-Z, 0-9, _ (underscore)",
    );
    cy.get(".note-email").should("have.text", "Enter valid email");
    cy.get(".note-password").should(
      "have.text",
      "Password should be atleast 8 characters",
    );
    cy.get(".note-avatar").should("have.text", "");

    cy.get("#register-avatar").type(rAvatar);
    cy.get(".register-form").submit();
    cy.get(".note-avatar").should("have.text", "Enter valid url");
  });
});
