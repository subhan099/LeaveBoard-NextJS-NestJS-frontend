"use client";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Image from "next/image";
import CompanyLayout from "../../component/companyLayout/CompanyLayout";
import upload from "../../assets/upload.svg";
import { useRouter } from "next/router";
import { createCompanyService } from "../../services/CreateCompany";
import { refresh } from "../../component/Refresh";
import { getCompanyDetails } from "../../services/GetCompanyDetails";
import { getCompanyData } from "../../services/GetCompanyData";

export default function createCompany() {
  const [userRole, setUserRole] = useState("");
  const [id, setID] = useState("");
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [companyID, setCompanyID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await refresh();
      const role = data.role;
      const id = data.id;
      setID(id);
      setUserRole(role);
      getCompanyDetails(id)
        .then((response) => {
          const res = response.data;
          getCompanyData(res)
            .then((response) => {
              const companyData = response.data;
              setCompanyID(companyData.id);
              setName(companyData.name);
              setCategory(companyData.category);
            })
            .catch((error) => {
              console.log("error: ", error);
            });
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };
    fetchData();
  }, []);

  const handleCreateCompany = () => {
    createCompanyService(name, category)
      .then((response) => {
        console.log("company created", response.data);
        router.push("/home");
      })
      .catch((error) => {
        console.error("Error creating company", error);
        alert("Could Not Create company!");
      });
  };
  return (
    <>
      {userRole === "ADMIN" && (
        <CompanyLayout activePage="createCompany">
          <div className="company_box">
            <div className="create_company_inner_box">
              <div style={{ marginRight: "102px" }}>
                <div className="company_name">Company Name</div>
                <TextField
                  placeholder="Megaverse"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="company_field"
                />
              </div>
              <div>
                <div className="company_name">Category</div>
                <TextField
                  placeholder="IT Technology"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="company_field"
                />
              </div>
            </div>
            <div className="company_upload_box">
              <div>
                <div>
                  <Image className="upload_img" src={upload} alt="SVG Image" />
                </div>
                <div className="upload_text">Upload and Drag Logo</div>
              </div>
            </div>
            <button className="create_btn" onClick={handleCreateCompany}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {companyID ? "Update" : "Register Your Company"}
              </div>
            </button>
          </div>
        </CompanyLayout>
      )}
    </>
  );
}
