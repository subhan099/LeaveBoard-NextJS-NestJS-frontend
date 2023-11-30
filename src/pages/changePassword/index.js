"use client";
import React, { useState, useRef } from "react";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import img from "../../assets/image2.png";
import img1 from "../../assets/Layer_2.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { resetPassword } from "../../services/resetPassword";

export default function passwordReset() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { email } = router.query;
  const firstEmail = email ? decodeURIComponent(email) : "";
  const decodedEmail = decodeURIComponent(firstEmail);
  const handleClick = () => {
    if (newPassword === confirmPassword) {
      const email = decodedEmail;
      const password = newPassword;
      resetPassword(email, password)
        .then((response) => {
          console.log(response.data);
          router.push("/login");
        })
        .catch((error) => {
          console.log("error ", error);
        });
    } else {
      alert("password mismatch!");
    }
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
            <div className="login_title">Change Password</div>
            <div className="centered_heading_login">
              Welcome Back, Work Leave
            </div>
            <div className="centered_subheading">
              <span style={{ fontWeight: "600" }}>Reset Your Password</span>
            </div>
            <div style={{ marginTop: "70px" }}>
              <span>New Password:</span>
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
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError(e.target.value ? "" : "It is required");
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <span>Confirm Password:</span>
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError(e.target.value ? "" : "It is required");
                }}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <Button
                onClick={handleClick}
                style={{
                  display: "flex",
                  margin: "auto",
                  marginTop: "50px",
                  width: "206px",
                  height: "50px",
                  flexShrink: 0,
                  borderRadius: "6px",
                  backgroundColor: "#0fac81",
                  color: "white",
                }}
              >
                Continue
              </Button>
            </div>
            <div
              className="form"
              style={{
                marginTop: "55px",
              }}
            ></div>
          </div>
          <div className="child2">
            <Image src={img} alt="My Image" className="side_image" />
          </div>
        </Paper>
      </div>
    </div>
  );
}
