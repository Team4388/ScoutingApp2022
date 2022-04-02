import PouchDB from "pouchdb";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useProcessedDataBucket } from "./ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "./ProcessedDataBucket";

const LocalDbContext = React.createContext();
const RemoteDbContext = React.createContext();

export function useLocalDb() {
  return useContext(LocalDbContext);
}

export function useRemoteDb() {
  return useContext(RemoteDbContext);
}

export function DbProvider({ children }) {
  // const pdbCtx = useProcessedDataBucket();
  const { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
  // console.log(pdb);
  const [localdb, setLocaldb] = useState(new PouchDB("denver_fr"));
  const [remotedb, setRemotedb] = useState(
    new PouchDB("http://" + window.location.hostname + ":5984/denver_fr", {
      skip_setup: true,
      auth: {
        username: "scouting",
        password: "Ridgebotics",
      },
    })
  );
  localdb.replicate
    .from(remotedb, {
      live: true,
      retry: true,
    })
    .on("change", (change) => {
      updateProcessedDataBucket(localdb, setProcessedDataBucket);
    });
  //   useEffect(()=>{
  // updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // }, [setProcessedDataBucket]);
  //         localdb.replicate.to(remotedb, {
  //           retry: true,
  //         });

  // const [localNotesdb, setLocalNotesdb] = useState(new PouchDB("denver_notes"));
  // const [remoteNotesdb, setRemoteNotesdb] = useState(
  //   new PouchDB("http://" + window.location.hostname + ":5984/denver_notes", {
  //     skip_setup: true,
  //     auth: {
  //       username: "scouting",
  //       password: "Ridgebotics",
  //     },
  //   })
  // );
  // localNotesdb.replicate
  //   .from(remoteNotesdb, {
  //     live: true,
  //     retry: true,
  //   })
  //   .on("change", (change) => {
  //     // updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //   });


  // updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // useEffect(() => {
  //   setDatabaseName("denver_fr", setLocaldb, setRemotedb, setProcessedDataBucket);
  // });

  // useEffect(() => {
  //   updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //   localdb
  //     .sync(remotedb, {
  //       live: true,
  //       retry: true,
  //     })
  //     .on("change", function (change) {
  //       console.log("DB CHANGED");
  //       updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //     })
  //     .on("paused", function (info) {
  //       console.log("sync paused");
  //       // console.log(info);
  //     })
  //     .on("active", function (info) {
  //       console.log("sync active");
  //       // console.log(info);
  //     })
  //     .on("denied", function (info) {
  //       console.log("sync denied");
  //       // console.log(info);
  //     })
  //     .on("complete", function (info) {
  //       console.log("sync complete");
  //       // console.log(info);
  //     })
  //     .on("error", function (err) {
  //       console.error(err);
  //     });
  // }, [localdb, setProcessedDataBucket]);

  return (
    <LocalDbContext.Provider value={{ localdb, setLocaldb }}>
      <RemoteDbContext.Provider value={{ remotedb, setRemotedb }}>{children}</RemoteDbContext.Provider>
    </LocalDbContext.Provider>
  );
}

export function setDatabaseName(name, setLocaldb, setRemotedb, setProcessedDataBucket) {
  let localdb = new PouchDB(name);
  let remotedb = new PouchDB("http://" + window.location.hostname + ":5984/" + name, {
    skip_setup: true,
    auth: {
      username: "scouting",
      password: "Ridgebotics",
    },
  });
  localdb.replicate
    .from(remotedb, {
      live: true,
      retry: true,
    })
    .on("change", (change) => {
      updateProcessedDataBucket(localdb, setProcessedDataBucket);
    });
  updateProcessedDataBucket(localdb, setProcessedDataBucket);
          localdb.replicate.to(remotedb, {
            live: true,
            retry: true,
          });
  setLocaldb(localdb);
  setRemotedb(remotedb);
}
