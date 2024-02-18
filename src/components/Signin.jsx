import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  function signindata() {
    const data = { email, username, password };
    console.log(data);
    if (
      password === cpass &&
      email !== "" &&
      username !== "" &&
      password !== ""
    ) {
      fetch("http://127.0.0.1:8000/signin/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((res) => setNote(res.payload))
        .catch((err) => setNote("signin failed"));
      setEmail("");
      setUser("");
      setPass("");
      setCpass("");
    } else {
      setNote("Invalid");
    }
  }
  return (
    <div>
      <div className="container login-container">
        <div className="row login-row">
          <h2>signin</h2>
        </div>
        {note}
        <div className="row login-row">
          <div className="col-md-4 offset-md-4">
            <input
              type="email"
              className="form-control login-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
            />
          </div>
        </div>
        <div className="row login-row">
          <div className="col-md-4 offset-md-4">
            <input
              type="text"
              className="form-control login-input"
              value={username}
              onChange={(e) => {
                setUser(e.target.value);
              }}
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
              onChange={(e) => {
                setPass(e.target.value);
              }}
              placeholder="password"
            />
          </div>
        </div>
        <div className="row login-row">
          <div className="col-md-4 offset-md-4">
            <input
              type="password"
              className="form-control login-input"
              value={cpass}
              onChange={(e) => {
                setCpass(e.target.value);
              }}
              placeholder="confirm password"
            />
          </div>
        </div>
        <div className="row login-row">
          <div className="col-md-4 offset-md-4">
            <button
              type="button"
              className="btn signin-btn form-control"
              onClick={signindata}
            >
              signin
            </button>
          </div>
        </div>

        <span className="login-text">
          back to{" "}
          <Link to="/" className="login-link">
            login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signin;
