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
import { styled } from '@mui/system';
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";

import { Custom_Axios } from "../../AxiosInstance";
// import { add_token } from "../../redux/state";

// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Edit from "../../components/Edit";
import ApplicationClients from "../Applications/ApplicationClients";

// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Alert from "@mui/material/Alert";

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

export default function WithDrawSavings() {
  const [WithDraws, setWithDraws] = React.useState(null);
  const [headers, setHeaders] = React.useState([]);
  const [selected_withdraws, setSelectedWithdraws] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [edit, setedit] = React.useState(false);
  const [submitting, setsubmitting] = React.useState(false);
  const [feedback, setfeedback] = React.useState(null);
  const [clientView, setClientView] = React.useState(false);

  const [selectedclient, setselectedclient] = React.useState(null);
  const [selectedclientName, setselectedclientName] = React.useState(null);

  const [active_account, set_active_account] = React.useState(null);

  const token = useSelector((state) => state.AppReducer.token);
  var CustomAxios = Custom_Axios(token);

  const OnSelection = React.useCallback((selected) => {
    setSelectedWithdraws(selected);
  }, []);

  const AddWithDraw = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const withdraw = {
        accountId : active_account.id
    };
    for (const [key, value] of formData.entries()) {
      withdraw[key] = value;
    }
    setsubmitting(true);

    CustomAxios.post("/Account/Withdrawals", withdraw).then((response) => {
      if (response.status === 201) {
        setfeedback({
          status: "success",
          message: "Saved successfully",
        });
        setsubmitting(false);
        setedit(false);
        FetchWithdraws({client : active_account.client.id})

        setTimeout(() => {
          setfeedback(null);
        }, 4000);

      }
    });
  };

  const FetchAccountByClient = (id, OnComplete) => {
    let params = { client: id };
    CustomAxios.get("/Accounts", { params }).then((response) => {
      if (response.status === 200) {
        OnComplete(response.data);
      }
    });
  };

  const DeleteWithDraw = (id) => {
    CustomAxios.delete('/Account/Withdrawals/'+id).then((response)=>{
        if (response.status == 204){
            setfeedback({
                'status' : 'success',
                'message' : 'Withdraw deleted successfully' 
            })
            FetchWithdraws({client : active_account.client.id})
            setTimeout(()=>{
                setfeedback(null)
            },3000)

        }
    })
}

  const createWithDrawsHeaders = React.useCallback(() => {
    const headers = [
      {
        id: "id",
        numeric: false,
        disablePadding: false,
        label: "Account Number",
        alignment: "left",
      },
      {
        id: "firstName",
        numeric: false,
        disablePadding: false,
        label: "Client",
        alignment: "left",
        transaction_name: true,
      },
      {
        id: "amount",
        numeric: false,
        disablePadding: true,
        label: "Amount WithDawn",
        alignment: "left",
        money: true,
      },
      {
        id: "description",
        numeric: false,
        disablePadding: true,
        label: "More Info",
        alignment: "left",
      },
      {
        id: "addedAt",
        numeric: false,
        disablePadding: true,
        label: "Date Withdrawn",
        date: true,
      },
    ];
    setHeaders(headers);
  }, []);

  React.useEffect(() => {
    FetchWithdraws();
  }, []);

  const FetchWithdraws = (params = {}) => {
    setWithDraws(null);
    CustomAxios.get("/Account/Withdrawals", { params }).then((response) => {
      if (response.status === 200) {
        setWithDraws(response.data.data);
        createWithDrawsHeaders();
      }
    });
  };

  const Fields = () => (
    <>
      <TextField
        sx={{ width: "25vw" }}
        defaultValue={active_account.id}
        name="accountId"
        label="Account"
        variant="outlined"
        disabled
      />
      <TextField
        sx={{ width: "25vw" }}
        defaultValue={""}
        name="amount"
        label="Amount to Withdraw"
        variant="outlined"
      />
      <TextField
        sx={{ width: "25vw" }}
        name="description"
        label="More Information"
        multiline
        rows={4}
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

  const toggleEditDrawer = (newOpen) => {
    setedit(newOpen);
  };

  return (
    <div className="root">
      <DefaultLayout
        active_tab={"Withdraws"}
        active_icon={<AddCardOutlinedIcon />}
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
              if (!active_account) {
                setfeedback({
                  status: "error",
                  message: "Please select an account first to add withdraw from",
                });

                setTimeout(() => {
                  setfeedback(null);
                }, 3000);

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
            onClick={() => {
                DeleteWithDraw(selected_withdraws[0])
            }}
            disabled={!selected_withdraws.length}
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

        {WithDraws != null ? (
          <div style={{ width: "90vw", paddingTop: "20px" }}>
            <NormalTable
              heading={"Account(s) WithDraws"}
              OnSelection={OnSelection}
              headers={headers}
              table_rows={WithDraws}
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
        Heading={"WITHDRAW "}
        onSubmit={AddWithDraw}
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
            FetchWithdraws({ client: selectedclients[0] });
            setClientView(false);
            FetchAccountByClient(selectedclients[0], (data) => {
              set_active_account(data[0]);
              setselectedclientName(
                data[0].client.firstName + " " + data[0].client.otherNames
              );
            });
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
