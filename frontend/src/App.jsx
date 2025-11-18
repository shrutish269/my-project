import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <Home />
      ) : (
        <LoginPage onSuccess={() => setLoggedIn(true)} />
      )}
    </>
  );
}
