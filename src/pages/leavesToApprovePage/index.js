import { React, useState, useEffect } from "react";
import Layout from "../../component/Layout/layout";
import ApprovalTable from "../../component/approvalTable/approvalTable";
import { getRole } from "../../component/GetRole";
import { refresh } from "../../component/Refresh";

export default function LeavestoApprovePage() {
  const [userRole, setUserRole] = useState("");
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
    <div className="approvePage">
      {userRole === "ADMIN" && (
        <Layout>
          <ApprovalTable isDashboard={false} />
        </Layout>
      )}
    </div>
  );
}
