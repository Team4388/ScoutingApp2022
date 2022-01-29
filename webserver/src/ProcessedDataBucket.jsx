export class ProcessedDataBucket {
    constructor() {
        this.teamData = null;
        this.matchData = null;
        this.updateData = (db) => {
            db.allDocs({
                include_docs: true,
            })
                .then((result) => {
                    console.log(result);
                    result.rows.forEach((dbentry) => {
                        let doc = dbentry.doc;
                        console.log(doc);
                        //if there's no processed data on a team yet, create a default data entry
                        if (typeof this.teamData[doc.team_name] === "undefined") {
                            this.teamData[doc.team_name] = {
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
                        let thisTeamData = this.teamData[doc.team_name];
                        console.log(thisTeamData);
                        let new_team_data = {
                            ...thisTeamData,
                            games_played: thisTeamData.games_played + 1,
                            num_climbs: thisTeamData.num_climbs + (doc.climb == true ? 1 : 0),
                            num_disables: thisTeamData.num_disables + (doc.disabled == true ? 1 : 0),
                            num_flips: thisTeamData.num_flips + (doc.flipped_over == true ? 1 : 0),
                            fouls: thisTeamData.fouls + parseInt(doc.fouls),
                            fouls_tech: thisTeamData.fouls_tech + parseInt(doc.fouls_tech),
                            inner_port: thisTeamData.inner_port + parseInt(doc.inner_port),
                            outer_port: thisTeamData.outer_port + parseInt(doc.outer_port),
                            lower_port: thisTeamData.lower_port + parseInt(doc.lower_port),
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
        };
    }
}