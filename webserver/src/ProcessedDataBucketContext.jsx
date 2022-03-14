import React, { useContext, useState } from "react";
import { ProcessedDataBucket } from "./ProcessedDataBucket.jsx";

export const ProcessedDataBucketContext = React.createContext();
export function useProcessedDataBucket() {
  return useContext(ProcessedDataBucketContext);
}

export function ProcessedDataBucketProvider({ children }) {
  //create the processed data bucket object
  const [processedDataBucket, setProcessedDataBucket] = useState(null);
  return <ProcessedDataBucketContext.Provider value={{ processedDataBucket, setProcessedDataBucket }}>{children}</ProcessedDataBucketContext.Provider>;
}
