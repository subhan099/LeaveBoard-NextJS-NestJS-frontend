import React from "react";
import Link from "next/link";
import Image from "next/image";
import img1 from "../../assets/Layer_2.svg";
import { useRouter } from "next/router";

export default function home() {
  const router = useRouter();
  const handleGetStarted = () => {
    // router.push("/companyStatus");
    router.push("/login");
  };
  return (
    <>
      <div className="box">
        <div
          className="colored_box_home"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{ marginTop: "15px", marginLeft: "50px", display: "flex" }}
          >
            <Image src={img1} alt="SVG Image" />
            <p className="centered-text logo_text">Work Leave</p>
          </div>

          <div className="upper_navigation">
            <Link href="/login" style={{ marginRight: "51px" }}>
              Login
            </Link>
            <Link href="/" style={{ marginRight: "51px" }}>
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="home_page_content">
        <div className="heading">HR and Leave Management System</div>
        <div className="para_home">
          Cloud-based HR tools to track employee time-off (like vacations,
          personal time off, and leaves of absence), centralize workforce data,
          empower employees, and get accurate reports. Start saving time on
          employee management.
        </div>
        <div style={{ marginTop: "28px" }}>
          <button onClick={handleGetStarted} className="btn_home">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
