import React from "react";
import { useState } from "react";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import img from "../../assets/image2.png";
import img1 from "../../assets/Layer_2.svg";
import arrow from "../../assets/Arrow_1.svg";
import { useRouter } from "next/router";
import { sendResetEmail, sendResetMail } from "../../services/SendResetEmail";

export default function forgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const handleResetPassword = () => {
    setEmailError("");

    let isValid = true;
    if (!email) {
      setEmailError("It is required");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    sendResetEmail(email)
      .then((response) => {
        console.log("sent", response.data);
      })
      .catch((error) => {
        console.log("error ", error);
      });
    router.push({
      pathname: "/passwordReset",
      query: { email: encodeURIComponent(email) },
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
            <div className="login_title">Forget Password</div>
            <div className="centered_heading_login">
              Welcome Back, Work Leave
            </div>
            <div className="centered_subheading">
              If You forget password no worris, you reset password
            </div>

            <form className="form">
              <div className="input_title margin-top-36">
                <span className="input_title">Enter Your Email</span>
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

              <div>
                <Button
                  onClick={handleResetPassword}
                  style={{
                    marginTop: "22px",
                    width: "206px",
                    height: "50px",
                    flexShrink: 0,
                    borderRadius: "6px",
                    backgroundColor: "#0fac81",
                    color: "white",
                  }}
                >
                  Reset Password
                </Button>
              </div>

              <Link
                href="/login"
                style={{ marginTop: "53px", display: "flex" }}
              >
                <Image src={arrow} alt="SVG Image" />
                <p
                  className="centered-text"
                  style={{ color: "#0FAC81", marginLeft: "7px" }}
                >
                  Back to Login
                </p>
              </Link>
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
