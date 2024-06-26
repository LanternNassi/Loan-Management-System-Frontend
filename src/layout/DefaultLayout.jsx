import "../App.css";
// import { useState } from 'react'

import { useState } from "react";
import { Drawer } from "@mui/material";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";

import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

import CustomSearch from "../components/CustomSearch";
import { styled } from "@mui/system";

import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";

export default function DefaultLayout({ active_tab, active_icon }) {
  const [Open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Generalsections = [
    {
      text: "Dashboard",
      link: "/",
      icon: <DashboardCustomizeOutlinedIcon />,
    },

    {
      text: "Users",
      link: "/users",
      icon: <AccountCircleOutlinedIcon />,
      admin: true,
    },

    {
      text: "Clients",
      link: "/Clients",
      icon: <CircleNotificationsOutlinedIcon />,
    },
  ];

  const Loanssections = [
    {
      text: "Applications",
      link: "/LoanApplications",
      icon: <DocumentScannerOutlinedIcon />,
    },
    {
      text: "Loans",
      link: "/Loans",
      icon: <ListAltOutlinedIcon />,
    },
    {
      text: "Repayments",
      link: "/LoanRepayments",
      icon: <RequestPageOutlinedIcon />,
    },
  ];

  const LayoutItem = (component) => (
    <ListItem
      disabled={active_tab == component.text}
      key={component.text}
      disablePadding
    >
      <ListItemButton
        component={NavLink}
        to={component.link}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItemIcon>{component.icon}</ListItemIcon>
        <ListItemText primary={component.text} />
      </ListItemButton>
    </ListItem>
  );

  const drawerList = (sections) => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {sections.map((component) => {
          if (component.admin) {
            const role = JSON.parse(localStorage.getItem("User")).role;
            return role == "admin" ? LayoutItem(component) : null;
          }
          return LayoutItem(component);
        })}
      </List>
    </Box>
  );

  const NavOpenDiv = styled("div")(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "7vw",
  }));

  const SectionHeader = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "20vw",
    height: "10vh",
    fontcolor: theme.palette.secondary.main,
  }));
  const HeaderDiv = styled("div")(() => ({
    height: "18vh",
    width: "86vw",
    position: "relative",
    top: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  }));

  return (
    <>
      <div className="rootheader">
        <NavOpenDiv sx={{ width: "30vw" }}>
          <Button
            onClick={toggleDrawer(true)}
            variant="outlined"
            startIcon={<AppsIcon />}
          >
            MENU
          </Button>

          <Typography variant="h5">Loan Management System</Typography>
        </NavOpenDiv>

        <NavOpenDiv style={{ width: "50vw" }}>
          <CustomSearch
            placeholder={"Search Feature"}
            icon_1={<SearchIcon />}
            icon_2={<MenuIcon />}
          />
          <AccountBalanceOutlinedIcon />
          <InboxIcon />
          <CircleNotificationsOutlinedIcon />
          <Button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "add_login_info", User: null });
              dispatch({
                type: "add_token",
                token: null,
              });

              navigate("/login");
            }}
            variant="contained"
            startIcon={<AccountCircleOutlinedIcon />}
          >
            LOG OUT
          </Button>
        </NavOpenDiv>
      </div>
      <HeaderDiv>
        <Alert severity="success">
          Logged in as {JSON.parse(localStorage.getItem("User")).username}
        </Alert>
        
        <Divider style={{ width: "80vw" }} textAlign="right">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "14vw",
            }}
          >
            {active_icon}
            <Typography variant="h5">{active_tab}</Typography>
          </div>
        </Divider>
      </HeaderDiv>
      <Drawer open={Open} onClose={toggleDrawer(false)}>
        <div className="heading">
          <Typography style={{ fontSize: "24px" }} variant="h5">
            General
          </Typography>
        </div>
        <Divider />
        {drawerList(Generalsections)}

        <SectionHeader>
          <Typography style={{ fontSize: "17px" }} variant="h6">
            Loan Management
          </Typography>
        </SectionHeader>
        <Divider />
        {drawerList(Loanssections)}
      </Drawer>
    </>
  );
}

DefaultLayout.propTypes = {
  active_tab: PropTypes.string.isRequired,
  active_icon: PropTypes.node.isRequired,
};
