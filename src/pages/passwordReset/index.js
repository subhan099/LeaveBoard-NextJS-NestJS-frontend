"use client";
import React, { useState, useRef } from "react";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import img from "../../assets/image2.png";
import img1 from "../../assets/Layer_2.svg";
import { useRouter } from "next/router";
import { resetMail } from "../../services/ResetMail";
import { sendResetEmail } from "../../services/SendResetEmail";

export default function passwordReset() {
  const inputRefs = useRef([]);
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const router = useRouter();
  const { email } = router.query;

  const decodedEmail = email ? decodeURIComponent(email) : "";

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.target.value.length >= 1 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
  const combinedValue = inputValues.join("");
  const handleClick = () => {
    const email = decodedEmail;
    resetMail(email)
      .then((response) => {
        const key = response.data.resetKey;
        if (combinedValue === key) {
          console.log("verified");
          router.push({
            pathname: "/changePassword",
            query: { email: encodeURIComponent(email) },
          });
        }
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  const handleResend = () => {
    sendResetEmail(decodedEmail)
      .then((response) => {
        console.log("sent", response.data);
      })
      .catch((error) => {
        console.log("error ", error);
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
            <div className="login_title">Password Reset</div>
            <div className="centered_heading_login">
              Welcome Back, Work Leave
            </div>
            <div className="centered_subheading">
              We send code to{" "}
              <span style={{ fontWeight: "600" }}>{decodedEmail}</span>
            </div>
            <div
              className="form"
              style={{
                marginTop: "55px",
              }}
            >
              {inputValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  id={`input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(index, e)}
                  style={{
                    width: "70px",
                    height: "70px",
                    marginRight: "22px",
                    color: "#000",
                    textAlign: "center",
                    border: "1px solid black",
                    borderRadius: "12px",
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                />
              ))}

              <div style={{ marginTop: "30px" }}>
                <Button
                  onClick={handleClick}
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
                  Continue
                </Button>
              </div>
              <div
                style={{
                  marginTop: "25px",
                  color: "#0A1931",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal",
                }}
              >
                Didn’t recevied email?{" "}
                <button
                  onClick={handleResend}
                  style={{
                    color: "#185ADB",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                >
                  Click to Resend
                </button>
              </div>
            </div>
          </div>
          <div className="child2">
            <Image src={img} alt="My Image" className="side_image" />
          </div>
        </Paper>
      </div>
    </div>
  );
}
