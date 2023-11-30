import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import company1 from "../../assets/companies/Muszica.png";
import company2 from "../../assets/companies/A_Lab.png";
import company3 from "../../assets/companies/U_Mark.png";
import company4 from "../../assets/companies/Treva.png";
import CompanyCard from "../../component/companyCard/CompanyCard";
import CompanyLayout from "../../component/companyLayout/CompanyLayout";
import { getCompanyDetails } from "../../services/GetCompanyDetails";
import { getCompanyData } from "../../services/GetCompanyData";
import { refresh } from "../../component/Refresh";

// const companies = [
//   {
//     imageSrc: company1,
//     companyName: "Company Name 1",
//     companyType: "IT Technology",
//   },
//   {
//     imageSrc: company2,
//     companyName: "Company Name 2",
//     companyType: "Health & Medical",
//   },
//   {
//     imageSrc: company3,
//     companyName: "Company Name 3",
//     companyType: "Education",
//   },
//   {
//     imageSrc: company4,
//     companyName: "Company Name 4",
//     companyType: "Grocery",
//   },
// ];

export default function companyStatus() {
  const imageSrc = company1;
  const [userRole, setUserRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await refresh();
      const role = data.role;
      const id = data.id;
      setUserRole(role);
      getCompanyDetails(id)
        .then((response) => {
          const res = response.data;
          getCompanyData(res)
            .then((response) => {
              const companyData = response.data;
              console.log(response.data);
              setCompanyName(companyData.name);
              setCompanyType(companyData.category);
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
  return (
    <CompanyLayout>
      <div className="companies_list">
        <CompanyCard
          imageSrc={imageSrc}
          companyName={companyName}
          companyType={companyType}
        />
      </div>
    </CompanyLayout>
  );
}
