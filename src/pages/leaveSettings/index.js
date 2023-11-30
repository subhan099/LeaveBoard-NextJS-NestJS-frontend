import React from "react";
import Layout from "../../component/Layout/layout";
import LeaveSettings from "../../component/leaveSettings/leaveSettings";

export default function leave() {
  return (
    <div className="leave_setting">
      <Layout>
        <LeaveSettings />
      </Layout>
    </div>
  );
}
