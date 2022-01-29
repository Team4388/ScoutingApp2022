import React, { useContext, useState } from "react";
import { useLocalDb } from "./DbContext";
import { ProcessedDataBucket } from "./ProcessedDataBucket.jsx"

export const ProcessedDataBucketContext = React.createContext();
export function useProcessedDataBucket() {
    return useContext(ProcessedDataBucketContext);
}

export function ProcessedDataBucketProvider({ children }) {
    //create the processed data bucket object
    const [processedDataBucket, setProcessedDataBucket] = useState(new ProcessedDataBucket());
    return (
        <ProcessedDataBucketContext.Provider value={processedDataBucket}>
            {children}
        </ProcessedDataBucketContext.Provider>
    );
};