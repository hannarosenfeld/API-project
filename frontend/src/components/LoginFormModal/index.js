import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    console.log(errors)
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)

    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  const LoginAsDemoUser = async () => {
     await dispatch(sessionActions.login({ credential: "user", password: "passwort" }))
    .then(closeModal())
  }

  return (
    <div className="login-form-modal">
      <h1>Log In</h1>
      <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        justifyContent: "space-between",
      }}
      >
        <div
        style={{
          border: "1px solid #717171",
          marginBottom: "1em"
        }}>
          <input
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && (
          <p style={{fontSize:"0.8em", color: "darkred"}}>{errors.credential}</p>
        )}
        <button
          disabled={credential.length < 4 || password.length < 6 ? true : false}
          type="submit"
          style={{
            height: "3em",
            backgroundColor: "var(--airbnb)",
            color: "var(--white)",
          }}
        >Log In</button>
      </form>

      <button style={{background: "transparent", margin: "1em"}} onClick={() => LoginAsDemoUser()}>Log in as Demo User</button>
    </div>
  );
}

export default LoginFormModal;
