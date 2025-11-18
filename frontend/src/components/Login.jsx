import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-box">
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>Login</h2>

      <input
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
}
