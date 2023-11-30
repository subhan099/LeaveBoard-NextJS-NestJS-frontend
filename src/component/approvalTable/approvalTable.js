"use client";
import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { StatusBox } from "../StatusBox/StatusBox";
import { updateLeave } from "../../services/UpdateLeave";
import { deleteLeave } from "../../services/DeleteLeaves";
import { getCompanyDetails } from "../../services/GetCompanyDetails";
import { getCompanyUsers } from "../../services/GetCompanyUsers";
import { getLeaveDetails } from "../../services/GetLeaveDetails";
import { getId } from "../GetID";
import { globalId, refresh } from "../Refresh";

export default function ApprovalTable({ isDashboard }) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleEditCellChange = (params) => {
    const { id, field, props } = params;
  };

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

    localStorage.setItem("approve_id", id);
    const updatedRows = [...rows];
    const rowIndex = updatedRows.findIndex((row) => row.id === id);

    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      comments: editedRow.comments,
      status: editedRow.status,
    };

    setRows(updatedRows);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  useEffect(() => {
    const idToUpdate = localStorage.getItem("approve_id");

    if (idToUpdate !== null) {
      const updatedRow = rows.find(
        (row) => row.id === parseInt(idToUpdate, 10)
      );
      const comments = updatedRow ? updatedRow.comments : null;
      const status = updatedRow ? updatedRow.status : null;

      updateLeave(idToUpdate, status, comments);
    }
  }, [rows]);

  const handleDeleteClick = (id) => () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setRows(rows.filter((row) => row.id !== id));
      deleteLeave(id);
    }
  };

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

  const isEditable = (date) => {
    if (!date) {
      return false; // Return false if date is undefined or null
    }

    const currentDate = new Date();
    const startDate = new Date(date.split(" TO ")[0]);

    return startDate > currentDate;
  };

  const columns = [
    { field: "id", headerName: "No.", width: 80, editable: false },
    { field: "name", headerName: "Name", width: 150, editable: false },
    {
      field: "noOfLeaves",
      headerName: "Duration",
      width: 130,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "Accept", "Reject"],
      renderCell: (params) => <StatusBox value={params.value} />,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const { id } = params;
        const date = params.row.date;

        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const editable = isEditable(date);

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              disabled={!editable}
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
            disabled={!editable}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            disabled={!editable}
          />,
        ];
      },
    },
  ];

  const handleData = async () => {
    const data = await refresh();
    const id = data.id;
    getCompanyDetails(id).then((response) => {
      if (response && response.data) {
        const companyId = response.data; //company Id that this person owns
        getCompanyUsers(companyId).then((bridgeResponse) => {
          const bridgeData = bridgeResponse; //gives all users for that company
          if (
            bridgeData.message ===
            "No entries found for the specified company ID"
          ) {
          } else {
            const leavePromises = bridgeResponse.map((bridge) =>
              getLeaveDetails(bridge)
            );
            Promise.all(leavePromises)
              .then((leaveResponses) => {
                const leaveData = leaveResponses.map(
                  (leaveResponse) => leaveResponse.data
                );
                const flattenedLeaveData = leaveData.flat();
                const fetchedRows = flattenedLeaveData.map((leave) => ({
                  id: leave.id,
                  name: leave.name,
                  noOfLeaves: leave.duration,
                  date: leave.date,
                  comments: leave.comment,
                  status: leave.status,
                }));
                setRows(fetchedRows);
              })
              .catch((leaveError) => {
                console.log("Error fetching leave details", leaveError);
              });
          }
        });
      } else {
      }
    });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="emp_table">
      <Box>
        <DataGrid
          rows={isDashboard ? rows.slice(0, 5) : rows}
          columns={columns}
          editMode="row"
          onEditCellChange={handleEditCellChange}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </div>
  );
}
