import * as React from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { StatusBox } from "../StatusBox/StatusBox";
import { updateUser } from "../../services/UpdateUser";
import { getCompanyDetails } from "../../services/GetCompanyDetails";
import { getCompanyUsers } from "../../services/GetCompanyUsers";
import { getUserDetails } from "../../services/GetUserDetails";
import { refresh } from "../Refresh";

export default function FullFeaturedCrudGrid({ isDashboard }) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    localStorage.setItem("user_update_id", id);
    const updatedRows = [...rows];
    const rowIndex = updatedRows.findIndex((row) => row.id === id);

    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      status: editedRow.status,
    };

    setRows(updatedRows);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  useEffect(() => {
    const idToUpdate = localStorage.getItem("user_update_id");

    if (idToUpdate !== null) {
      const updatedRow = rows.find(
        (row) => row.id === parseInt(idToUpdate, 10)
      );
      const status = updatedRow ? updatedRow.status : null;

      updateUser(idToUpdate, { status })
        .then((response) => {
          console.log("Updated successfully ", response);
        })
        .catch((error) => {
          console.log("Error", error);
        });
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

  const columns = [
    { field: "id", headerName: "Id", width: 100, editable: false },
    { field: "employee", headerName: "Employee", width: 250, editable: false },
    { field: "email", headerName: "Email", width: 250, editable: false },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
      renderCell: (params) => <StatusBox value={params.value} />,
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

  const handleData = async () => {
    // const id = await getId();
    const data = await refresh();
    const id = data.id;

    getCompanyDetails(id)
      .then((response) => {
        if (response && response.data) {
          const leaveData = response.data;
          getCompanyUsers(leaveData)
            .then((response) => {
              const Data = response;
              const userPromises = Data.map((user) => getUserDetails(user));

              Promise.all(userPromises).then((userResponses) => {
                const userData = userResponses.map(
                  (userResponse) => userResponse.data
                );
                // Flatten the array of userData
                const flatteneduserData = userData.flat();

                const fetchedRows = flatteneduserData.map((user) => ({
                  id: user.id,
                  employee: user.firstName + " " + user.lastName,
                  email: user.email,
                  status: user.status,
                }));

                setRows(fetchedRows);
              });
            })
            .catch((error) => {
              console.log("Error getting data", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting data", error);
      });
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="emp_table">
      <DataGrid
        rows={isDashboard ? rows.slice(-5) : rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </div>
  );
}
