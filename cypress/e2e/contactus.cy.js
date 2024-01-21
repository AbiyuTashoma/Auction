beforeEach(() => {
  cy.visit("/");
});

const cValidName = "student";
const cValidEmail = "student@stud.noroff.no";
const cValidMessage = "This is a valid message";

const cInvalidName = "n";
const cInvalidEmail = "invalid_email.noroff.no";
const cInvalidMessage = "one";

describe("Verify submit contact us form functionality", () => {
  it("displays success on successful submission", () => {
    cy.get(".user-menu").click();
    cy.get(".contactus-btn").click();

    cy.get("#contact-name").type(cValidName);
    cy.get("#contact-email").type(cValidEmail);
    cy.get("#contact-message").type(cValidMessage);

    cy.get(".contact-form").submit();
    cy.get(".contact-success").should("have.text", "Message successfully sent");
  });
  it("displays error on failed submission", () => {
    cy.get(".user-menu").click();
    cy.get(".contactus-btn").click();

    cy.get("#contact-name").type(cInvalidName);
    cy.get("#contact-email").type(cInvalidEmail);
    cy.get("#contact-message").type(cInvalidMessage);

    cy.get(".contact-form").submit();
    cy.get(".contact-success").should("have.text", "");
    cy.get(".note-contactname").should(
      "have.text",
      "Username should be between 2 and 20 characters. Allowed characters are: a-z, A-Z, 0-9, _ (underscore)",
    );
    cy.get(".note-contactemail").should("have.text", "Enter valid email");
    cy.get(".note-contactmessage").should(
      "have.text",
      "Message should be atleast 5 characters.",
    );
  });
});
