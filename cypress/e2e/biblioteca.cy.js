describe("Biblioteca virtual", () => {
  it("muestra la lista de libros", () => {
    cy.visit("http://localhost:5173"); // o el puerto de Vite
    cy.contains("Biblioteca virtual").should("exist");
    cy.get("li").should("have.length.at.least", 5);
  });
});
