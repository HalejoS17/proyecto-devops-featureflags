describe("Biblioteca virtual", () => {
  it("muestra la lista de libros", () => {
    cy.visit("/");

    // Espera hasta que el título esté visible
    cy.waitForAppReady();

    cy.get("li").should("have.length.at.least", 5);
  });
});
