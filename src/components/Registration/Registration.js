import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Date from "./Date";
import { signupUser } from "../../service/UserService";
import style from "../Login/Login.module.css";

function Registration() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState(null);

  const [fetchEror, setFetchError] = useState(false);

  const [userNameValid, setUserNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confPasswordValid, setConfPassValid] = useState(false);

  const [userError, setUserError] = useState("Name cannot be empty");
  const [emailError, setemailError] = useState("Email cannot be empty");
  const [passwordError, setPasswordError] = useState(
    "Password cannot be empty"
  );
  const [confPasswordError, setConfPasswordError] = useState(
    "Password cannot be empty"
  );
  const [birthdayError, setBirthdayError] = useState("Date cannot be empty");

  const handleDateChange = useCallback((date) => {
    setBirthday(date);
    console.log(date);
  }, []);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      emailError ||
      userError ||
      passwordError ||
      confPasswordError ||
      birthdayError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    emailError,
    userError,
    passwordError,
    confPasswordError || birthdayError,
  ]);

  const userHandler = (e) => {
    setUserName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 50) {
      setUserError("The name must be between 2 and 50 characters long");
    } else {
      setUserError("");
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(e.target.value)) {
      setemailError("Invalid email");
    } else {
      setemailError("");
    }
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return re.test(password);
  };

  const passwordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(
        "The password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special symbol."
      );
    } else {
      setPasswordError("");
    }

    if (confirmPassword) {
      if (value !== confirmPassword) {
        setConfPasswordError("Passwords don't match.");
      } else {
        setConfPasswordError("");
      }
    }
  };

  const confPasswordHandler = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfPasswordError("Passwords don't match.");
    } else {
      setConfPasswordError("");
    }
  };

  const formData = async (e) => {
    e.preventDefault();

    if (!formValid) {
      console.log("The form did not pass validation.");
      return;
    }

    const userData = {
      username: userName,
      email: email,
      password: password,
      birthday: birthday ? birthday.toISOString() : null,
    };
    console.log(userData);

    try {
      const result = await signupUser(userData);
      setFetchError(false);
      console.log("Form submitted successfully:", result);
      localStorage.setItem("token", result.token);
      navigate("/ChooseGamePage");
    } catch (error) {
      setFetchError(true);
      console.error("Error:", error);
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "username":
        setUserNameValid(true);
        break;
      case "email":
        setEmailValid(true);
        break;
      case "password":
        setPasswordValid(true);
        break;
      case "confirmPassword":
        setConfPassValid(true);
        break;
    }
  };

  return (
    <div className={style.container}>
      <br />
      <div className={style.login_wrapper}>
        <div className={style.title_block}>
          <h1 className={style.title}>Sign Up</h1>
        </div>
        <div className={style.have_account}>
          <p>Already have an account? </p>
          <p>
            <Link className={style.custom_link} to="/login">
              Click
            </Link>
          </p>
        </div>
        <form onSubmit={formData}>
          <div className={style.input_block}>
            <label>User Name</label>
            <input
              name="username"
              placeholder="Username"
              className={style.input}
              type="text"
              required
              onChange={(e) => {
                userHandler(e);
              }}
              onBlur={(e) => {
                blurHandler(e);
              }}
              value={userName}
            />
            {userNameValid && userError && (
              <div className={style.error}>{userError}</div>
            )}
          </div>
          <div className={style.input_block}>
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
          <div className={style.input_block}>
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
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
          <div className={style.input_block}>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              className={style.input}
              type="password"
              onBlur={(e) => {
                blurHandler(e);
              }}
              value={confirmPassword}
              onChange={(e) => {
                confPasswordHandler(e);
              }}
              required
            />
            {confPasswordValid && confPasswordError && (
              <div className={style.error}>{confPasswordError}</div>
            )}
          </div>
          <div className={style.input_block}>
            <label>Date</label>
            <Date
              onDateChange={handleDateChange}
              BitdayError={setBirthdayError}
            />
          </div>
          <div className={style.login_block}>
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
              Sign Up
            </button>
            {fetchEror && (
              <div style={{ paddingTop: 10 + "px" }} className={style.error}>
                This user email is already taken. Try another one.
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
