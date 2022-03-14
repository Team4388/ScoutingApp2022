import PouchDB from "pouchdb";
import React, { useContext, useEffect, useState } from "react";
import { ProcessedDataBucketContext, useProcessedDataBucket } from "./ProcessedDataBucketContext";
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
  const { processedDataBucket, setProcessedDataBucket } = useContext(ProcessedDataBucketContext);
  // console.log(pdb);
  const [localdb, setLocaldb] = useState(new PouchDB("testdata"));
  //used in development server
  const [remotedb, setRemotedb] = useState(
    new PouchDB("http://" + window.location.hostname + ":5984/testdata", {
      skip_setup: true,
      auth: {
        username: "scouting",
        password: "Ridgebotics",
      },
    })
  );

  useEffect(() => {
    console.log("TEST");
    updateProcessedDataBucket(localdb, setProcessedDataBucket);
    localdb
      .sync(remotedb, {
        live: true,
        retry: true,
      })
      .on("change", function (change) {
        console.log("DB CHANGED");
        updateProcessedDataBucket(localdb, setProcessedDataBucket);
      })
      .on("paused", function (info) {})
      .on("active", function (info) {})
      .on("error", function (err) {
        console.error(err);
      });
  }, [localdb, setProcessedDataBucket]);

  return (
    <LocalDbContext.Provider value={{ localdb, setLocaldb }}>
      <RemoteDbContext.Provider value={{ remotedb, setRemotedb }}>{children}</RemoteDbContext.Provider>
    </LocalDbContext.Provider>
  );
}
