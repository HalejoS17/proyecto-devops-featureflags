// Archivo de soporte para Cypress.
// Puedes agregar comandos globales aquí si los necesitas.
// Comando para esperar a que la aplicación esté lista
Cypress.Commands.add("waitForAppReady", () => {
  cy.get('[data-testid="titulo-biblioteca"]', { timeout: 10000 })
    .should("be.visible");
});

