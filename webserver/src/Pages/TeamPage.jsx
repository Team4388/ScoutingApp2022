import React, { useCallback, useEffect, useState } from "react";
import { useLocalDb, useRemoteDb } from "../DbContext";
import { Formik, FastField, Form, useFormikContext } from "formik";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, NotesAdornment, Box } from "@mui/material";
import { useProcessedDataBucket } from "../ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../ProcessedDataBucket";
import { useLocation } from "react-router-dom";

const TeamPage = () => {
  let { localdb, setLocaldb } = useLocalDb();
  let { remotedb } = useRemoteDb();
  const location = useLocation();
  const { team } = location.state;
  console.log(team);

  let panel_sx = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "center", sm: "center" },
    justifyContent: { xs: "flex-start", sm: "center" },
    bgcolor: "background.paper",
    p: 2,
    m: 1,
    gap: 2,
    maxWidth: "fit-content",
    borderRadius: "10px",
    boxShadow: 7,
  };

  const [oldDoc, setOldDoc] = useState(null);
  const onSubmit = useCallback(
    // (old_doc, new_doc) => {
    (values, { setSubmitting, resetForm }) => {
      localdb
        .saveChanges(oldDoc, values)
        .then((result) => {
          alert("Saved Successfully!");
          setSubmitting(false);
        })
        .then(localdb.sync(remotedb))
        .catch(console.log);
    },
    [localdb, oldDoc]
  );

  useEffect(() => {
    localdb.all().then((res) => {
      let old_doc = {
        $id: team,
        weight: "",
        drive_train: "",
        drive_motors: "",
        wheels: "",
        climb_level: "",
        misc_design: "",
      };
      if (typeof res[team] !== "undefined") {
        old_doc = res[team];
      }
      setOldDoc(old_doc);
    });
  }, [setOldDoc]);

  if (oldDoc == null) return null;
  console.log(oldDoc);
  return (
    <div>
      <Formik initialValues={oldDoc} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Box sx={panel_sx}>
              <FastField type="input" as={TextField} name="weight" label="Weight" />
              <FastField type="input" as={TextField} name="drive_train" label="Drive Train Type" />
              <FastField type="input" as={TextField} name="drive_motors" label="# of Drive Motors" />
              <FastField type="input" as={TextField} name="wheels" label="Wheels" />
              <FastField type="input" as={TextField} name="climb_level" label="Climb Level" />
              <FastField type="input" as={TextField} name="misc_design" label="Misc" />
            </Box>
            <Box sx={{ ...panel_sx, display: "flex", flexDirection: "column" }}>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TeamPage;
