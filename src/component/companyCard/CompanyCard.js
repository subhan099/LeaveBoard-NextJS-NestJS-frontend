import React from "react";
import Image from "next/image";
import company1 from "../../assets/companies/Muszica.png";

export default function CompanyCard({ imageSrc, companyName, companyType }) {
  return (
    <div className="company_intro_box">
      <div className="company_inner_box">
        {/* <Image className="company_icon" src={imageSrc} alt="SVG Image" /> */}
        <div className="name_div">
          <div className="company_name">{companyName}</div>
          <div className="company_type">{companyType}</div>
        </div>
      </div>
      <div className="company_second_block">
        <div className="dot"></div>
        <div>Active</div>
      </div>
    </div>
  );
}
