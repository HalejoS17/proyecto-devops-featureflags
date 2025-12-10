import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título de la biblioteca", async () => {
  render(<App />);

  // Espera a que la UI deje de estar "cargando"
  const heading = await screen.findByText(/Biblioteca virtual/i, {}, { timeout: 2000 });

  expect(heading).toBeInTheDocument();
});
