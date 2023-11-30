import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import dashboard from "../../assets/sidebar_icons/Dashboard.svg";
import dashboardFill from "../../assets/sidebar_icons/dashboardFill.svg";
import employee from "../../assets/sidebar_icons/Employee.svg";
import employeeFill from "../../assets/sidebar_icons/employeeFill.svg";
import MyLeaves from "../../assets/sidebar_icons/MyLeaves.svg";
import myLeavesFill from "../../assets/sidebar_icons/myLeavesFill.svg";
import leaves from "../../assets/sidebar_icons/LeavestoApprove.svg";
import approveLeavesFill from "../../assets/sidebar_icons/leavesToApproveFill.svg";
import logout from "../../assets/sidebar_icons/Logout.svg";
import invite from "../../assets/invite.svg";
import { useRouter } from "next/router";
import { InviteEmployeesModal } from "../InviteEmployee/inviteEmployeesModal";
import CreateLeave from "../createLeave/createLeave";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/store";
import { getId } from "../GetID";
import { getRole } from "../GetRole";
import { refresh } from "../Refresh";

const drawerWidth = 290;
const reducedDrawerWidth = 250;

function ResponsiveDrawer(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUser, setOpenUser] = useState(false);
  const handleOpenUser = () => setOpenUser(true);
  const handleCloseUser = () => setOpenUser(false);
  const [userRole, setUserRole] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      // const role = await getRole();
      const data = await refresh();
      const role = data.role;
      setUserRole(role);
    };
    fetchData();
  }, []);

  const router = useRouter();
  const handleLeaveSettings = () => {
    router.push("/leaveSettings");
  };
  const handleDashboard = () => {
    router.push("/dashboard");
  };
  const handleEmployee = () => {
    router.push("/employeePage");
  };
  const handleMyLeaves = () => {
    router.push("/myLeavesPage");
  };
  const handleLeavestoApprove = () => {
    router.push("/leavesToApprovePage");
  };
  const handleprofile = () => {
    router.push("/companyStatus");
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(
      userSlice.actions.set_access_token({
        access_token: null,
      })
    );
    // Redirect to the login page
    router.push("/login");
  };
  const activeRoute = router.pathname;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      // const role = await getRole();
      const data = await refresh();
      const role = data.role;
      setUserRole(role);
    };
    fetchData();
  }, []);
  const drawer = (
    <div className="sidebar_style">
      <button
        onClick={handleDashboard}
        className={
          activeRoute === "/dashboard"
            ? "active_sidebar_block"
            : "sidebar_block"
        }
      >
        <Image
          className="sidebar_icon"
          src={activeRoute === "/dashboard" ? dashboardFill : dashboard}
          alt="SVG Image"
        />{" "}
        <span
          className={
            activeRoute === "/dashboard" ? "active_sidebar_btn" : "sidebar_btn"
          }
        >
          Dashboard
        </span>
      </button>

      {userRole === "ADMIN" && (
        <button
          onClick={handleEmployee}
          className={
            activeRoute === "/employeePage"
              ? "active_sidebar_block mt-41"
              : "sidebar_block mt-41"
          }
        >
          <Image
            className="sidebar_icon"
            src={activeRoute === "/employeePage" ? employeeFill : employee}
            alt="SVG Image"
          />{" "}
          <span
            className={
              activeRoute === "/employeePage"
                ? "active_sidebar_btn"
                : "sidebar_btn"
            }
          >
            Employee
          </span>
        </button>
      )}

      {userRole != "ADMIN" && (
        <button
          onClick={handleMyLeaves}
          className={
            activeRoute === "/myLeavesPage"
              ? "active_sidebar_block mt-41"
              : "sidebar_block mt-41"
          }
        >
          <Image
            className="sidebar_icon"
            src={activeRoute === "/myLeavesPage" ? myLeavesFill : MyLeaves}
            alt="SVG Image"
          />{" "}
          <span
            className={
              activeRoute === "/myLeavesPage"
                ? "active_sidebar_btn"
                : "sidebar_btn"
            }
          >
            My Leaves
          </span>
        </button>
      )}
      {userRole === "ADMIN" && (
        <button
          onClick={handleLeavestoApprove}
          className={
            activeRoute === "/leavesToApprovePage"
              ? "active_sidebar_block mt-41"
              : "sidebar_block mt-41"
          }
        >
          <Image
            className="sidebar_icon"
            src={
              activeRoute === "/leavesToApprovePage"
                ? approveLeavesFill
                : leaves
            }
            alt="SVG Image"
          />{" "}
          <span
            // className="sidebar_btn"
            className={
              activeRoute === "/leavesToApprovePage"
                ? "active_sidebar_btn"
                : "sidebar_btn"
            }
          >
            Leaves to Approve
          </span>
        </button>
      )}

      <button
        onClick={handleprofile}
        className={
          // activeRoute === "/employeePage"
          activeRoute === "/companyStatus"
            ? "active_sidebar_block mt-41"
            : "sidebar_block mt-41"
        }
      >
        <Image
          className="sidebar_icon"
          src={activeRoute === "/companyStatus" ? employeeFill : employee}
          alt="SVG Image"
        />{" "}
        <span
          className={
            activeRoute === "/companyStatus"
              ? "active_sidebar_btn"
              : "sidebar_btn"
          }
        >
          Profile
        </span>
      </button>

      <button onClick={handleLogout} className={"sidebar_block mt-41"}>
        <Image className="sidebar_icon" src={logout} alt="SVG Image" />{" "}
        <span className="sidebar_btn">Logout</span>
      </button>

      {/* <button onClick={handleCollapseMenu} className={"sidebar_block mt-41"}>
        <Image className="sidebar_icon" src={collapseMenu} alt="SVG Image" />{" "}
        <span className="sidebar_btn">Collapse Menu</span>
      </button> */}
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="sidebar-drawer">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          background: "#F9FBFC",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F9FBFC",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F9FBFC",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <div className="welcome_box">
          <div className="welcome_left_div">
            <div>Welcome To Leave Work</div>
            <div className="welcome_subheading">
              We have assembled some links to get you started
            </div>
          </div>
          <div>
            {userRole === "NORMAL_USER_ROLE" && (
              <div>
                <button onClick={handleOpenUser} className="invite_btn">
                  <div className="welcome_invite_setup">
                    <span className="btn_text_layout">Create Leave</span>
                    <Image
                      style={{ marginLeft: "4px" }}
                      src={invite}
                      alt="SVG Image"
                    />
                  </div>
                </button>
              </div>
            )}
            {userRole === "ADMIN" && (
              <div>
                <button
                  style={{
                    width: "123px",
                    height: "34px",
                    flexShrink: "0",
                    borderRadius: "4px",
                    border: "1px solid #0FAC81",
                    padding: "9px 12px 8px 13px",
                  }}
                  onClick={handleLeaveSettings}
                >
                  <span
                    style={{
                      color: "#0FAC81",
                    }}
                    className="btn_text_layout"
                  >
                    Leave Settings
                  </span>
                </button>

                <button onClick={handleOpen} className="invite_btn">
                  <div className="welcome_invite_setup">
                    <span className="btn_text_layout">Invite Employees</span>
                    <Image
                      style={{ marginLeft: "4px" }}
                      src={invite}
                      alt="SVG Image"
                    />
                  </div>
                </button>
              </div>
            )}
            <CreateLeave
              openUser={openUser}
              handleCloseUser={handleCloseUser}
            />
            <InviteEmployeesModal open={open} handleClose={handleClose} />
          </div>
        </div>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
