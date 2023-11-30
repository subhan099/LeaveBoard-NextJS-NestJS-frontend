"use client";
import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import Modal from "@mui/material/Modal";
import { getCompanyDetails } from "../../services/GetCompanyDetails";
import { getBridgeUsers } from "../../services/GetBridgeUsers";
import { sendEmail } from "../../services/SendEmail";
import { refresh } from "../Refresh";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};
export function InviteEmployeesModal({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect(() => {
  //   validateForm();
  // }, [email]);
  // Validate form
  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await refresh();
      const id = data.id;
      setId(id);
    };
    fetchData();
  }, []);
  const handleInvite = () => {
    // if (!email.trim()) {
    //   alert("Email cannot be empty");
    //   return;
    // }
    validateForm();
    if (isFormValid) {
      getCompanyDetails(id)
        .then((response) => {
          const companyId = response.data;
          getBridgeUsers(companyId).then((response) => {
            const emailExists =
              Array.isArray(response.data) &&
              response.data.some((user) => user.email === email);

            if (emailExists) {
              console.log("Yes, the email exists.");
              alert("email already exists");
            } else {
              sendEmail(email)
                .then((response) => {
                  console.log("invite send");
                  handleClose();
                })
                .catch((error) => {
                  console.log("error", error);
                  alert("could not send invite");
                  handleClose();
                });
            }
          });
        })
        .catch((error) => {
          console.log("error getting", error);
        });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            Invite Employees
          </div>
          <form>
            <div className="input_title margin-top-36">
              <span className="input_title">Email</span>
              <TextField
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              {errors.email && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>
          </form>
          <Button className="invite_employees_btn" onClick={handleInvite}>
            Send Invites
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
