import { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "usuario1" && pass === "12345") {
      onLogin({
        key: "usuario1",
        name: "Usuario Uno",
        region: "latam",
      });
    } else if (user === "usuario2" && pass === "qwert") {
      onLogin({
        key: "usuario2",
        name: "Usuario Dos",
        region: "europa",
      });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        fontFamily: "Inter, sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "2.5rem",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "0.5rem", fontSize: "28px" }}>
          📚 Bienvenido a la Biblioteca Virtual
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          🔐 Iniciar Sesión
        </h2>

        <label>Usuario</label>
        <input
          type="text"
          placeholder="Ingresa tu usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={inputStyle}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  marginTop: "6px",
  marginBottom: "18px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.25)",
  color: "white",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg,#6a11cb,#2575fc)",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontSize: "17px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.2s",
};
