// App.jsx
import { useLDClient } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";
import { books } from "./books";

export default function App() {
  const ldClient = useLDClient(); // Hook 1

  const [ready, setReady] = useState(false);        // Hook 2
  const [busquedaAvanzada, setBusquedaAvanzada] = useState(false); // Hook 3
  const [searchTitle, setSearchTitle] = useState("");              // Hook 4
  const [category, setCategory] = useState("");                    // Hook 5

    useEffect(() => {
    const isTest = import.meta.env.MODE === "test";

    // 🟦 Caso 1: entorno de pruebas → liberar UI rápidamente
    if (isTest) {
      setTimeout(() => {
        setReady(true);
        setBusquedaAvanzada(false);
      }, 0);
      return;
    }

    // 🟦 Caso 2: no existe LaunchDarkly (CI, tests, modo offline)
    if (!ldClient) {
      setTimeout(() => {
        setBusquedaAvanzada(false);
        setReady(true);
      }, 0);
      return;
    }

    // 🟦 Caso 3: LaunchDarkly sí existe
    ldClient
      .waitForInitialization()
      .then(() => {
        const detail = ldClient.variationDetail("busqueda_avanzada", false);
        setBusquedaAvanzada(detail.value);
        setReady(true);
      })
      .catch(() => {
        setBusquedaAvanzada(false);
        setReady(true);
      });
  }, [ldClient]);

  if (!ready) {
    return <p>Cargando LaunchDarkly...</p>;
  }

  const categoriasUnicas = [...new Set(books.map((b) => b.category))];

  const filteredBooks = books.filter((book) => {
    const byTitle = book.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());

    const byCategory =
      !busquedaAvanzada || category === "" || book.category === category;

    return byTitle && byCategory;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <p>Flag busqueda_avanzada: {String(busquedaAvanzada)}</p>

      <h1 data-testid="titulo-biblioteca">📚 Biblioteca virtual</h1>

      <input
        type="text"
        placeholder="Buscar..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />

      {/* 🔓 Este select solo aparece si el flag está en true */}
      {busquedaAvanzada && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">Todas</option>
          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      <ul>
        {filteredBooks.map((b) => (
          <li key={b.id}>
            {b.title} – {b.author} ({b.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
