beforeEach(() => {
  cy.visit("/");
});

describe("Verify view a list link functions", () => {
  it("opens list page when selected from image", () => {
    cy.get(".carousel-inner")
      .first()
      .find("a")
      .should("have.attr", "href")
      .then((href) => {
        cy.get(".carousel-inner")
          .first()
          .click({ force: true })
          .then(() => {
            cy.url().should("include", href);
          });
      });
  });
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
