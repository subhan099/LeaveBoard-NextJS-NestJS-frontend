"use client";
import { useState, useEffect } from "react";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import img from "../assets/signUp.png";
import img1 from "../assets/Layer_1.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import { API_URLS } from "../config";
import axios from "axios";

export default function signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const handleSignUp = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!firstName) {
      setFirstNameError("It is required");
      isValid = false;
    }

    if (!lastName) {
      setLastNameError("It is required");
      isValid = false;
    }

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

    axios
      .post(
        API_URLS.SIGNUP,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          params: { token },
        }
      )
      .then((response) => {
        if (response.data.status === "failure") {
          alert("can't create account");
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.log("Error signing up user", error);
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
      </div>

      <div className="form_container">
        <Paper elevation={3} className="paper_style">
          <div className="child1">
            <div className="centered-container">
              <Image src={img1} alt="SVG Image" className="centered-image" />
              <p className="centered-text">Work Leave</p>
            </div>
            <div className="side_title">SignUp</div>
            <div className="centered_heading">Welcome Back, Work Leave</div>
            <div className="centered_subheading">
              Create a new account with email
            </div>

            <form className="form">
              <div className="parallel">
                <div className="space">
                  <span className="input_title">First Name</span>
                  <TextField
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setFirstNameError(e.target.value ? "" : "It is required");
                    }}
                    fullWidth
                  />
                  <div className="error-message">{firstNameError}</div>
                </div>
                <div>
                  <span className="input_title">Last Name</span>
                  <TextField
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setLastNameError(e.target.value ? "" : "It is required");
                    }}
                    fullWidth
                  />
                  <div className="error-message">{lastNameError}</div>
                </div>
              </div>
              <div className="input_title input_margin">
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
              <FormControlLabel
                required
                control={<Checkbox className="checkbox-input" />}
                className="checkbox-label"
                label={
                  <div>
                    <span
                      style={{
                        color: "#0A1931",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      I have read and agree to the{" "}
                    </span>
                    <span
                      style={{
                        color: "#39A049",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      terms of use.
                    </span>
                  </div>
                }
              />
              <button className="signup_button" onClick={handleSignUp}>
                SignUp
              </button>
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
