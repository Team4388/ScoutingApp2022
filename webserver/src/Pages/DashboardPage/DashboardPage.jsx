import React from "react";
import { useLocalDb } from "../../DbContext";
import { useProcessedDataBucket } from "../../ProcessedDataBucketContext";
import Chart from "react-apexcharts";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const DashboardPage = () => {
  //https://react-charts.js.org/examples/column
  const pdb = useProcessedDataBucket();
  const makePieChartData = (pdb, team_num) => {
    // console.log(team_num);
    // console.log(pdb.teamData);
    return {
      labels: ["None", "Low", "Mid", "High", "Transversal"],
      datasets: [
        {
          label: "Climbs",
          data: pdb.teamData[4388].climb_counts,
          backgroundColor: ["rgba(230,20,20)", "rgba(230,150,20)", "rgba(160,220,20)", "rgba(20,230,70)", "rgba(20,200,180)"],
        },
      ],
    };
  };
  console.log(pdb);

  //format data for the data grid
  let grid_data = [];
  //turns the values of the key value pairs in the list into an array
  let team_data_array = Object.values(pdb.teamData);
  const roundPlaces = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
  team_data_array.forEach((value, index, array) => {
    grid_data.push({
      id: value.team_number,
      average_auto_points: roundPlaces(value.average_auto_points, 2),
      average_teleop_hub_points: roundPlaces(value.average_teleop_hub_points, 2),
      average_climb_points: roundPlaces(value.average_climb_points, 2),
      average_total_match_points: roundPlaces(value.average_total_match_points, 2),
    });
  });
  console.log(grid_data);

  return (
    <div>
      {/* <Pie data={makePieChartData(pdb, 4388)} /> */}
      <Box
        sx={{
          height: "600px",
          m: 2,
        }}
      >
        <DataGrid
          rows={grid_data}
          columns={[
            { field: "id", headerName: "Team", width: 100 },
            { field: "average_total_match_points", headerName: "Avg Total Pts", width: 150 },
            { field: "average_auto_points", headerName: "Avg Auto Pts", width: 150 },
            { field: "average_teleop_hub_points", headerName: "Avg Teleop Hub Pts", width: 190 },
            { field: "average_climb_points", headerName: "Avg Climb Pts", width: 150 },
            // { field: "matched_played", headerName: "Matches", width: 100 },
          ]}
          checkboxSelection
          rowsPerPageOptions={[15]}
        />
      </Box>
      {/* <Chart
        options={{
          chart: {
            width: 384,
            type: "pie",
          },
          labels: ["None", "Low", "Mid", "High", "Transversal"],
        }}
        series={pdb.teamData[4388].climb_counts}
        type="pie"
        width={380}
      /> */}
    </div>
  );
};

export default DashboardPage;
