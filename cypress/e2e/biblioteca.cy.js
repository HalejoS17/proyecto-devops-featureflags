describe("Biblioteca virtual", () => {
  it("muestra la lista de libros", () => {
    // ✅ Usa el baseUrl configurado en cypress.config.cjs
    cy.visit("/");

    cy.contains("Biblioteca virtual").should("exist");
    cy.get("li").should("have.length.at.least", 5);
  });
});
