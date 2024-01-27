beforeEach(() => {
  cy.visit("/");
  cy.intercept(
    "PUT",
    "https://api.noroff.dev/api/v1/auction/profiles/student_2/media",
    {
      statusCode: 201,
      body: updateAvatarResponse,
    },
  );
});

const updateAvatarResponse = {
  name: "student_2",
  id: "dad7db9c-8037-455c-8321-5da34f223d4c",
  media: ["https://images.unsplash.com/photo"],
  credit: 900,
};

const uUrl = "http://www";

const validEmail = "student2@stud.noroff.no";
const validPassword = "12345678";
const validName = "student_2";
const validUrl = "https://images.unsplash.com/photo";

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

    cy.get("#edit-avatar").clear().type(validUrl);
    cy.get("#update-form").submit();

    cy.get(".note-update").should("have.text", "Update successful");

    cy.get("#modal-edit").find("button").click();
    cy.get(".user-menu").click();
    cy.get(".logout-btn").click();
  });
});
