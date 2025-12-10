import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import Login from "./Login.jsx";

import { LDProvider } from "launchdarkly-react-client-sdk";

const clientSideID = import.meta.env.VITE_LD_CLIENT_ID;

function RootApp() {
  const [userContext, setUserContext] = useState(null);

  if (!userContext) {
    return <Login onLogin={setUserContext} />;
  }

  console.log("User context enviado a LD:", userContext);
  console.log("ENV desde Vite:", import.meta.env);
  console.log("ClientSideID:", import.meta.env.VITE_LD_CLIENT_ID);

  return (
    <LDProvider
      clientSideID={clientSideID}
      context={{
        kind: "user",
        key: userContext.key,
        name: userContext.name,
        region: userContext.region,
      }}
      options={{
        bootstrap: "latest",
        sendEvents: true,
        evaluationReasons: true,
      }}
    >
      <App user={userContext} />
    </LDProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
