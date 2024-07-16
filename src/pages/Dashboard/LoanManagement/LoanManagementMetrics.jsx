import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

export default function LoanManagementMetrics({
  applications_metrics,
  loans_metrics,
}) {
  const [meta_data, set_meta_data] = React.useState({
    rejected: 2,
    approved: 3,
    pending: 4,
  });

  console.log(loans_metrics)

  const {pending_applications , ...processed_applications_metrics} = applications_metrics

  const Chart = ({ header, data }) => {
    return (
      <Card sx={{ minWidth: "10vw", height: "50vh" }}>
        <CardHeader title={header} />
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "25vw",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <PieChart
              series={[
                {
                  paddingAngle: 5,
                  innerRadius: 60,
                  outerRadius: 80,
                  data: data,
                },
              ]}
              margin={{ right: 5 }}
              width={200}
              height={200}
              legend={{ hidden: true }}
            />

            <List>
              {data.map((item, index) => {
                return (
                  <ListItem>
                    <ListItemText
                      primary={item.label.replace("_", " ")}
                      secondary={item.value}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      style={{
        width: "64vw",
        minHeight: "60vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      
      <Chart
        header={"Applications"}
        data={Object.entries(processed_applications_metrics).map(([key, value]) => {
          return { label: key, value: value };
        })}
      />

      <Chart
        header={"Loans"}
        data={Object.entries(loans_metrics).map(([key, value]) => {
          return { label: key, value: value };
        })}
      />
    </div>
  );
}
