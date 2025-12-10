import { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "usuario1" && pass === "12345") {
      onLogin({
        key: "usuario1",
        name: "Usuario Uno",
        region: "latam"
      });
    } 
    else if (user === "usuario2" && pass === "qwert") {
      onLogin({
        key: "usuario2",
        name: "Usuario Dos",
        region: "europa"
      });
    }
    else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Iniciar sesión</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={e => setUser(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={e => setPass(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}
