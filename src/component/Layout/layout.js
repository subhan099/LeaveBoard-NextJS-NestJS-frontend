import React from "react";
import ResponsiveDrawer from "../sidebar/sidebar.js";
export default function Layout({ children }) {
  return (
    <div>
      <ResponsiveDrawer>{children}</ResponsiveDrawer>
    </div>
  );
}
