import PouchDB from "pouchdb";
import React, { useContext, useState } from "react";
import { ProcessedDataBucketContext } from "./ProcessedDataBucketContext";

const LocalDbContext = React.createContext();
const RemoteDbContext = React.createContext();

export function useLocalDb() {
  return useContext(LocalDbContext);
}

export function useRemoteDb() {
  return useContext(RemoteDbContext);
}

export function DbProvider({ children }) {
  const pdb = React.useContext(ProcessedDataBucketContext);
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

  pdb.updateData(localdb);
  localdb
    .sync(remotedb, {
      live: true,
      retry: true,
    })
    .on("change", function (change) {
      console.log('DB CHANGED');
      pdb.updateData(localdb);
    })
    .on("paused", function (info) { })
    .on("active", function (info) { })
    .on("error", function (err) {
      console.error(err);
    });

  return (
    <LocalDbContext.Provider value={localdb}>
      <RemoteDbContext.Provider value={remotedb}>
        {children}
      </RemoteDbContext.Provider>
    </LocalDbContext.Provider>
  );
}
