import style from "./Login.module.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [emailError, setEmailError] = useState("Email cannot be empty");
  const [passwordError, setPasswordError] = useState(
    "Password cannot be empty"
  );

  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const [fetchErrorEmail, setFetchErrorEmail] = useState(false);
  const [fetchErrorIncorrect, setFetchErrorIncorrect] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(e.target.value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!re.test(e.target.value)) {
      setPasswordError(
        "The password must be at least 8 characters long, one uppercase letter and one symbol."
      );
    } else {
      setPasswordError("");
    }
  };

  const formData = async (
    e,
    email,
    password,
    setFetchErrorEmail,
    setFetchErrorIncorrect,
    navigate
  ) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(userData);

      if (!response || response.status >= 400) {
        throw new Error("Error sending data");
      }

      localStorage.setItem("token", response.token);
      console.log("Login successful", response);
      setFetchErrorEmail(false);
      setFetchErrorIncorrect(false);
      navigate("/ChooseGamePage");
    } catch (error) {
      if (response?.status === 404) {
        setFetchErrorEmail(true);
        setFetchErrorIncorrect(false);
      }
      if (response?.status === 400) {
        setFetchErrorIncorrect(true);
        setFetchErrorEmail(false);
      }
      console.error("Login failed", error);
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailValid(true);
        break;
      case "password":
        setPasswordValid(true);
        break;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.login_wrapper}>
        <div className={style.title_block}>
          <h1 className={style.title}>Log in</h1>
        </div>
        <div className={style.have_account}>
          <p>Don't have an account yet? </p>
          <p>
            <Link className={style.custom_link} to="/registration">
              Click
            </Link>
          </p>
        </div>
        <form onSubmit={formData}>
          <div
            style={{ marginBottom: 10 + "px" }}
            className={style.input_block}
          >
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              className={style.input}
              type="text"
              onBlur={(e) => {
                blurHandler(e);
              }}
              value={email}
              onChange={(e) => emailHandler(e)}
              required
            />
            {emailValid && emailError && (
              <div className={style.error}>{emailError}</div>
            )}
          </div>
          <div
            style={{ marginBottom: 10 + "px" }}
            className={style.input_block}
          >
            <label>Password</label>
            <input
              name="password"
              placeholder="password"
              className={style.input}
              type="password"
              onChange={(e) => {
                passwordHandler(e);
              }}
              onBlur={(e) => {
                blurHandler(e);
              }}
              value={password}
              required
            />
            {passwordValid && passwordError && (
              <div className={style.error}>{passwordError}</div>
            )}
          </div>

          <div
            style={{ marginBottom: 10 + "px" }}
            className={style.login_block}
          >
            <button
              disabled={!formValid}
              className={style.button_login}
              type="submit"
              style={{
                backgroundColor: !formValid ? "#D3D3D3" : "#BA1F33",
                cursor: !formValid ? "not-allowed" : "pointer",
                opacity: !formValid ? 0.6 : 1,
              }}
            >
              Log in
            </button>
            {fetchErrorEmail && (
              <div style={{ paddingTop: 10 + "px" }} className={style.error}>
                Users not found
              </div>
            )}
            {fetchErrorIncorrect && (
              <div style={{ paddingTop: 10 + "px" }} className={style.error}>
                Incorrect login or password
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
