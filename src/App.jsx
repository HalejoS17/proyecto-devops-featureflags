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
    // 🟦 NUEVO: Si no hay LDClient (solo pasa en tests), continuar normal
    if (!ldClient) {
      console.warn("LaunchDarkly no está disponible (modo test).");

      Promise.resolve().then(() => {
        setBusquedaAvanzada(false);
        setReady(true);
      });

      return;
    }

    ldClient.waitForInitialization().then(() => {
      const flags = ldClient.allFlags();
      console.log("LD listo → Flags:", flags);

      const detail = ldClient.variationDetail("busqueda_avanzada", false);
      console.log("Detalle busqueda:", detail);

      setBusquedaAvanzada(detail.value);
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

      <h1>📚 Biblioteca virtual</h1>

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
