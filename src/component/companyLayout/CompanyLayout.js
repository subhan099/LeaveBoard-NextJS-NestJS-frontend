"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import img1 from "../../assets/Layer_2.svg";
import profile from "../../assets/profile.svg";
import company from "../../assets/company.svg";
import add from "../../assets/add.svg";
import profileFill from "../../assets/profileFill.svg";
import companyFill from "../../assets/companyFill.svg";
import addFill from "../../assets/addFill.svg";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/store";
import { useRouter } from "next/router";
import { getRole } from "../GetRole";
import { refresh } from "../Refresh";

export default function CompanyLayout({ children, activePage }) {
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleProfileButton = () => {
    router.push("/profile");
  };
  const handleCreateButton = () => {
    router.push("/createCompany");
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(
      userSlice.actions.set_access_token({
        access_token: null,
      })
    );
    // Redirect to the login page
    router.push("/login");
  };
  useEffect(() => {
    const fetchData = async () => {
      // const role = await getRole();
      const data = await refresh();
      const role = data.role;
      setUserRole(role);
    };
    fetchData();
  }, []);
  return (
    <div className="box">
      <div className="colored_box">
        <div className="upper_navigation">
          <Link href="/dashboard" style={{ marginRight: "51px" }}>
            Home
          </Link>
          {/* <Link href="/login" style={{ marginRight: "51px" }}>
            logout
          </Link> */}
          <button onClick={handleLogout} style={{ marginRight: "51px" }}>
            logout
          </button>
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

      <div className="company_container">
        <div className="company_content_style two_btns">
          <button onClick={handleProfileButton} className="company_profile_btn">
            <Image
              className="profile_icon"
              src={activePage === "profile" ? profileFill : profile}
              alt="SVG Image"
            />
            <span
              className={`${
                activePage === "profile" ? "active_create_text" : "create_text"
              }`}
            >
              Profile
            </span>
          </button>

          {userRole === "ADMIN" && (
            <button onClick={handleCreateButton} className="company_btn">
              <Image
                className="profile_icon"
                src={activePage === "createCompany" ? companyFill : company}
                alt="SVG Image"
              />
              <div style={{ display: "flex" }}>
                <span
                  className={`${
                    activePage === "createCompany"
                      ? "active_create_text"
                      : "create_text"
                  }`}
                >
                  Create Company
                </span>
                <Image
                  style={{ marginLeft: "36px", marginBottom: "9px" }}
                  src={activePage === "createCompany" ? addFill : add}
                  alt="SVG Image"
                />
              </div>
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
