import "../../App.css";
import DefaultLayout from "../../layout/DefaultLayout";
import * as React from "react";

import FeedBack from "../../components/FeedBack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import styled from "@emotion/styled";

import NormalTable from "../../components/NormalTable";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";

import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import ApplicationClients from "../Applications/ApplicationClients";
import Edit from "../../components/Edit";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSelector } from "react-redux";
import { Custom_Axios } from "../../AxiosInstance";

import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import Disbursments from "./Disbursments";

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

export default function Loans() {
  const [feedback, setfeedback] = React.useState(null);

  const [clientView, setClientView] = React.useState(false);
  const [disbursmentsView, setDisbursmentsView] = React.useState(false);

  const [selectedclient, setselectedclient] = React.useState(null);
  const [active_loan] = React.useState(null);

  const [selected_loans, set_selected_loans] = React.useState([]);
  const [headers, setheaders] = React.useState([]);
  const [submitting, setsubmitting] = React.useState(false);
  const [edit, setedit] = React.useState(false);

  const [loansStatus, setLoansStatus] = React.useState(null);

  console.log(clientView);
  console.log(selected_loans);

  // const [loans , setloans] = React.useState([
  //   {
  //     'id' : 'XXXX-XXXX-XXXX-XXX',
  //     'client' : 'XXXX-XXXX-XXXX-XXX',
  //     'Application' : 'XXXX-XXXX-XXXX-XXX',
  //     'LoanAmount' : 300000,
  //     'StartDate' : '2023-04-03',
  //     'EndDate' : '2023-04-03',
  //     'InterestRate' : '30',
  //     'Status' : 'Active',
  //     'OutStandingBalance' : 300000
  //   }
  // ])

  const [loans, setloans] = React.useState(null);

  const OnSelection = React.useCallback((selected) => {
    set_selected_loans(selected);
  }, []);

  const token = useSelector(state => state.AppReducer.token);
  var CustomAxios = Custom_Axios(token)

  const FetchLoans = (params) => {
    setloans(null);
    CustomAxios.get("/Loans" , {params}).then((response) => {
      if (response.status == 200) {
        setloans(response.data);
        console.log(response.data);
        createLoansHeaders();
      }
    });
  };

  const createLoansHeaders = () => {
    const headers = [
      {
        id: "application",
        numeric: false,
        disablePadding: false,
        label: "Application",
        alignment: "left",
      },
      {
        id: "loanAmount",
        numeric: false,
        disablePadding: false,
        label: "Amount",
        alignment: "left",
        money: true,
      },
      {
        id: "startDate",
        numeric: false,
        disablePadding: false,
        label: "Start Date",
        alignment: "left",
        date: true,
      },
      {
        id: "endDate",
        numeric: false,
        disablePadding: false,
        label: "End Date",
        alignment: "left",
        date: true,
      },
      {
        id: "interestRate",
        numeric: false,
        disablePadding: false,
        label: "Interest Rate (%)",
        alignment: "center",
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
        alignment: "left",
      },
      {
        id: "outStandingBalance",
        numeric: false,
        disablePadding: false,
        label: "Balance",
        alignment: "left",
        money: true,
      },
    ];
    setheaders(headers);
  };

  const CreateDisbursment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const disbursment = {
      disbursmentDate: new Date().toISOString,
      disbursedBy: "e775285a-5f39-460c-ffa1-08dc8fa67299",
      loanId: selected_loans[0],
    };
    for (const [key, value] of formData.entries()) {
      if (value) {
        disbursment[key] = value;
      }
    }

    setsubmitting(true);

    CustomAxios.post("/LoanDisbursments", disbursment).then((response) => {
      if (response.status === 201) {
        setfeedback({
          status: "success",
          message: "Saved successfully",
        });
        setsubmitting(false);
        setedit(false);
        FetchLoans();

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        // set_(null);
      }
    });
  };

  const toggleEditDrawer = (newOpen) => {
    setedit(newOpen);
  };

  const Fields = () => (
    <>
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={active_loan ? active_loan.loan : selected_loans[0]}
        name="loanId"
        label="Loan"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        defaultValue={active_loan ? active_loan.disbursmentAmount : ""}
        name="disbursmentAmount"
        label="Amount"
        variant="outlined"
      />
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={active_loan ? active_loan.disbursmentDate : ""}
        name="disbursmentDate"
        label="Date"
        variant="outlined"
      />
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={active_loan ? active_loan.disbursedBy : ""}
        name="disbursedBy"
        label="Disbursed By"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        name="moreInfo"
        label="More Information"
        multiline
        rows={4}
        defaultValue={active_loan ? active_loan.moreInfo : ""}
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
    FetchLoans({
      'client' : selectedclient,
      'status' : loansStatus,
    });
  }, [selectedclient , loansStatus]);

  return (
    <div className="root">
      <DefaultLayout
        active_tab={"Loans"}
        active_icon={<CircleNotificationsOutlinedIcon />}
      />

      <FeedBack
        open={feedback != null ? true : false}
        message={feedback != null ? feedback.message : ""}
        status={feedback != null ? feedback.status : "success"}
      />

      <Statistics>
        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={"Active"} />
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
          <CardHeader title={"Repaid"} />
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
          <CardHeader title={"Defaulted"} />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              14
            </Typography>
          </CardContent>
        </Card>
      </Statistics>

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
            Active Client : {selectedclient}
          </Alert>

          <div
            style={{
              width: "60vw",
              height: "10vh",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                // onBlur={(event) => console.log(event.target)}
                id="orie"
                sx={{ height: 40 }}
                value={loansStatus}
                onChange={(event) => {
                  setLoansStatus(event.target.value);
                }}
                label="Status"
              >
                <MenuItem id="Active" value={"Active"}>
                  Active
                </MenuItem>
                <MenuItem id="Defaulted" value={"Defaulted"}>
                  Defaulted
                </MenuItem>
                <MenuItem name="Repaid" value={"Repaid"}>
                  Repaid
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={() => {
                setDisbursmentsView(true);
              }}
              disabled={!selected_loans.length}
              variant="outlined"
              startIcon={<PersonAddOutlinedIcon />}
            >
              Disbursments
            </Button>

            <Button
              onClick={() => {
                setedit(true);
              }}
              disabled={!selected_loans.length}
              variant="outlined"
              startIcon={<PersonAddOutlinedIcon />}
            >
              Disburse
            </Button>

            <Button
              onClick={() => {
                setClientView(true);
              }}
              variant="outlined"
              startIcon={<PersonAddOutlinedIcon />}
            >
              Select client
            </Button>
          </div>
        </div>

        {loans != null ? (
          <div style={{ width: "90vw", paddingTop: "20px" }}>
            <NormalTable
              heading={"Loans"}
              OnSelection={OnSelection}
              headers={headers}
              table_rows={loans}
            />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <CircularProgress />
          </div>
        )}

        <Edit
          open={edit}
          Heading={"ADD DISBURSMENT"}
          onSubmit={CreateDisbursment}
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

              setTimeout(() => {
                setfeedback(null);
              }, 4000);
            }
          }}
          onToggleDrawer={(close) => {
            setClientView(close);
          }}
        />

        {selected_loans.length > 0 ? (
          <Disbursments
            loan={selected_loans[0]}
            open={disbursmentsView}
            onSelection={(selected_disbursments) => {
              console.log(selected_disbursments);
            }}
            onToggleDrawer={(close) => {
              setDisbursmentsView(close);
            }}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
