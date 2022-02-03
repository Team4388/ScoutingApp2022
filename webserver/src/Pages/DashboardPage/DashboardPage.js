import React from "react";
import { useLocalDb } from "../../DbContext";
import { Bar, Chart } from "react-chartjs-2";

const DashboardPage = () => {
  const localdb = useLocalDb();
  let processed_data = {};
  localdb
    .allDocs({
      include_docs: true,
    })
    .then((result) => {
      console.log(result);
      result.rows.forEach((dbentry) => {
        let doc = dbentry.doc;
        console.log(doc);
        //if there's no processed data on a team yet, create a default data entry
        if (typeof processed_data[doc.team_name] === "undefined") {
          processed_data[doc.team_name] = {
            team_name: doc.team_name,
            alliance: doc.alliance,
            games_played: 0,
            climbs_none: 0,
            climbs_low: 0,
            climbs_mid: 0,
            climbs_high: 0,
            climbs_transverse: 0,
            points: 0,
            point_average: 0,
            num_disables: 0,
            disables_average: 0,
            num_flips: 0,
            flips_average: 0,
            fouls: 0,
            fouls_average: 0,
            fouls_tech: 0,
            fouls_tech_average: 0,
          };
        }

        let team_data = processed_data[doc.team_name];
        console.log(team_data);
        let new_team_data = {
          ...team_data,
          games_played: team_data.games_played + 1,
          num_climbs: team_data.num_climbs + (doc.climb == true ? 1 : 0),
          num_disables: team_data.num_disables + (doc.disabled == true ? 1 : 0),
          num_flips: team_data.num_flips + (doc.flipped_over == true ? 1 : 0),
          fouls: team_data.fouls + parseInt(doc.fouls),
          fouls_tech: team_data.fouls_tech + parseInt(doc.fouls_tech),
          inner_port: team_data.inner_port + parseInt(doc.inner_port),
          outer_port: team_data.outer_port + parseInt(doc.outer_port),
          lower_port: team_data.lower_port + parseInt(doc.lower_port),
        };
        console.log(new_team_data);
      });
    })
    .catch((err) => {
      console.log("Error Fetching Docs from Database!");
      console.log(err);
    });
  let datasets = [
    {
      data: [],
    },
  ];
  //https://react-charts.js.org/examples/column
  return <div></div>;
};

export default DashboardPage;
