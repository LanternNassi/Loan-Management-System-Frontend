import "../../App.css";
import DefaultLayout from "../../layout/DefaultLayout";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import * as React from "react";

import FeedBack from "../../components/FeedBack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Alert from "@mui/material/Alert";

import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import NormalTable from "../../components/NormalTable";
import styled from "@emotion/styled";

import { Custom_Axios } from "../../AxiosInstance";
import ApplicationClients from "./ApplicationClients";
import Edit from "../../components/Edit";
import { Grid, TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toISODate , toDDMMYYYY } from "../../Utils/ConvertDateTime";
import { useSelector } from "react-redux";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";

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

export default function LoanApplications() {
  const [applications, setapplications] = React.useState(null);
  const [feedback, setfeedback] = React.useState(null);
  const [headers, setheaders] = React.useState([]);
  const [selected_applications, set_selected_applications] = React.useState([]);
  const [edit, setedit] = React.useState(false);
  const [submitting, setsubmitting] = React.useState(false);

  const [clientView, setClientView] = React.useState(false);
  const [active_application, setactive_application] = React.useState(null);
  const [selectedclient, setselectedclient] = React.useState(null);
  const [selectedclientName , setselectedclientName] = React.useState(null)

  const [selected_status , set_selected_status] = React.useState(null)
  const [selected_start_date , set_selected_start_date] = React.useState(null)
  const [selected_end_date , set_selected_end_date] = React.useState(null)

  const token = useSelector(state => state.AppReducer.token);
  var CustomAxios = Custom_Axios(token)


  const OnSelection = React.useCallback((selected) => {
    set_selected_applications(selected);
  }, []);

  const createApplicationHeaders = () => {
    const headers = [
      {
        id: "clientId",
        numeric: false,
        disablePadding: false,
        label: "client",
        alignment: "left",
        clientName: true,
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Application Status",
        alignment: "left",
      },
      {
        id: "loanAmount",
        numeric: false,
        disablePadding: false,
        label: "Loan Amount",
        alignment: "left",
        money : true
      },
      {
        id: "approved_by",
        numeric: false,
        disablePadding: false,
        label: "Approved By",
        alignment: "left",
        user: true,
      },
      {
        id: "approved_Date",
        numeric: false,
        disablePadding: false,
        label: "Date Approved",
        alignment: "left",
        date : true,
      },
      {
        id: "addedAt",
        numeric: false,
        disablePadding: true,
        label: "Date added",
        date : true
      },
    ];
    setheaders(headers);
  };

  const toggleEditDrawer = (newOpen) => {
    setedit(newOpen);
  };

  const FetchApplications = (params = {}) => {
    setapplications(null);
    CustomAxios.get("/LoanApplications", { params }).then((response) => {
      if (response.status == 200) {
        setapplications(response.data);
        createApplicationHeaders();
      }
    });
  };

  const GetApplicationById = (id, onComplete) => {
    CustomAxios.get("/LoanApplications/" + id).then((response) => {
      if (response.status == 200) {
        onComplete(response.data);
      }
    });
  };

  const FetchClientById = (id , OnComplete) => {
    CustomAxios.get('/Clients/' + id).then((response) => {
        if (response.status === 200) {
          OnComplete(response.data)
        }
    });
  }

  const CreateApplication = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const application = {
      status: "Pending",
      clientId: selectedclient,
    };
    for (const [key, value] of formData.entries()) {
      if (value) {
        application[key] = value;
      }
    }
    setsubmitting(true);

    CustomAxios.post("/LoanApplications", application).then((response) => {
      if (response.status === 201) {
        setfeedback({
          status: "success",
          message: "Saved successfully",
        });
        setsubmitting(false);
        setedit(false);
        FetchApplications({ ClientId: selectedclient });

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        setactive_application(null);
      }
    });
  };



  const UpdateApplication = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const application = {
      id: active_application.id,
      'clientId' : active_application.clientId,
      "approved_by": JSON.parse(localStorage.getItem('User')).id,
    };
    for (const [key, value] of formData.entries()) {
      application[key] = value;

      if (key == 'endDate'){
        application[key] = dayjs(value).toISOString()
      }

      if (key == 'startDate'){
        application[key] = dayjs(value).toISOString()
      }
    }
    // console.log(application)
    setsubmitting(true);

    CustomAxios.put(
      "/LoanApplications/" + active_application.id,
      application
    ).then((response) => {
      if (response.status === 204) {
        setfeedback({
          status: "success",
          message: "Updated successfully",
        });
        setsubmitting(false);
        setedit(false);
        FetchApplications({ ClientId: selectedclient });

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        setactive_application(null);
      }
    });
  };

  const DeleteApplication = (id) => {
    CustomAxios.delete("/LoanApplications/" + id).then((response) => {
      if (response.status == 204) {
        setfeedback({
          status: "success",
          message: "Deleted successfully",
        });
        FetchApplications({ ClientId: selectedclient });
        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        setactive_application(null);
      }
    });
  };

  const Fields = () => (
    <>
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={
          active_application ? active_application.clientId : selectedclient
        }
        name="clientId"
        label="Client"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        defaultValue={active_application ? active_application.loanAmount : ""}
        name="loanAmount"
        label="Loan Amount"
        variant="outlined"
      />
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={active_application ? active_application.approved_by : ""}
        name="approved_by"
        label="Approved By"
        variant="outlined"
      />
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={
          active_application ? active_application.approved_Date : ""
        }
        name="approved_Date"
        label="Date Approved"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        name="rejectionReason"
        label="Rejection Reason"
        multiline
        disabled={active_application ? false : true}
        rows={4}
        defaultValue={
          active_application ? active_application.rejectionReason : ""
        }
      />
      <TextField
        sx={{ width: "25vw" }}
        name="status"
        select
        onChange={(event) => {
          // set_selected_status(event.target.value)
          setactive_application({...active_application , 'status' : event.target.value})
        }}
        disabled={active_application ? false : true}
        label="Application Status"
        defaultValue={
          active_application ? active_application.status : "Pending"
        }
        helperText="Select the application status"
      >
        <MenuItem key={"Pending"} value={"Pending"}>
          Pending
        </MenuItem>

        <MenuItem key={"Rejected"} value={"Rejected"}>
          Rejected
        </MenuItem>

        <MenuItem key={"Approved"} value={"Approved"}>
          Approved
        </MenuItem>
      </TextField>

      

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          container
          spacing={2}
          display={"flex"}
          flexDirection={'column'}
          justifyContent={"space-between"}
          alignItems={'center'}
          paddingTop={"1rem"}
        >
          <Grid item>
            <DatePicker
              name = "startDate"
              label="Start Date"
              sx = {{width : '25vw'}}
              disabled ={active_application ? (active_application.status == 'Approved' ? (false) : (true)) : true}
              renderInput={(params) => <TextField {...params} />}
              // value={""}
              // onChange={(newValue) =>
              //   handleExperienceDataChange(
              //     index,
              //     "startDate",
              //     dayjs(newValue).format("MM-DD-YYYY")
              //   )
              // }
            />
          </Grid>
          <Grid item>
            <DatePicker
              name = "endDate"
              label="End Date"
              sx = {{width : '25vw'}}
              disabled ={active_application ? (active_application.status == 'Approved' ? (false) : (true)) : true}
              renderInput={(params) => <TextField {...params} />}
              // value={exp.endDate ? dayjs(exp.endDate) : null}
              // onChange={(newValue) =>
              //   handleExperienceDataChange(
              //     index,
              //     "endDate",
              //     dayjs(newValue).format("MM-DD-YYYY")
              //   )
              // }
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      <TextField
        sx={{ width: "25vw" }}
        disabled ={active_application ? (active_application.status == 'Approved' ? (false) : (true)) : true}
        // defaultValue={active_application ? active_application.loanAmount : ""}
        name="InterestRate"
        label="Interest Rate"
        variant="outlined"
      />

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

  React.useEffect(() => {
    FetchApplications();
  }, []);

  return (
    <div className="root">
      <DefaultLayout
        active_tab={"Applications"}
        active_icon={<CircleNotificationsOutlinedIcon />}
      />

      <FeedBack
        open={feedback != null ? true : false}
        message={feedback != null ? feedback.message : ""}
        status={feedback != null ? feedback.status : "success"}
      />

      <Statistics>
        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={"Approved"} />
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              24
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={"Pending"} />
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              24
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={"Rejected"} />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              14
            </Typography>
          </CardContent>
        </Card>
      </Statistics>

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
              if (active_application) {
                setactive_application(null);
              }

              if (!selectedclient) {
                setfeedback({
                  status: "error",
                  message:
                    "Please select a client before adding a Loan Application",
                });

                setTimeout(() => {
                  setfeedback(null);
                }, 4000);

                return;
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
              GetApplicationById(selected_applications[0], (data) => {
                setactive_application(data);
                setedit(true);
              });
            }}
            disabled={!selected_applications.length}
            variant="contained"
            startIcon={<SyncAltOutlinedIcon />}
          >
            Update
          </Button>

          <Button
            onClick={() => {
              DeleteApplication(selected_applications[0]);
            }}
            disabled={!selected_applications.length}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>

          <Button
            onClick={() => {}}
            variant="contained"
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
            justifyContent: "space-between",
            alignItems: "center",
            width: "90vw",
            height: "10vh",
          }}
        >
          <Alert
            variant="outlined"
            severity={selectedclient ? "success" : "warning"}
          >
            Active Client : {selectedclientName}
          </Alert>

          <Button
            onClick={() => {
              setClientView(true);
            }}
            variant="contained"
            startIcon={<PersonAddOutlinedIcon />}
          >
            Select client
          </Button>
        </div>

        {applications != null ? (
          <div style={{ width: "90vw", paddingTop: "20px" }}>
            <NormalTable
              heading={"Loan Applications"}
              OnSelection={OnSelection}
              headers={headers}
              table_rows={applications}
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
        Heading={active_application ? "UPDATE Application" : "ADD Application"}
        onSubmit={active_application ? UpdateApplication : CreateApplication}
        toggleDrawer={toggleEditDrawer}
      >
        <Fields />
      </Edit>

      <ApplicationClients
        open={clientView}
        onSelection={(selectedclients) => {
          if (selectedclients.length > 0) {
            setfeedback({
              status: "info",
              message: "Client " + selectedclients[0] + " selected",
            });

            setselectedclient(selectedclients[0]);
            setClientView(false);
            FetchApplications({ ClientId: selectedclients[0] });
            FetchClientById(selectedclients[0] , (data)=>{
              setselectedclientName(data.firstName + " " + data.otherNames)
            })
            setTimeout(() => {
              setfeedback(null);
            }, 4000);
          }
        }}
        onToggleDrawer={(close) => {
          setClientView(close);
        }}
      />
    </div>
  );
}
