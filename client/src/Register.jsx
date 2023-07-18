import { useState } from "react";
import { Navigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "content-type": "application/json" },
    });

    if (response.status === 200) {
      alert("registeration Successful");
      setRedirect(true);
    } else {
      alert("registeration failed");
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="form-container" onSubmit={register}>
      <h1>Register</h1>
      <form action="" className="register">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
export default Register;
