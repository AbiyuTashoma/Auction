beforeEach(() => {
  cy.visit("/");
});

const validEmail = "user_name2@stud.noroff.no";
const validPassword = "12345678";
const validName = "user_name2";

describe("Verify login and logout functionality", () => {
  it("logs in user with valid credentials, logs out and clears local storage", () => {
    cy.clearLocalStorage().then((ls) => {
      expect(ls.getItem("user")).to.be.null;
    });
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
    cy.get(".logout-btn").click();
    cy.should(() => {
      expect(localStorage.getItem("user")).to.be.null;
    });
  });
});
