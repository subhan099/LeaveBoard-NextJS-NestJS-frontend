"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout/layout";
import ApprovalTable from "../../component/approvalTable/approvalTable";
import EmployeeTable from "../../component/employeeTable/employeeTable";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import { PointElement } from "chart.js";
import { LineElement } from "chart.js";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { getLeaveDetails } from "../../services/GetLeaveDetails";
import { getCompanyLeave } from "../../services/GetCompanyLeave";
import { getId } from "../../component/GetID";
import { getRole } from "../../component/GetRole";
import { refresh } from "../../component/Refresh";

Chart.register(LineElement, CategoryScale, LinearScale);

Chart.register(PointElement);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const [userRole, setUserRole] = useState("");
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
  const [leaveTypeDurations, setLeaveTypeDurations] = useState([]);
  const [totalLeaveTypeDurations, setTotalLeaveTypeDurations] = useState([]);

  const [doughnutData, setDoughnutData] = useState({
    labels: ["Sick Leaves", "Vacation Leaves", "Unpaid Leaves"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: ["#FAC700", "#EF7C31", "#1DABBC"],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      // const id = await getId();
      const data = await refresh();
      const id = data.id;
      try {
        const response = await getLeaveDetails(id);

        const leaveData = response.data;
        const acceptedLeaves = leaveData.filter(
          (leave) => leave.status.toLowerCase() === "accept"
        );

        const durations = leaveTypeOptions.map((type) =>
          acceptedLeaves
            .filter((leave) => leave.leaveType === type)
            .reduce((acc, leave) => acc + parseInt(leave.duration, 10), 0)
        );

        const dataLength = leaveTypeOptions.map(
          (type) =>
            acceptedLeaves.filter((leave) => leave.leaveType === type).length
        );
        setLeaveTypeDurations(durations);

        const data = {
          labels: leaveTypeOptions,
          datasets: [
            {
              data: durations,
              backgroundColor: ["#FAC700", "#EF7C31", "#1DABBC"],
              hoverOffset: 4,
            },
          ],
        };

        setDoughnutData(data);
      } catch (error) {
        console.error("Error fetching leave data", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [leaveTypeOptions]);

  useEffect(() => {
    const fetchData = async () => {
      // const role = localStorage.getItem("role");
      // const role = await getRole();
      const data = await refresh();
      const role = data.role;
      setUserRole(role);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getCompanyLeave()
      .then((response) => {
        const res = response.data;
        const typesFromAPI = res.map((item) => item.LeaveType);
        setLeaveTypeOptions(typesFromAPI);
        const rangeFromAPI = res.map((item) => item.DateRange);
        setTotalLeaveTypeDurations(rangeFromAPI);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  }, []);

  return (
    <div className="dashboard_box">
      <Layout>
        {userRole === "NORMAL_USER_ROLE" && (
          <div className="dashboard_charts">
            <div className="chart">
              <Doughnut data={doughnutData} />
            </div>

            <div className="chart">
              {leaveTypeOptions.map((type, index) => (
                <div
                  key={index}
                  style={{ width: "450px", marginBottom: "50px" }}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    {type.toUpperCase()}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (leaveTypeDurations[index] /
                        totalLeaveTypeDurations[index]) *
                      100
                    }
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "end" }}
                  >
                    {`${leaveTypeDurations[index]} / ${totalLeaveTypeDurations[index]} days`}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          {userRole === "ADMIN" && (
            <div>
              <div className="dashboard_heading">Employees Request</div>
              <ApprovalTable isDashboard={true} />
              <div className="dashboard_heading">New Joiners</div>
              <EmployeeTable isDashboard={true} />
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}
