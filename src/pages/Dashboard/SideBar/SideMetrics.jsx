import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/system";
import { FormatMoney } from "../../../Utils/Money";

import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";

import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const Space = styled("div")(() => ({
  width: "30vw",
  height: "8vh",
}));

export default function SideMetrics({recent_payments , recent_applications , recent_deposits}) {
//   const [recent_payments, set_recent_payments] = React.useState([
//     { name: "Ntambi Nassim", amount: "shs 2,500,000" },
//     { name: "Mike Kiera", amount: "shs 2,500,000" },
//     { name: "Johnson Arteta", amount: "shs 2,500,000" },
//   ]);
//   const [recent_applications, set_recent_applications] = React.useState([
//     { name: "Ntambi Nassim", amount: "shs 2,500,000" },
//     { name: "Mike Kiera", amount: "shs 2,500,000" },
//     { name: "Johnson Arteta", amount: "shs 2,500,000" },
//   ]);
//   const [recent_deposits, set_recent_deposits] = React.useState([
//     { name: "Ntambi Nassim", amount: "shs 2,500,000" },
//     { name: "Mike Kiera", amount: "shs 2,500,000" },
//     { name: "Johnson Arteta", amount: "shs 2,500,000" },
//   ]);

  const AddedApplications = () => {
    return (
        <List dense sx={{ width: "27vw", maxHeight: "20vh" }}>
        {recent_applications.map(({ client, loanAmount }, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.primary"
                  gutterBottom
                >
                  {FormatMoney(loanAmount)}
                </Typography>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <DocumentScannerOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={client.firstName + " " + client.otherNames} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const AddedPayments = () => {
    return (
      <List dense sx={{ width: "27vw", maxHeight: "20vh" }}>
        {recent_payments.map(({ firstName , otherNames, amount }, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.primary"
                  gutterBottom
                >
                  {FormatMoney(amount)}
                </Typography>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={firstName + " " + otherNames} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const AddedDeposits = () => {
    return (
        <List dense sx={{ width: "27vw", maxHeight: "20vh" }}>
        {recent_deposits.map(({ account, amount }, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.primary"
                  gutterBottom
                >
                  {FormatMoney(amount)}
                </Typography>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <CreditScoreIcon />
                </ListItemIcon>
                <ListItemText primary={account.client.firstName + " " + account.client.otherNames} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Card
      sx={{
        minHeight: "50vh",
        maxHeight: "200vh",
        width: "30vw",
      }}
    >
      {/* <CardHeader sx = {{fontSize:12}} title={"Recent Activity"} /> */}
      <CardContent>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          Recent Activity
        </Typography>

        <Space />

        <Divider style={{ width: "25vw" }} textAlign="center">
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            Recently Added Payments
          </Typography>
        </Divider>
        <AddedPayments />

        <Space />

        <Divider style={{ width: "25vw" }} textAlign="center">
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            Recently Added Pending Applications
          </Typography>
        </Divider>
        <AddedApplications />

        <Space />

        <Divider style={{ width: "25vw" }} textAlign="center">
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            Recently Deposited
          </Typography>
        </Divider>
        <AddedDeposits />
      </CardContent>
    </Card>
  );
}
