import React, { useState, useEffect } from "react";
import CompanyLayout from "../../component/companyLayout/CompanyLayout";
import { TextField, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { refresh } from "../../component/Refresh";
import { updateUser } from "../../services/UpdateUser";
import { getUserDetails } from "../../services/GetUserDetails";
import { resetCompare } from "../../services/ResetCompare";

export default function profile() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await refresh();
      const id = data.id;
      setId(id);

      getUserDetails(id)
        .then((response) => {
          const userData = response.data;
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
        })
        .catch((error) => {
          console.log("Error fetching user data", error);
        });
    };

    fetchData();
  }, []);

  const handleProfile = () => {
    // if (!oldPassword && password) {
    //   alert("Password is required");
    //   return;
    // }
    if (oldPassword) {
      if (password === confirmPassword) {
        resetCompare(id, oldPassword)
          .then((response) => {
            console.log("=========", response);
            if (response.data === 1) {
              updateUser(id, { firstName, lastName, password })
                .then((response) => {
                  router.push("/dashboard");
                })
                .catch((error) => {
                  console.log("Error", error);
                  alert("Error updating");
                });
            } else if (response.data === 0) {
              alert("Incorrect old password entered");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        alert("new password mismatch");
      }
    } else {
      updateUser(id, { firstName, lastName, password })
        .then((response) => {
          router.push("/dashboard");
        })
        .catch((error) => {
          console.log("Error", error);
          alert("Error updating");
        });
    }
  };

  return (
    <CompanyLayout activePage="profile">
      <div className="profile_top_row">
        <div style={{ marginRight: "50px" }}>
          <div className="profile_field">First Name</div>
          <TextField
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="company_field"
          />
        </div>
        <div>
          <div className="profile_field">Last Name</div>
          <TextField
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="company_field"
          />
        </div>
      </div>
      <div className="profile_lower_row">
        <div className="profile_field">email</div>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="company_field"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="profile_lower_row">
        <div className="profile_field">Old Password</div>
        <TextField
          className="password_field"
          placeholder="**********"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="profile_top_row" style={{ marginTop: "34px" }}>
        <div style={{ marginRight: "50px" }}>
          <div className="profile_field">New Password</div>
          <TextField
            className="password_field"
            placeholder="**********"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className="profile_field">Confirm New Password</div>
          <TextField
            className="password_field"
            placeholder="**********"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="profile_save_btn">
        <button
          variant="contained"
          className="save_btn"
          onClick={handleProfile}
        >
          Save
        </button>
      </div>
    </CompanyLayout>
  );
}
