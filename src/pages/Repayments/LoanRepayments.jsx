import "../../App.css";
import DefaultLayout from "../../layout/DefaultLayout";
import * as React from "react";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import styled from "@emotion/styled";

import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

import Button from "@mui/material/Button";
import Edit from "../../components/Edit";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import NormalTable from "../../components/NormalTable";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import LoansModal from "./LoansModal";
import FeedBack from "../../components/FeedBack";
import { Custom_Axios } from "../../AxiosInstance";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toISODate, toDDMMYYYY } from "../../Utils/ConvertDateTime";
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

export default function LoanRepayments() {
  const [feedback, setfeedback] = React.useState(null);
  const [selectedloan, set_selectedloan] = React.useState(null);
  const [edit, setedit] = React.useState(false);
  const [submitting , setsubmitting] = React.useState(false);
  const [loanView, setloanView] = React.useState(false);

  const [active_schedule, set_active_schedule] = React.useState(null);

  const [repayments, set_repayments] = React.useState([
    {
      Loan: "XXXX-XXXX-XXXX",
      RepaymentDate: "2024-03-02",
      RepaymentAmout: "30000",
      Status: "Approved",
    },
  ]);
  const [headers, setheaders] = React.useState([]);

  // const [active_repayment , set_active_repayment] = React.useState(null)

  const [selected_repayments, set_selected_repayments] = React.useState([]);

  const token = useSelector(state => state.AppReducer.token);
  var CustomAxios = Custom_Axios(token)

  const OnSelection = React.useCallback((selected) => {
    set_selected_repayments(selected);
  }, []);

  const toggleEditDrawer = (newOpen) => {
    setedit(newOpen);
  };

  const FetchRepayments = (params = {}) => {
    set_repayments(null);
    CustomAxios.get("/RepaymentSchedules", { params }).then((response) => {
      if (response.status == 200) {
        set_repayments(response.data);
      }
    });
  };

  const AddSchedule = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setsubmitting(true)

    const schedule = {
      loanId: selectedloan,
      status: "Pending",
    };

    for (const [key, value] of formData.entries()) {
      if (key == "repaymentDate") {
        schedule[key] = dayjs(value).toISOString();
        continue;
      }
      schedule[key] = value;
    }

    CustomAxios.post("/RepaymentSchedules", schedule).then((response) => {
      if (response.status == 200) {
        setfeedback({
          status: "success",
          message: "Saved successfully",
        });
        setsubmitting(false);
        setedit(false);
        FetchRepayments({ loanId: selectedloan});

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

        set_active_schedule(null);
      }
    });
  };

  const FetchScheduleById = (id, onComplete) => {
    CustomAxios.get("/RepaymentSchedules/" + id).then((response) => {
      if (response.status == 200) {
        onComplete(response.data);
      }
    });
  };

  const createheaders = () => {
    const headers = [
      {
        id: "loanId",
        numeric: false,
        disablePadding: false,
        label: "Loan",
        alignment: "left",
      },
      {
        id: "repaymentDate",
        numeric: false,
        disablePadding: false,
        label: "Repayment Date",
        alignment: "left",
        date: true,
      },
      {
        id: "repaymentAmount",
        numeric: false,
        disablePadding: false,
        label: "Amount",
        alignment: "left",
        money: true,
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
        alignment: "left",
      },
    ];
    setheaders(headers);
  };

  React.useEffect(() => {
    createheaders();
    FetchRepayments();
  }, []);

  const Fields = () => (
    <>
      <TextField
        disabled
        sx={{ width: "25vw" }}
        defaultValue={
          selectedloan ? selectedloan : selected_repayments[0]["loanId"]
        }
        name="loan"
        label="Loan ID"
        variant="outlined"
      />

      <TextField
        sx={{ width: "25vw" }}
        defaultValue={active_schedule ? active_schedule.repaymentAmount : ""}
        name="repaymentAmount"
        label="Repayment Amount"
        variant="outlined"
      />
      <TextField
        disabled={!active_schedule}
        select
        sx={{ width: "25vw" }}
        defaultValue={active_schedule ? active_schedule.status : "Pending"}
        name="status"
        label="Status"
        variant="outlined"
      >
        <MenuItem key={"Pending"} value={"Pending"}>
          Pending
        </MenuItem>

        <MenuItem key={"Missed"} value={"Missed"}>
          Missed
        </MenuItem>

        <MenuItem key={"Paid"} value={"Paid"}>
          Paid
        </MenuItem>
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="repaymentDate"
          label="Repayment Date"
          sx={{ width: "25vw" }}
          // defaultValue={active_schedule ? dayjs(active_schedule.repaymentDate).date() : null}
          // disabled={
          //   active_application
          //     ? active_application.status == "Approved"
          //       ? false
          //       : true
          //     : true
          // }
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
      </LocalizationProvider>

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

  return (
    <div className="root">
      <DefaultLayout
        active_tab={"Repayments"}
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
              if (selectedloan == null) {
                set_active_schedule(null);
                setfeedback({
                  status: "error",
                  message: "Select a loan to add a repayment schedule",
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
              FetchScheduleById(selected_repayments[0], (data) => {
                set_active_schedule(data);
                setedit(true);
              });
            }}
            variant="contained"
            disabled={!selected_repayments.length}
            startIcon={<SyncAltOutlinedIcon />}
          >
            Update
          </Button>

          <Button
            onClick={() => {}}
            variant="contained"
            disabled={!selected_repayments.length}
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
            severity={selectedloan ? "success" : "warning"}
          >
            Active Loan : {selectedloan}
          </Alert>

          <Button
            onClick={() => {
              setloanView(true);
            }}
            variant="contained"
            startIcon={<PersonAddOutlinedIcon />}
          >
            Select loan
          </Button>
        </div>

        {repayments != null ? (
          <div style={{ width: "90vw", paddingTop: "20px" }}>
            <NormalTable
              heading={"Repayment Schedules"}
              OnSelection={OnSelection}
              headers={headers}
              table_rows={repayments}
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
        Heading={"ADD PAYMENT"}
        onSubmit={AddSchedule}
        toggleDrawer={toggleEditDrawer}
      >
        <Fields />
      </Edit>

      <LoansModal
        open={loanView}
        onSelection={(selectedloans) => {
          if (selectedloans.length > 0) {
            setfeedback({
              status: "info",
              message: "Loan " + selectedloans[0] + " selected",
            });

            set_selectedloan(selectedloans[0]);
            setloanView(false);

            setTimeout(() => {
              setfeedback(null);
            }, 4000);

            setloanView(false);

            FetchRepayments({ loanId: selectedloans[0] });
          }
        }}
        onToggleDrawer={(close) => {
          setloanView(close);
        }}
      />
    </div>
  );
}
