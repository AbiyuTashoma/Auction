beforeEach(() => {
  cy.visit("/");
});

describe("Verify view a list link functions", () => {
  it("opens list page when selected", () => {
    cy.get(".card-body")
      .first()
      .find("a")
      .should("have.attr", "href")
      .then((href) => {
        cy.get(".card-body")
          .first()
          .find("a")
          .click()
          .then(() => {
            cy.url().should("include", href);
          });
      });
  });
});
