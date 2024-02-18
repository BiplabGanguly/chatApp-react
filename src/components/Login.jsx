import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [message, setMessage] = useState("");
  const [note, setNote] = useState([]);
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();

  function submitdata() {
    const data = { username, password };
    if (username !== "" && password !== "") {
      fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((res) => setNote(res))
        .catch((err) => setMessage("login failed"));
      console.log(note);
      if (note.payload === true) {
        navigate("/chat", { state: { param: note.username } });
      } else if (note.payload === false) {
        setMessage("invalid");
      }
    } else {
      setMessage("invalid");
    }
  }
  return (
    <div className="container login-container">
      <div className="row login-row">
        <h2>login</h2>
      </div>
      {message}
      <div className="row login-row">
        <div className="col-md-4 offset-md-4">
          <input
            type="text"
            className="form-control login-input"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            placeholder="username"
          />
        </div>
      </div>
      <div className="row login-row">
        <div className="col-md-4 offset-md-4">
          <input
            type="password"
            className="form-control login-input"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="password"
          />
        </div>
      </div>
      <div className="row login-row">
        <div className="col-md-4 offset-md-4">
          <button
            type="button"
            className="btn login-btn form-control"
            onClick={submitdata}
          >
            Login
          </button>
        </div>
      </div>

      <span className="login-text">
        Have not an accout?{" "}
        <Link to="/signin" className="login-link">
          signin
        </Link>{" "}
        now
      </span>
    </div>
  );
}

export default Login;
