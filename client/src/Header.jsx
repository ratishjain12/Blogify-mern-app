import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}profile`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout(e) {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BASE_URL}logout`, {
      credentials: "include",
      method: "POST",
    });

    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
      <div className="header-wrapper container">
        <Link to="/" className="logo">
          Blogify
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <Link onClick={logout} style={{ cursor: "pointer" }}>
                Logout
              </Link>
            </>
          )}

          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
