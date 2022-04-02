export function updateProcessedDataBucket(db, setProcessedDataBucket) {
  return db
    .allDocs({
      include_docs: true,
    })
    .then((result) => {
      //reset data
      let teamData = {};
      let matchData = {};

      result.rows.forEach((dbentry) => {
        let doc = dbentry.doc;

        //if there's no processed data on a team yet, create a default data entry
        if (typeof teamData[doc.team_number] === "undefined") {
          teamData[doc.team_number] = {
            team_number: doc.team_number,
            matches_played: 0,
            notes: [],
            data_sets: {
              upper_hub_auto: [],
              lower_hub_auto: [],
              upper_hub_teleop: [],
              lower_hub_teleop: [],
              auto_points: [],
              teleop_hub_points: [],
              climb_points: [],
              total_match_points: [],
            },
            climb_counts: [0, 0, 0, 0, 0],
            average_auto_points: 0,
            average_teleop_hub_points: 0,
            average_climb_points: 0,
            average_total_match_points: 0,
            num_disables: 0,
            num_flips: 0,
            fouls: 0,
            fouls_tech: 0,
            red_cards: 0,
            yellow_cards: 0,
          };
        }

        let thisTeamData = teamData[doc.team_number];
        if (doc.type === "match")
        {
          console.log("MATCH: " + doc._id)
        //add this game's data to the respective team data:
        thisTeamData.matches_played++;

        let auto_points = (parseInt(doc.taxi_auto) ? 2 : 0) + parseInt(doc.upper_hub_auto) * 4 + parseInt(doc.lower_hub_auto) * 2;
        let teleop_hub_points = parseInt(doc.upper_hub_teleop) * 2 + parseInt(doc.lower_hub_teleop) * 1;
        let climb_points = (parseInt(doc.climb_level) == 0 ? 4 : 0) + (parseInt(doc.climb_level) == 1 ? 6 : 0) + (parseInt(doc.climb_level) == 2 ? 10 : 0) + (parseInt(doc.climb_level) == 3 ? 15 : 0);
        let total_match_points = auto_points + teleop_hub_points + climb_points;
        //data sets
        thisTeamData.data_sets.upper_hub_auto.push(parseInt(doc.upper_hub_auto));
        thisTeamData.data_sets.lower_hub_auto.push(parseInt(doc.lower_hub_auto));
        thisTeamData.data_sets.upper_hub_teleop.push(parseInt(doc.upper_hub_teleop));
        thisTeamData.data_sets.lower_hub_teleop.push(parseInt(doc.lower_hub_teleop));
        thisTeamData.data_sets.auto_points.push(auto_points);
        thisTeamData.data_sets.teleop_hub_points.push(teleop_hub_points);
        thisTeamData.data_sets.climb_points.push(climb_points);
        thisTeamData.data_sets.total_match_points.push(total_match_points);

        //climb data
        thisTeamData.climb_counts[parseInt(doc.climb_level)]++;

        //misc data
        thisTeamData.num_disables += doc.disabled ? 1 : 0;
        thisTeamData.num_flips += doc.flipped ? 1 : 0;
        thisTeamData.fouls += parseInt(doc.fouls);
        thisTeamData.fouls_tech += parseInt(doc.fouls_tech);
        thisTeamData.red_cards += parseInt(doc.red_cards);
        thisTeamData.yellow_cards += parseInt(doc.yellow_cards);

        //sum of all points in the match points data set for this team
        //function for getting the sum of an array, use in reduce function of array
        const sum = (accum, current) => accum + current;
        thisTeamData.average_auto_points = thisTeamData.data_sets.auto_points.reduce(sum, 0) / thisTeamData.matches_played;
        thisTeamData.average_teleop_hub_points = thisTeamData.data_sets.teleop_hub_points.reduce(sum, 0) / thisTeamData.matches_played;
        thisTeamData.average_climb_points = thisTeamData.data_sets.climb_points.reduce(sum, 0) / thisTeamData.matches_played;
        thisTeamData.average_total_match_points = thisTeamData.data_sets.total_match_points.reduce(sum, 0) / thisTeamData.matches_played;
        } else if (doc.type === "notes") {
          console.log("NOTES: " + doc._id)
          thisTeamData.notes.push(doc.notes);
        }
      });
      setProcessedDataBucket({ teamData: teamData, matchData: matchData });
    })
    .catch((err) => {
      console.log("Error while processing data!");
      console.error(err);
    });
}
