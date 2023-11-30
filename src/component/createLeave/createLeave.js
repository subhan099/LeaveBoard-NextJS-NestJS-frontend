"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/base";
import Modal from "@mui/material/Modal";
import { getLeaveDetails } from "../../services/GetLeaveDetails";
import { createLeave } from "../../services/CreateLeaves";
import { getCompanyLeave } from "../../services/GetCompanyLeave";
import { getId } from "../GetID";
import { refresh } from "../Refresh";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};

export default function CreateLeave({ openUser, handleCloseUser }) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);

  const handleCreateLeaves = async () => {
    // const userId = localStorage.getItem("ID");
    // const userId = await getId();
    const data = await refresh();
    const userId = data.id;
    try {
      const existingLeavesResponse = await getLeaveDetails(userId);

      const existingLeaves = existingLeavesResponse.data;

      const newLeaveRange = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime(),
      };

      const overlap = existingLeaves.some((leave) => {
        const existingLeaveRange = {
          startDate: new Date(leave.date.split(" TO ")[0]).getTime(),
          endDate: new Date(leave.date.split(" TO ")[1]).getTime(),
        };

        return (
          newLeaveRange.startDate < existingLeaveRange.endDate &&
          newLeaveRange.endDate > existingLeaveRange.startDate
        );
      });

      if (overlap) {
        alert(
          "Leave overlaps with existing leave. Please choose different dates."
        );
        return;
      }

      const dateRange = `${startDate} TO ${endDate}`;
      const durationInMilliseconds =
        newLeaveRange.endDate - newLeaveRange.startDate;
      const durationInDays = durationInMilliseconds / (24 * 60 * 60 * 1000);
      if (!leaveType || !startDate || !endDate || !comment) {
        alert("Please fill in all the required fields.");
        return;
      }
      if (durationInDays <= 0) {
        alert("invalid date entered");
        return;
      }
      const response = await createLeave(
        leaveType,
        dateRange,
        durationInDays.toString(),
        comment
      );

      console.log("Leave created successfully", response);
      alert("Leave created successfully!");
      handleCloseUser();
    } catch (error) {
      console.log("Error creating or checking leave: ", error);
      alert("Error creating or checking leave. Please try again.");
    }
  };

  useEffect(() => {
    getCompanyLeave()
      .then((response) => {
        const res = response.data;
        const typesFromAPI = res.map((item) => item.LeaveType);
        setLeaveTypeOptions(typesFromAPI);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  }, []);

  return (
    <div>
      <Modal
        open={openUser}
        onClose={handleCloseUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div>
            <div
              style={{
                marginTop: "46px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Create Leave
            </div>
            <form>
              <div className="input_title margin-top-36">
                <Select
                  id="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  fullWidth
                  displayEmpty
                  input={<Input />}
                >
                  <MenuItem value="" disabled style={{ color: "#888888" }}>
                    Leave Type
                  </MenuItem>

                  {leaveTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>

                <div style={{ marginTop: "30px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "350px" }}>
                      <div>From:</div>
                      <TextField
                        placeholder="Starting Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                    </div>
                    <div style={{ width: "350px" }}>
                      <div>To:</div>
                      <TextField
                        placeholder="Ending Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        inputProps={{ min: startDate }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "30px" }}>
                  <div>
                    <div>Comment</div>
                    <TextField
                      placeholder="Enter Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </form>
            <Button
              className="invite_employees_btn"
              onClick={handleCreateLeaves}
            >
              Create Leave
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
