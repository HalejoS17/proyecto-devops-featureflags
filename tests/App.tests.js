import { render, screen } from "@testing-library/react";
import App from "../src/App";

jest.mock("launchdarkly-react-client-sdk");

describe("Biblioteca virtual", () => {
  test("muestra título y lista de libros", async () => {
    render(<App />);

    const titulo = await screen.findByTestId("titulo-biblioteca");
    expect(titulo).toBeVisible();

    const libros = await screen.findAllByRole("listitem");
    expect(libros.length).toBeGreaterThan(0);
  });
});
