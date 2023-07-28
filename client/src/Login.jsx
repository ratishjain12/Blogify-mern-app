import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
    });

    console.log(response);
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong username or password");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form action="" className="login">
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
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
}
export default Login;
