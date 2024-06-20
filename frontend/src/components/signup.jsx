import { useState, useEffect, useRef } from "react";
import React from "react";
import "./signup.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [showPasswordLogin, setShowPasswordLog] = useState(false);
  const [showPasswordSign, setShowPasswordSign] = useState(false);
  const [showPasswordSignconfirm, setShowPasswordSignConf] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const signUpformRef = useRef(null);
  const loginFormRef = useRef(null);
  const [ischecked, setChecked] = useState(false);

  //signup and Login input refs
  const [isLoginOTP, setisLoginOTP] = useState(false);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const pinRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const PasswordRefLogin = useRef(null);
  const emailRefLogin = useRef(null);
  const navigate = useNavigate();

  const [LoginDataArr, setLoginDataArr] = useState(
    emailRefLogin.current?.value || ""
  );
  //signup and Login input refs

  const togglePasswordVisibilityLog = () => {
    setShowPasswordLog(!showPasswordLogin);
  };

  const togglePasswordVisibilitySign = () => {
    setShowPasswordSign(!showPasswordSign);
  };

  const togglePasswordVisibilitySignConf = () => {
    setShowPasswordSignConf(!showPasswordSignconfirm);
  };

  const change = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsMatching(
      newPassword === confirmPassword || !newPassword || !confirmPassword
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsMatching(
      password === newConfirmPassword || !password || !newConfirmPassword
    );
  };

  const getConfirmPasswordOutline = () => {
    if (confirmPassword === "" || null) {
      return "none";
    }
    return isMatching ? "2px Solid #47F850" : "2px solid red";
  };

  //OTP Logics
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [isEnabled, setisEnabled] = useState(false);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const [timer, setTimer] = useState(15);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const allFilled = inputs.every((input) => input !== "");
    setisEnabled(allFilled);
  }, [inputs]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      if (value && index < inputs.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && inputs[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const checkFilled = () => {
    return inputs.every((input) => input !== "");
  };

  // OTP Handle
  const handleOtp = async () => {
    console.log("hello ", LoginDataArr);
    const otpData = {
      email: LoginDataArr,
      subject: "OTP MAIL FROM PLAY.ULTIMATE",
    };
    console.log(otpData);
    try {
      const res = await axios.post(
        "https://playultimate-production.up.railway.app/api/auth/otp-login",
        {
          ...otpData,
        }
      );
      if (res.status === 200) {
        console.log(res.data);
      } else {
        console.log("OTP failed:", res.statusText);
      }
    } catch (err) {
      console.error("OTP Error :", err);
    }
  };
  //generate OTP here here and initialize form data to object
  const handleSignupAndLoginFormSubmit = async (e, params) => {
    clearInterval(intervalRef.current);
    setTimer(15);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    e.preventDefault();
    //signup data initiaization
    if (params === "signup") {
      const arr = {
        email: emailRef.current.value,

        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        mobile: phoneRef.current.value,
        address: addressRef.current.value,
        pincode: pinRef.current.value,
        password: confirmPasswordRef.current.value,
      };

      try {
        const res = await axios.post(
          "https://playultimate-production.up.railway.app/api/auth/signup",
          {
            ...arr,
          }
        );

        // Handle the response appropriately
        if (res.status === 200) {
          console.log("Sign up successful:", res.data);
        } else {
          console.log("Sign up failed:", res.statusText);
        }
      } catch (err) {
        // Log the error or display an error message to the user
        console.error("Sign up error:", err);
      }

      signUpformRef.current.reset();
      setFormSubmitted(true);
      setisLoginOTP(false);
      navigate("/Home");
    }
    //Login data initiaization
    //Login with eamil and password logic
    else if (params === "Login") {
      const arr = {
        email: emailRefLogin.current.value,
        password: PasswordRefLogin.current.value,
      };

      try {
        const res = await axios.post(
          "https://playultimate-production.up.railway.app/api/auth/signin",
          {
            ...arr,
          }
        );

        // Handle the response appropriately
        if (res.status === 200) {
          console.log("Login  successful:", res.data);
        } else {
          console.log("Login failed:", res.statusText);
        }
      } catch (err) {
        // Log the error or display an error message to the user
        console.error("Login error:", err);
      }
      loginFormRef.current.reset();
      setFormSubmitted(true);
      setisLoginOTP(true);
      navigate("/home");
    }
    //Login with eamil and OTP
    else if (params === "LoginOTP") {
      setLoginDataArr(emailRefLogin.current.value);

      console.log("hhh", emailRefLogin.current);
      console.log("www", LoginDataArr);
      handleOtp();

      loginFormRef.current.reset();
      setFormSubmitted(true);
      setisLoginOTP(true);
    } else {
      //email and password login use here emailRefLogin.current.value and PasswordRefLogin.current.value to get inputs value

      if (
        emailRefLogin.current.value === "test@gmail.com" &&
        PasswordRefLogin.current.value === "test@123"
      ) {
        alert(
          `login Successfull UserId : ${emailRefLogin.current.value} and password : ${PasswordRefLogin.current.value}`
        );
        navigate("/home");
      } else {
        alert("check email id or password");
      }

      loginFormRef.current.reset();
    }
  };

  //implement authentication and register via otp logics here through SignDataArr and LoginDataArr else it wont work
  const OTPsubmithandleClick = async (e) => {
    e.preventDefault();
    if (checkFilled()) {
      const otp = inputs[0] + inputs[1] + inputs[2] + inputs[3];
      const email = LoginDataArr;
      console.log(LoginDataArr);
      console.log(email);
      console.log(otp);

      const otpSend = {
        email: LoginDataArr,
        otp: otp,
      };
      console.log(otpSend);
      try {
        const res = await axios.post(
          "https://playultimate-production.up.railway.app/api/auth/otp-verify",
          {
            ...otpSend,
          }
        );
        if (res.status === 200) {
          console.log(res.data);
          setisLoginOTP(true);
          console.log("Login Succes");
          navigate("/Home");
        } else {
          alert("Incorrect OTP log");
          setInputs(["", "", "", ""]);
        }
      } catch (err) {
        console.error("OTP Error:", err);
      }
      // implement register logics here in if block in empty space
      if (isLoginOTP) {
        alert("user registered in successfully");
        setFormSubmitted(false);
        setIsLogin(true);
        setInputs(["", "", "", ""]);
      } else if (!isLoginOTP) {
        alert("Incorrect OTP sign");
        setInputs(["", "", "", ""]);
      }
    }
  };

  const exitOTP = () => {
    setFormSubmitted(false);
    setIsLogin(true);
    setInputs(["", "", "", ""]);
    setChecked(false);
  };

  //OTP resend Logic start
  const handleOTPResend = () => {
    clearInterval(intervalRef.current);
    setTimer(15);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    //generate new OTP here on resend click
    console.log("eeee", LoginDataArr);
    handleOtp();
  };
  //OTP resend Logic end

  //login via otp logics
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  //login via otp end

  return (
    <div id="Login">
      <Link to="/">
        <h3 id="crossOTPform">
          <i className="fa-solid fa-xmark"></i>
        </h3>
      </Link>

      {!formSubmitted ? (
        <div className="container">
          {/* Sign up Form Start */}
          <form
            id="signup-form"
            ref={signUpformRef}
            className={isLogin ? "hide" : ""}
            onSubmit={(e) => handleSignupAndLoginFormSubmit(e, "signup")}
          >
            <h1>Sign Up</h1>
            <div className="form-group">
              <label htmlFor="email" className="labels">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="labels">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                ref={firstNameRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="labels">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                ref={lastNameRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="labels">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                ref={phoneRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Adress" className="labels">
                Adress
              </label>
              <input
                type="text"
                id="Adress"
                name="Adress"
                ref={addressRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Pin" className="labels">
                Pin Code
              </label>
              <input type="text" id="Pin" name="Pin" ref={pinRef} required />
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <label htmlFor="password" className="labels">
                Password
              </label>
              <input
                type={showPasswordSign ? "text" : "password"}
                id="password"
                name="password"
                onChange={handlePasswordChange}
                required
              />
              <i
                id="signupeye"
                className={
                  showPasswordSign
                    ? "fa-solid fa-eye-slash"
                    : "eye-icon fas fa-eye"
                }
                onClick={togglePasswordVisibilitySign}
              ></i>
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <label htmlFor="confirm-password" className="labels">
                Confirm Password
              </label>
              <input
                type={showPasswordSignconfirm ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                onChange={handleConfirmPasswordChange}
                style={{ outline: getConfirmPasswordOutline() }}
                ref={confirmPasswordRef}
                required
              />

              <i
                id="signupeyeconfirm"
                className={
                  showPasswordSignconfirm
                    ? "fa-solid fa-eye-slash"
                    : "eye-icon fas fa-eye"
                }
                onClick={togglePasswordVisibilitySignConf}
              ></i>
            </div>
            <button type="submit" className="submit" disabled={!isMatching}>
              Sign Up
            </button>
          </form>
          {/* signup Form end */}

          {/* Login Form Start */}

          <form
            ref={loginFormRef}
            id="login-form"
            className={isLogin ? "" : "hide"}
            onSubmit={(e) =>
              handleSignupAndLoginFormSubmit(
                e,
                ischecked ? "LoginOTP" : "Login"
              )
            }
          >
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="lemail" className="labels">
                Email
              </label>
              <input
                type="email"
                id="lemail"
                name="email"
                ref={emailRefLogin}
                onChange={(e) => setLoginDataArr(e.target.value)}
                required
              />
            </div>

            {!ischecked ? (
              <div className="form-group" style={{ position: "relative" }}>
                <label htmlFor="lpassword" className="labels">
                  Password
                </label>
                <input
                  type={showPasswordLogin ? "text" : "password"}
                  id="lpassword"
                  name="password"
                  ref={PasswordRefLogin}
                  required
                />
                <i
                  id="logineye"
                  className={
                    showPasswordLogin
                      ? "fa-solid fa-eye-slash"
                      : "eye-icon fas fa-eye"
                  }
                  onClick={togglePasswordVisibilityLog}
                ></i>
              </div>
            ) : (
              ""
            )}

            <div className="form-group-forget">
              <div id="checkdiv">
                <input
                  type="checkbox"
                  checked={ischecked}
                  onChange={handleCheckboxChange}
                  name="LoginOTP"
                  id="LoginOTP"
                />
                <label htmlFor="LoginOTP">Login Via OTP</label>
              </div>
              <div id="forgetdiv"></div>
              <p>
                <a href="">forget password ?</a>
              </p>
            </div>

            <button type="submit" className="submit">
              {ischecked ? "Send OTP" : "Login"}
            </button>
          </form>
          {/* Login Form end */}

          <p id="logsignlink">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href="#" id="toggleLink" onClick={change}>
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      ) : (
        <div className="containerotp">
          <h3 id="note">An OTP has been sent on your Email Address</h3>
          <h3 id="crossOTP">
            <i className="fa-solid fa-xmark" onClick={exitOTP}></i>
          </h3>
          <header id="otpnheader">
            {timer > 0 ? (
              <h3>{timer}s</h3>
            ) : (
              <p>
                <i
                  className="fa-solid fa-arrows-rotate"
                  onClick={handleOTPResend}
                ></i>
                <br />
                RESEND OTP
              </p>
            )}
          </header>
          <h4 id="otph4">Enter OTP Code</h4>
          <form id="otpform">
            <div className="input-field">
              {inputs.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  maxLength={1}
                  autoFocus={index === 0}
                  readOnly={index !== 0 && !inputs[index - 1]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <button
              className="submitotpbtn"
              ref={buttonRef}
              disabled={!isEnabled}
              onClick={OTPsubmithandleClick}
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
