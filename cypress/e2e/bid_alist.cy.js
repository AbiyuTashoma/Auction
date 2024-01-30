beforeEach(() => {
  cy.visit("/");
  cy.intercept("GET", /(_bids=true)/).as("getAlist");

  cy.intercept("POST", /(\/bids)/, {
    statusCode: 201,
    body: cBidResponse,
  }).as("bid");
});

const cBidResponse = {
  created: "2024-01-24T18:43:19.834Z",
  description: "Cute dogs",
  endsAt: "2024-04-25T20:43:00.000Z",
  id: "dad7db",
};

const bEmail = "student2@stud.noroff.no";
const bPassword = "12345678";
const bName = "student_2";

describe("Verify user is able to bid on a list", () => {
  it("allows users to bid on a list and display success message", () => {
    cy.get(".user-menu").click();
    cy.get(".login-btn").click();
    cy.get("#login-email").type(bEmail);
    cy.get("#login-password").type(bPassword);
    cy.get("#submit-login").click();

    cy.get(".card-body").first().find("a").click();

    cy.wait("@getAlist").then(() => {
      cy.get(".bid-form").find("button").click();
      cy.get(".note-bid").should("have.text", "Bid successfully placed");
    });
  });
});
