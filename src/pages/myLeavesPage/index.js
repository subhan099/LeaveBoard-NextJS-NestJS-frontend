"use client";
import Layout from "../../component/Layout/layout";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { getLeaveDetails } from "../../services/GetLeaveDetails";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { StatusBox } from "../../component/StatusBox/StatusBox.js";
import { getId } from "../../component/GetID";
import { getRole } from "../../component/GetRole";
import { refresh } from "../../component/Refresh";

export default function MyLeavesPage() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
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

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "id", headerName: "No.", width: 150, editable: false },
    {
      field: "leaveType",
      headerName: "LeaveType",
      width: 200,
      editable: false,
    },
    {
      field: "noOfLeaves",
      headerName: "Duration",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params) => <StatusBox value={params.value} />,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: false,
    },
    {
      field: "comments",
      headerName: "Comment",
      width: 150,
      editable: false,
    },
  ];
  const handleData = async () => {
    // const id = await getId();
    const data = await refresh();
    const id = data.id;
    getLeaveDetails(id).then((data) => {
      const leaveData = data.data;

      Promise.all(leaveData)

        .then((userResponses) => {
          const fetchedRows = leaveData.map((leave, index) => ({
            id: leave.id,
            leaveType: leave.leaveType,
            noOfLeaves: leave.duration,
            date: leave.date,
            comments: leave.comment,
            status: leave.status,
          }));

          setRows(fetchedRows);
        })
        .catch((error) => {
          console.log("Error fetching user details", error);
        });
    });
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="myLeavesPage">
      {userRole != "ADMIN" && (
        <Layout>
          <div className="emp_table">
            <Box>
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
              />
            </Box>
          </div>
        </Layout>
      )}
    </div>
  );
}
