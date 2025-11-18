import Login from "../components/Login";

export default function LoginPage({ onSuccess }) {
  return (
    <div className="center-container">
      <Login onLogin={onSuccess} />
    </div>
  );
}
