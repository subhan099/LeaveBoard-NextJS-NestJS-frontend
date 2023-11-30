"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { getCompanyLeave } from "../../services/GetCompanyLeave";
import { updateCompanyLeave } from "../../services/UpdateCompanyLeave";
import { createCompanyLeave } from "../../services/CreateLeavesService";
import { refresh } from "../Refresh";

export default function LeaveSettings() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [userRole, setUserRole] = useState("");
  const [leaveTypeError, setLeaveTypeError] = useState("");
  const [dateRangeError, setDateRangeError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
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

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const editedRow = rows.find((row) => row.id === id);
    localStorage.setItem("company_leave_id", id);
    const updatedRows = [...rows];
    const rowIndex = updatedRows.findIndex((row) => row.id === id);

    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
    };

    setRows(updatedRows);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  useEffect(() => {
    const areLeaveTypesUnique = () => {
      const leaveTypeSet = new Set();
      for (const row of rows) {
        if (leaveTypeSet.has(row.type)) {
          return false; // Duplicate leave type found
        }
        leaveTypeSet.add(row.type);
      }
      return true; // All leave types are unique
    };

    if (!areLeaveTypesUnique()) {
      alert("Leave types must be unique");
      return;
    } else {
      const idToUpdate = localStorage.getItem("company_leave_id");
      const updatedRow = rows.find(
        (row) => row.id === parseInt(idToUpdate, 10)
      );
      const _leaveType = updatedRow ? updatedRow.type : null;
      const _dateRange = updatedRow ? updatedRow.noOfLeaves : null;

      if (idToUpdate != null) {
        updateCompanyLeave(idToUpdate, _leaveType, _dateRange).then(
          (response) => {}
        );
      }
    }
  }, [rows]);

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [leaveType, setLeaveType] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleLeavesSave = () => {
    if (!leaveType.trim()) {
      setLeaveTypeError("Leave Type can't be empty");
      return;
    } else {
      setLeaveTypeError("");
    }

    if (!dateRange.trim()) {
      setDateRangeError("Date Range can't be empty");
      return;
    } else {
      setDateRangeError("");
    }
    // Fetch existing leaves
    getCompanyLeave()
      .then((response) => {
        const existingLeaves = response.data;
        const lowerCaseLeaveType = leaveType.toLowerCase();
        // Check if the entered leaveType already exists
        const isLeaveTypeExists = existingLeaves.some(
          (leave) => leave.LeaveType.toLowerCase() === lowerCaseLeaveType
        );

        if (isLeaveTypeExists) {
          alert("Leave type already exists");
        } else {
          createCompanyLeave(leaveType, dateRange)
            .then((response) => {
              console.log("Leave created successfully ", response);
              handleUpdate();
              setLeaveType("");
              setDateRange("");
            })
            .catch((error) => {
              console.log("Error creating leave", error);
              alert("Error Creating leave!!");
            });
        }
      })
      .catch((error) => {
        console.log("Error fetching leaves", error);
      });
  };

  const handleUpdate = () => {
    getCompanyLeave()
      .then((response) => {
        const fetchedRows = response.data.map((item) => ({
          id: item.id,
          type: item.LeaveType,
          noOfLeaves: item.DateRange,
        }));
        setRows(fetchedRows);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    handleUpdate();
    localStorage.removeItem("company_leave_id");
  }, []);

  const columns = [
    {
      field: "type",
      headerName: "Type of Leaves",
      width: 380,
      editable: true,
    },
    {
      field: "noOfLeaves",
      headerName: "No of Leaves",
      width: 380,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      {userRole === "ADMIN" && (
        <div
          style={{
            marginLeft: "24px",
          }}
        >
          <div className="leave_box">
            <div className="leave_title">Select Leave Range</div>
            <div className="parallel leave_block">
              <div className="leave_space">
                <span className="input_title">Leave Type</span>
                <TextField
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  placeholder="Add type of Leave"
                  fullWidth
                  error={!!leaveTypeError}
                  helperText={leaveTypeError}
                />
              </div>
              <div>
                <span className="input_title">Date Range</span>
                <TextField
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="09"
                  fullWidth
                  error={!!dateRangeError}
                  helperText={dateRangeError}
                />
              </div>
            </div>
            <button onClick={handleLeavesSave} className="leave_btn">
              Save
            </button>
          </div>

          <div className="leave_table">
            <Box>
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
              />
            </Box>
          </div>
        </div>
      )}
    </>
  );
}
