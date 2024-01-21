beforeEach(() => {
  cy.visit("/");
});

describe("Verify view a list link functions", () => {
  it("opens list page when selected from image", () => {
    cy.get(".carousel-inner")
      .first()
      .click()
      .then(() => {
        cy.url().should("include", "/src/html/alist.html?id=");
      });
  });
  it("opens list page when selected from button", () => {
    cy.get(".card-body")
      .first()
      .find("a")
      .click()
      .then(() => {
        cy.url().should("include", "/src/html/alist.html?id=");
      });
  });
});
