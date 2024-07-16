import DefaultLayout from "../../layout/DefaultLayout";
import "../../App.css";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import SideMetrics from "./SideBar/SideMetrics";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import GeneralMetrics from "./General/GeneralMetrics";
import LoanManagementMetrics from "./LoanManagement/LoanManagementMetrics";
import React from "react";
import { useSelector } from "react-redux";
import { Custom_Axios } from "../../AxiosInstance";
import CircularProgress from "@mui/material/CircularProgress";

const Space = styled("div")(() => ({
  width: "30vw",
  height: "8vh",
}));

export default function Dashboard() {
  const token = useSelector((state) => state.AppReducer.token);
  var CustomAxios = Custom_Axios(token);

  const [metrics, set_metrics] = React.useState(null);

  const FetchMetrics = () => {
    CustomAxios.get("/metrics").then((response) => {
      if (response.status === 200) {
        set_metrics(response.data);
      }
    });
  };

  React.useEffect(() => {
    FetchMetrics();
  }, []);

  return (
    <div className={"dashboardRoot"}>
      <DefaultLayout
        active_tab={"DASHBOARD"}
        active_icon={<DashboardCustomizeOutlinedIcon />}
      />

      {metrics != null ? (
        <>
          <div
            style={{
              position: "absolute",
              right: "3vw",
              top: "40vh",
            }}
          >
            <SideMetrics
              recent_applications={metrics.applications.pending_applications}
              recent_deposits={metrics.deposits}
              recent_payments={metrics.processed_payments}
            />
          </div>

          <div
            style={{
              width: "64vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              flexGrow: 1,
              maxHeight: "300vh",
              minHeight: "50vh",
            }}
          >
            <Space />

            <Divider style={{ width: "64vw" }} textAlign="center">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                General Management Metrics
              </Typography>
            </Divider>

            <GeneralMetrics 
              user_metrics={metrics.users}
              client_metrics={metrics.clients}
            />

            <Space />

            <Divider style={{ width: "64vw" }} textAlign="center">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                Loan Management Metrics
              </Typography>
            </Divider>

            <LoanManagementMetrics
              applications_metrics={metrics.applications}

              loans_metrics={metrics.loans}
            />
          </div>
        </>
      ) : (
        <div style={{ display: "flex" , justifyContent : 'center' , alignItems : 'center', height : '60vh', width : '97vw' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
