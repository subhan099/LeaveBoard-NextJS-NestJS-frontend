import React from "react";

export const StatusBox = ({ value }) => {
  const boxStyle = {
    width: "68px",
    height: "22px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      value.toLowerCase() === "accept" || value.toLowerCase() === "active"
        ? "#0FAC8191"
        : "#FF090991",
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    padding: "3px 10px",
  };

  return <div style={boxStyle}>{value}</div>;
};
