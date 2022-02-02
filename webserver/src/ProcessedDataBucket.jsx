export class ProcessedDataBucket {
    constructor() {
        this.teamData = {};
        this.matchData = {};
        this.updateData = (db) => {
            //reset data 
            this.teamData = {};
            this.matchData = {};
            console.log(db);

            db.allDocs({
                include_docs: true,
            })
                .then((result) => {
                    console.log(result);
                    result.rows.forEach((dbentry) => {
                        let doc = dbentry.doc;
                        console.log(doc);

                        // //if there's no processed data on a team yet, create a default data entry
                        // if (typeof this.teamData[doc.team_number] === "undefined") {
                        //     this.teamData[doc.team_number] = {
                        //         team_number: doc.team_number,
                        //         games_played: 0,
                        //         data_sets: {
                        //             upper_hub_auto: [],
                        //             lower_hub_auto: [],
                        //             upper_hub: [],
                        //             lower_hub: [],
                        //             match_points: []
                        //         },
                        //         climbs_none: 0,
                        //         climbs_low: 0,
                        //         climbs_mid: 0,
                        //         climbs_high: 0,
                        //         climbs_transverse: 0,
                        //         points_average: 0,
                        //         num_disables: 0,
                        //         num_flips: 0,
                        //         fouls: 0,
                        //         fouls_tech: 0,
                        //         red_cards: 0,
                        //         yellow_cards: 0
                        //     };
                        // }

                        // //add this game's data to the respective team data:
                        // let thisTeamData = this.teamData[doc.team_number];
                        // thisTeamData.games_played++;

                        // let match_points
                        //     = parseInt(doc.taxi_auto)
                        //     + parseInt(doc.upper_hub_auto) * 4
                        //     + parseInt(doc.lower_hub_auto) * 2
                        //     + parseInt(doc.upper_hub_teleop) * 2
                        //     + parseInt(doc.lower_hub_teleop) * 1
                        //     + (parseInt(doc.climb_level) == 0 ? 4 : 0)
                        //     + (parseInt(doc.climb_level) == 1 ? 6 : 0)
                        //     + (parseInt(doc.climb_level) == 2 ? 10 : 0)
                        //     + (parseInt(doc.climb_level) == 3 ? 15 : 0)
                        //     ;

                        // //data sets
                        // thisTeamData.data_sets.upper_hub_auto.push(parseInt(doc.upper_hub_auto));
                        // thisTeamData.data_sets.lower_hub_auto.push(parseInt(doc.lower_hub_auto));
                        // thisTeamData.data_sets.upper_hub.push(parseInt(doc.upper_hub));
                        // thisTeamData.data_sets.lower_hub.push(parseInt(doc.lower_hub));
                        // thisTeamData.data_sets.match_points.push(match_points);

                        // //climb data
                        // switch (parseInt(doc.climb_level)) {
                        //     case 0:
                        //         thisTeamData.climbs_none++;
                        //         break;
                        //     case 1:
                        //         thisTeamData.climbs_low++;
                        //         break;
                        //     case 2:
                        //         thisTeamData.climbs_mid++;
                        //         break;
                        //     case 3:
                        //         thisTeamData.climbs_high++;
                        //         break;
                        //     case 4:
                        //         thisTeamData.climbs_transverse++;
                        //         break;
                        //     default:
                        //         console.error('Invalid Climb Level (how did this even happen lol?): ' + doc.climb_level);
                        //         break;
                        // }

                        // //misc data
                        // thisTeamData.num_disables += doc.disabled ? 1 : 0;
                        // thisTeamData.num_flips += doc.flipped ? 1 : 0;
                        // thisTeamData.fouls += parseInt(doc.fouls);
                        // thisTeamData.fouls_tech += parseInt(doc.fouls_tech);
                        // thisTeamData.red_cards += parseInt(doc.red_cards);
                        // thisTeamData.yellow_cards += parseInt(doc.yellow_cards);

                        // console.log(thisTeamData);
                    });
                })
                .catch((err) => {
                    console.log("Error while processing data!");
                    console.error(err);
                });
        };
    }
}