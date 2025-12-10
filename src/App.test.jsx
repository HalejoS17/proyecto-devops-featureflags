import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título de la biblioteca", () => {
  render(<App />);
  const heading = screen.getByText(/Biblioteca virtual/i);
  expect(heading).toBeInTheDocument();
});
