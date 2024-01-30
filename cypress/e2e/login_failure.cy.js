beforeEach(() => {
  cy.visit("/");
});

const invalidEmail = "unreg_user_email@stud.noroff.no";
const invalidPassword = "123password45678";

describe("Verify feedback on login failure functionality", () => {
  it("displays error on login failure", () => {
    cy.clearLocalStorage().then((ls) => {
      expect(ls.getItem("user")).to.be.null;
    });
    cy.get(".user-menu").click();
    cy.get(".login-btn").click();
    cy.get("#login-email").type(invalidEmail);
    cy.get("#login-password").type(invalidPassword);
    cy.get("#submit-login")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.be.null;
      });
    cy.get(".feedback-error").should("have.text", "Invalid email or password");
  });
});
