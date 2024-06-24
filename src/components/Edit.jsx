import Drawer from "@mui/material/Drawer";
// import * as React from 'react';
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
// import Paper from '@mui/material/Paper';
// import { Drawer } from '@material-tailwind/react';

// import Drawer from 'react-modern-drawer'

// //import styles 👇
// import 'react-modern-drawer/dist/index.css'

export default function Edit({
  open,
  Heading,
  children,
  toggleDrawer,
  onSubmit,
}) {
  return (
    <Drawer
      disableAutoFocus
      anchor={"right"}
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <div
        style={{
          width: "30vw",
          height: "14vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography
          style={{ fontSize: "17px", fontWeight: "bold" }}
          variant="h6"
        >
          {Heading}
        </Typography>
        <Divider style={{ width: "28vw" }} />
      </div>
      <Box
        onSubmit={(event) => {
          onSubmit(event);
        }}
        component="form"
        noValidate
        autoComplete="off"
        style={{
          width: "30vw",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          flexGrow: 1,
          maxHeight: "300vh",
          overflowY: "scroll",
          gap: "16px",
          paddingBottom: "16px",
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
}

Edit.propTypes = {
  open: PropTypes.string.isRequired,
  Fields: PropTypes.node.isRequired,
  Heading: PropTypes.string.isRequired,
  children: PropTypes.node,
  toggleDrawer: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
