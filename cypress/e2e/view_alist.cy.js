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
        cy.get(".carousel-inner")
          .first()
          .find("a")
          .should("have.attr", "href")
          .then((href2) => {
            cy.get(".card-body")
              .first()
              .find("a")
              .click()
              .then(() => {
                cy.url().should("include", href);
                expect(href).to.equal(href2);
              });
          });
      });
  });
});
