import React from "react";
import { useLocalDb } from "../DbContext";
import "./InputPage.css";
import { Formik, FastField, Form } from "formik";
import InputNumberField from "../components/InputNumberField.jsx";
import { TextField, Button, Grid, FormRow, Divider, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, InputAdornment, Box } from "@mui/material";

const InputPage = () => {
  const localdb = useLocalDb();
  let panel_sx = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
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
  return (
    <div>
      <br />
      <Formik
        initialValues={{
          team_number: "",
          match_number: "",
          team_abilities_well: "",
          team_abilities_struggle: "",
          team_abilities_cant: "",
          fouls: "0",
          fouls_tech: "0",
          flipped: false,
          red_cards: "0",
          yellow_cards: "0",
          disabled: false,
          taxi_auto: false,
          upper_hub_auto: "0",
          lower_hub_auto: "0",
          upper_hub_teleop: "0",
          lower_hub_teleop: "0",
          climb_level: "",
          alliance: "",
          defence: "0",
          disabled: false,
        }}
        validateOnChange="false"
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            localdb
              .put({
                _id: new Date().toISOString(),
                ...values,
              })
              .then((result) => {
                alert("Input Saved Successfully!");
                console.log(result);
                console.log(localdb);
              })
              .catch((err) => {
                console.log("Failed To Save Input!");
                alert(err);
              });
            // alert(JSON.stringify(values, null, 2));
            // resetForm(); //Hah tobad
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, setValues, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={panel_sx}>
                <FastField type="input" as={TextField} name="team_number" label="Team #" />
                <FastField type="input" as={TextField} name="match_number" label="Match Number" />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Alliance</FormLabel>
                  <RadioGroup aria-label="Alliance" name="alliance" row>
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="alliance" value="red" sx={{ "&, &.Mui-checked": { color: "red_alliance" } }} />} sx={{ color: "red_alliance" }} label="Red" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="alliance" value="blue" sx={{ "&, &.Mui-checked": { color: "blue_alliance" } }} />} sx={{ color: "blue_alliance" }} label="Blue" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={panel_sx}>
                <InputNumberField name="upper_hub_auto" label="Upper Hub Auto" />
                <InputNumberField name="lower_hub_auto" label="Lower Hub Auto" />
                <FormControlLabel control={<FastField as={Checkbox} type="checkbox" name="taxi_auto" />} label="Auto Taxi" />
              </Box>

              <Box sx={panel_sx}>
                <InputNumberField name="upper_hub_teleop" label="Upper Hub Teleop" />
                <InputNumberField name="lower_hub_teleop" label="Lower Hub Teleop" />
              </Box>

              <Box sx={panel_sx}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Climbing</FormLabel>
                  <RadioGroup aria-label="Climbing" name="climb_level" row>
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="0" />} label="None" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="1" />} label="Low" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="2" />} label="Mid" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="3" />} label="High" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="climb_level" value="4" />} label="Traversal" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={panel_sx}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <InputNumberField name="fouls" label="Fouls" />
                  <InputNumberField name="fouls_tech" label="Tech Fouls" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <InputNumberField name="red_cards" label="Red Cards" />
                  <InputNumberField name="yellow_cards" label="Yellow Cards" />
                </Box>
              </Box>

              <Box sx={panel_sx}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Defense</FormLabel>
                  <RadioGroup aria-label="Defense" name="defence" row>
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="0" />} label="None" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="1" />} label="Poor" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="2" />} label="Good" />
                    <FormControlLabel control={<FastField as={Radio} type="radio" name="defence" value="3" />} label="Exceptional" />
                  </RadioGroup>
                </FormControl>
                <FormControlLabel control={<FastField as={Checkbox} type="checkbox" name="disabled" />} label="Disabled" />
              </Box>

              <Box sx={{ ...panel_sx, display: "flex", flexDirection: "column" }}>
                <h2>What they _______</h2>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 0, m: 0 }}>
                  <FastField type="input" as={TextField} multiline rows={3} name="team_abilities_well" label="did well" />
                  <FastField type="input" as={TextField} multiline rows={3} name="team_abilities_struggle" label="struggled with" />
                  <FastField type="input" as={TextField} multiline rows={3} name="team_abilities_cant" label="can't do" />
                </Box>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Box>
            </Box>
            <div />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputPage;
