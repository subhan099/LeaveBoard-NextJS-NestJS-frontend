import Layout from "../../component/Layout/layout";
import EmployeeTable from "../../component/employeeTable/employeeTable";
import { useState, useEffect } from "react";
import { getRole } from "../../component/GetRole";
import { refresh } from "../../component/Refresh";

export default function EmployeePage() {
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
    <div className="employee_table">
      {userRole === "ADMIN" && (
        <Layout>
          <EmployeeTable isDashboard={false} />
        </Layout>
      )}
    </div>
  );
}
