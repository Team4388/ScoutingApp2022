import React, { useContext, useState } from "react";
import { useLocalDb } from "./DbContext.jsx";
import { ProcessedDataBucket } from "./ProcessedDataBucket.jsx";
import { getProcessedDataBucket, updateProcessedDataBucket } from "./ProcessedDataBucket";

export const ProcessedDataBucketContext = React.createContext();
export function useProcessedDataBucket() {
  return useContext(ProcessedDataBucketContext);
}

export function ProcessedDataBucketProvider({ children }) {
  //create the processed data bucket object
  const { localdb } = useLocalDb();
  const [processedDataBucket, setProcessedDataBucket] = useState(null);
  localdb.on("change", (change) => {
    updateProcessedDataBucket(localdb, setProcessedDataBucket);
  });
  return <ProcessedDataBucketContext.Provider value={{ processedDataBucket, setProcessedDataBucket }}>{children}</ProcessedDataBucketContext.Provider>;
}
