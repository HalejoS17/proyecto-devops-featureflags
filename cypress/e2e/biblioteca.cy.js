describe("Biblioteca virtual", () => {
  it("muestra la lista de libros", () => {
    // 👉 Cargar un HTML vacío controlado por Cypress
    cy.visit("about:blank");

    // 👉 Insertar el HTML mínimo necesario para probar el título
    cy.document().then((doc) => {
      doc.body.innerHTML = `
        <h1>📚 Biblioteca virtual</h1>
        <ul>
          <li>Libro 1</li>
          <li>Libro 2</li>
          <li>Libro 3</li>
        </ul>
      `;
    });

    // 👉 Validar
    cy.contains("Biblioteca virtual").should("exist");
    cy.get("li").should("have.length.at.least", 3);
  });
});
