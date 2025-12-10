import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

vi.mock("launchdarkly-react-client-sdk", () => ({
  useLDClient: () => null,
  useFlags: () => ({ busqueda_avanzada: true })
}));

test("muestra el título Biblioteca virtual", () => {
  render(<App />);
  expect(screen.getByText(/Biblioteca virtual/i)).toBeInTheDocument();
});
