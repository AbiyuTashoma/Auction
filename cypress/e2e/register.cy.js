beforeEach(() => {
  cy.visit("/");
  cy.intercept("POST", "https://api.noroff.dev/api/v1/auction/auth/register", {
    statusCode: 201,
    body: rResponse,
  });
});

const rResponse = {
  name: "Valid",
  email: "student2@stud.noroff.no",
  avatar: "https://avatar.com/myavatar/blue",
  id: "dad7db9c",
};

const rValidName = "Valid";
const rValidEmail = "student2@stud.noroff.no";
const rValidPassword = "123password";
const rValidAvatar = "https://avatar.com/myavatar/blue";

describe("Verify register functionality", () => {
  it("registers users with valid credentials ", () => {
    cy.get(".user-menu").click();
    cy.get(".register-btn").click();
    cy.get("#register-name").type(rValidName);
    cy.get("#register-email").type(rValidEmail);
    cy.get("#register-password").type(rValidPassword);
    cy.get("#register-confirm-password").type(rValidPassword);
    cy.get("#register-avatar").type(rValidAvatar);

    cy.get(".register-form").submit();
    cy.get(".feedback-success").should(
      "have.text",
      "Registration successful, You are now able to login!",
    );
  });
});
