import React from "react";
import "chart.js/auto";
import { useLocalDb } from "../../DbContext";
import { Pie, Bar, Chart } from "react-chartjs-2";
import { useProcessedDataBucket } from "../../ProcessedDataBucketContext";

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
          backgroundColor: ["rgba(230,20,20)", "rgba(230,150,20)", "rgba(150,230,20)", "rgba(20,230,70)", "rgba(20,200,180)"],
        },
      ],
    };
  };
  // console.log(pdb);
  return (
    <div>
      <Pie data={makePieChartData(pdb, 4388)} />
    </div>
  );
};

export default DashboardPage;
