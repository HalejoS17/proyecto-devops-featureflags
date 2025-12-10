import { useLDClient } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";
import { books } from "./books";

export default function App() {
  const ldClient = useLDClient();

  const [ready, setReady] = useState(false);
  const [busquedaAvanzada, setBusquedaAvanzada] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const isTest = import.meta.env.MODE === "test";

    if (isTest) {
      setTimeout(() => {
        setReady(true);
        setBusquedaAvanzada(false);
      }, 0);
      return;
    }

    if (!ldClient) {
      setTimeout(() => {
        setBusquedaAvanzada(false);
        setReady(true);
      }, 0);
      return;
    }

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
    return (
      <div style={loadingStyle}>
        <p style={{ fontSize: "22px", color: "#444" }}>Cargando LaunchDarkly...</p>
      </div>
    );
  }

  const categoriasUnicas = [...new Set(books.map((b) => b.category))];

  const filteredBooks = books.filter((b) => {
    const byTitle = b.title.toLowerCase().includes(searchTitle.toLowerCase());
    const byCategory =
      !busquedaAvanzada || category === "" || b.category === category;

    return byTitle && byCategory;
  });

  return (
    <div style={pageStyle}>
      {/* Badge del flag */}
      <div
        style={{
          background: busquedaAvanzada ? "#C8F7DC" : "#FFD6D6",
          color: busquedaAvanzada ? "#0D6832" : "#8B1A1A",
          padding: "10px 18px",
          borderRadius: "20px",
          display: "inline-block",
          marginBottom: "1.5rem",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        🌐 Flag busqueda_avanzada: {String(busquedaAvanzada)}
      </div>

      <h1 style={titleStyle}>📚 Biblioteca Virtual</h1>

      {/* Barra de búsqueda */}
      <div style={searchContainer}>
        <input
          type="text"
          placeholder="Buscar libro..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={searchInput}
        />

        {busquedaAvanzada && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={selectStyle}
          >
            <option value="">Todas las categorías</option>
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Lista de libros */}
      <div style={{ marginTop: "1.5rem" }}>
        {filteredBooks.map((b) => (
          <div key={b.id} style={bookCard}>
            <h3 style={{ margin: 0 }}>{b.title}</h3>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {b.author} — <span style={{ fontStyle: "italic" }}>{b.category}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

//
// ESTILOS
//

const pageStyle = {
  maxWidth: "950px",
  margin: "0 auto",
  padding: "2rem",
  fontFamily: "Inter, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "40px",
  fontWeight: "800",
  marginBottom: "1.5rem",
};

const searchContainer = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  flexWrap: "wrap",
};

const searchInput = {
  flex: 1,
  padding: "12px",
  minWidth: "250px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const selectStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const bookCard = {
  background: "white",
  padding: "1rem",
  borderRadius: "12px",
  marginBottom: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const loadingStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Inter, sans-serif",
};
