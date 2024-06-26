import "../../App.css";
import DefaultLayout from "../../layout/DefaultLayout";
import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import CircularProgress from "@mui/material/CircularProgress";

import Divider from "@mui/material/Divider";
import NormalTable from "../../components/NormalTable";
import CustomSearch from "../../components/CustomSearch";
import styled from "@emotion/styled";

import { Custom_Axios } from "../../AxiosInstance";
// import { add_token } from "../../redux/state";
import MenuItem from "@mui/material/MenuItem";

// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Edit from "../../components/Edit";

// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import FeedBack from "../../components/FeedBack";

import { useSelector, useDispatch } from "react-redux";

import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";

const Statistics = styled("div")(() => ({
  positions: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  top: 20,
  width: "85vw",
  height: "30vh",
}));

const Actions = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "50vw",
  height: "10vh",
}));

export default function Users() {
  const [users, setUsers] = React.useState(null);
  const [headers, setHeaders] = React.useState([]);
  const [selected_items, setSelectedUsers] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [edit, setedit] = React.useState(false);
  const [submitting, setsubmitting] = React.useState(false);
  const [feedback, setfeedback] = React.useState(null);
  // const searchInputRef = React.useRef(null);

  const [active_id, setactive_id] = React.useState("");
  const [username, setusername] = React.useState("");
  const [email, setemail] = React.useState("");
  const [role, setrole] = React.useState("");

  const token = useSelector((state) => state.AppReducer.token);
  var CustomAxios = Custom_Axios(token);

  const OnSelection = React.useCallback((selected) => {
    setSelectedUsers(selected);
  }, []);

  const SearchUser = React.useCallback((keywords) => {
      const params = { keywords };
      CustomAxios.get('/Users', { params }).then((response) => {
          if (response.status === 200) {
              setUsers(response.data);
          }
      });
  }, []);

  const createUserHeaders = React.useCallback(() => {
    const headers = [
      {
        id: "id",
        numeric: false,
        disablePadding: false,
        label: "User ID",
        alignment: "left",
      },
      {
        id: "username",
        numeric: false,
        disablePadding: false,
        label: "UserName",
        alignment: "left",
      },
      {
        id: "email",
        numeric: false,
        disablePadding: true,
        label: "Email",
        alignment: "left",
      },
      {
        id: "role",
        numeric: false,
        disablePadding: true,
        label: "Access Level",
      },
      {
        id: "addedAt",
        numeric: false,
        disablePadding: true,
        label: "Date Added",
        date: true,
      },
    ];
    setHeaders(headers);
  }, []);

  React.useEffect(() => {
    FetchUsers();
  }, [submitting]);

  const FetchUsers = (params) => {
    setUsers(null);
    CustomAxios.get("/Users", { params }).then((response) => {
      if (response.status === 200) {
        setUsers(response.data);
        createUserHeaders();
      }
    });
  };

  const GetUserById = (id, onComplete) => {
    CustomAxios.get("/Users/" + id).then((response) => {
      if (response.status === 200) {
        onComplete(response.data);
      }
    });
  };

  const clearFields = () => {
    setusername("");
    setemail("");
    setrole("");
    setactive_id("");
  };

  const AddUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const user = {};
    for (const [key, value] of formData.entries()) {
      user[key] = value;
    }
    setsubmitting(true);

    CustomAxios.post("/Users", user).then((response) => {
      if (response.status === 200) {
        setfeedback({
          status: "success",
          message: "Saved successfully",
        });
        setsubmitting(false);
        setedit(false);
        // FetchClients()

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        clearFields();
      }
    });
  };

  const UpdateUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const user = {
      id: active_id,
    };
    for (const [key, value] of formData.entries()) {
      user[key] = value;
    }
    setsubmitting(true);

    CustomAxios.put("/Users/" + active_id, user).then((response) => {
      if (response.status === 204) {
        setfeedback({
          status: "success",
          message: "Updated successfully",
        });
        setsubmitting(false);
        setedit(false);
        // FetchClients()

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        clearFields();
      }
    });
  };

  const DeleteUser = (id) => {
    CustomAxios.delete("/Users/" + id).then((response) => {
      if (response.status == 204) {
        setfeedback({
          status: "success",
          message: "Deleted successfully",
        });
        FetchUsers();
        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        clearFields();
      }
    });
  };

  // console.log(firstName)

  const Fields = () => (
    <>
      {/* <TextField sx = {{width : '25vw'}} onChange={(event) => {setfirstName(event.target.value)}} value = {firstName} name="firstName" label="First Name" variant="outlined" /> */}

      <TextField
        sx={{ width: "25vw" }}
        defaultValue={username}
        name="username"
        label="UserName"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        defaultValue={email}
        name="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        defaultValue={""}
        name="passwordHash"
        type="password"
        label="Password"
        variant="outlined"
      />

      <TextField
        select
        sx={{ width: "25vw" }}
        defaultValue={role}
        name="role"
        label="Access Level"
        variant="outlined"
      >
        <MenuItem key={"admin"} value={"admin"}>
          Admin
        </MenuItem>

        <MenuItem key={"normal"} value={"normal"}>
          Normal
        </MenuItem>

      </TextField>

      <LoadingButton
        type="submit"
        sx={{ width: "25vw", height: "8vh" }}
        variant="contained"
        tabIndex={-1}
        loading={submitting}
        loadingPosition="start"
        startIcon={<SaveIcon fontSize="large" />}
      >
        <span>Submit</span>
      </LoadingButton>
    </>
  );

  const toggleEditDrawer = (newOpen) => {
    setedit(newOpen);
  };

  return (
    <div className="root">
      <DefaultLayout
        active_tab={"Users"}
        active_icon={<CircleNotificationsOutlinedIcon />}
      />

      {/* <FeedBack open ={(feedback != null)?(true):(false)} message={feedback.message} status={feedback.status} /> */}
      <FeedBack
        open={feedback != null ? true : false}
        message={feedback != null ? feedback.message : ""}
        status={feedback != null ? feedback.status : "success"}
      />

      <div
        style={{
          display: "flex",
          position: "relative",
          top: 10,
          width: "85vw",
          height: "10vh",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Actions>
          <Button
            onClick={() => {
              if (active_id) {
                clearFields();
              }
              setedit(true);
            }}
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add
          </Button>

          <Button
            onClick={async () => {
              GetUserById(selected_items[0], (data) => {
                setusername(data.username)
                setemail(data.email)
                setrole(data.role)
                setactive_id(data.id);
                setedit(true);
              });
            }}
            disabled={!selected_items.length}
            variant="contained"
            startIcon={<SyncAltOutlinedIcon />}
          >
            Update
          </Button>

          <Button
            onClick={() => {
                GetUserById(selected_items[0], (data) => {
                    setusername(data.username)
                    setemail(data.email)
                    setrole(data.role)
                    setactive_id(data.id);
                    DeleteUser(data.id)
                  });
            }}
            disabled={!selected_items.length}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>

          <Button
            onClick={() => {
              console.log(selected_items);
            }}
            variant='contained'
            startIcon={<ExitToAppOutlinedIcon />}
          >
            EXCEL
          </Button>
        </Actions>
      </div>

      <div
        style={{
          position: "relative",
          top: 20,
          width: "90vw",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Divider style={{ width: "80vw" }} textAlign="center">
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            ACTIONS
          </Typography>
        </Divider>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "90vw",
            height: "10vh",
          }}
        >
          <CustomSearch
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
              if (value.length >= 3) {
                SearchUser(value);
              }
              if (value == "") {
                SearchUser(null);
              }
            }}
            placeholder="Search User"
            icon_1={<SearchIcon />}
            icon_2={<MenuIcon />}
          />
        </div>

        {users != null ? (
          <div style={{ width: "90vw", paddingTop: "20px" }}>
            <NormalTable
              heading={"Users"}
              OnSelection={OnSelection}
              headers={headers}
              table_rows={users}
            />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <CircularProgress />
          </div>
        )}
      </div>

      <Edit
        open={edit}
        Heading={active_id ? "UPDATE " + username : "ADD User"}
        onSubmit={active_id ? UpdateUser : AddUser}
        toggleDrawer={toggleEditDrawer}
      >
        <Fields />
      </Edit>
    </div>
  );
}
