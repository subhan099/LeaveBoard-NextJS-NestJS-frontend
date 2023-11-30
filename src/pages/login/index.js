"use client";
import { useState } from "react";
import React from "react";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import img from "../../assets/login.png";
import img1 from "../../assets/Layer_2.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/store";
import { loginService } from "../../services/LoginService";

export default function login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("It is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("It is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    loginService(email, password).then((data) => {
      if (!data) {
        alert("Incorrect credentials");
      } else {
        const token = data.data.token;
        if (!token) {
          alert("Your access is denied");
        } else {
          const decodedToken = jwt.decode(token);
          console.log(decodedToken);
          const ID = decodedToken.id;
          const role = decodedToken.role;

          dispatch(
            userSlice.actions.set_ID({
              ID: ID,
            })
          );
          dispatch(
            userSlice.actions.set_access_token({
              access_token: token,
            })
          );
          dispatch(
            userSlice.actions.set_role({
              role: role,
            })
          );
          localStorage.setItem("access_token", token);
          router.push("/dashboard");
        }
      }
    });
  };
  return (
    <div className="box">
      <div className="colored_box">
        <div className="upper_navigation">
          <Link href="/login" style={{ marginRight: "51px" }}>
            Login
          </Link>
          <Link href="/" style={{ marginRight: "51px" }}>
            Register
          </Link>
        </div>
        <div
          style={{
            marginLeft: "53px",
            display: "block",
            justifyContent: "center",
            width: "100px",
            position: "absolute",
            top: "24px",
          }}
        >
          <Image src={img1} alt="SVG Image" style={{ margin: "auto" }} />
          <p
            className="centered-text"
            style={{ margin: "auto", color: "white" }}
          >
            Work Leave
          </p>
        </div>
      </div>

      <div className="form_container">
        <Paper elevation={3} className="paper_style">
          <div className="child1">
            <div className="login_title">Login</div>
            <div className="centered_heading_login">
              Welcome Back, Work Leave
            </div>
            <div className="centered_subheading">
              Continue with Google or Enter Your Details
            </div>

            <form className="form">
              <div className="input_title margin-top-36">
                <span className="input_title">Email</span>
                <TextField
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(e.target.value ? "" : "It is required");
                  }}
                  fullWidth
                />
                <div className="error-message">{emailError}</div>
              </div>

              <div className="input_title input_margin">
                <span className="input_title">Password</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    placeholder="**********"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility"
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(e.target.value ? "" : "It is required");
                    }}
                  />
                </div>
                <div className="error-message">{passwordError}</div>
              </div>
              <div className="checkbox_bar">
                <FormControlLabel
                  required
                  control={<Checkbox className="checkbox-input" />}
                  // className="checkbox-label"
                  label={<span className="forget_link">Remember me</span>}
                />
                <Link href="/forgotPassword" className="forget">
                  Forget Password?
                </Link>
              </div>
              <div>
                <button className="signup_button" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="child2">
            <Image src={img} alt="My Image" className="side_image" />
          </div>
        </Paper>
      </div>
    </div>
  );
}
