import React from "react";
import { useLocalDb } from "../DbContext";
// import { Button, Intent, Spinner } from "@blueprintjs/core";
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import componentTypes from "@data-driven-forms/react-form-renderer/component-types";
import componentMapper from "@data-driven-forms/blueprint-component-mapper/component-mapper";
import FormTemplate from "@data-driven-forms/blueprint-component-mapper/form-template";
import { Formik, Field, Form } from "formik";
import InputNumberField from "../components/InputNumberField.jsx";
import {
  TextField,
  Button,
  Grid,
  FormRow,
  Checkbox,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";

const InputPage = () => {
  const localdb = useLocalDb();
  console.log(localdb);
  return (
    <div>
      <Formik
        initialValues={{
          team_number: "",
          match_number: "",
          team_abilities_well: "",
          team_abilities_struggle: "",
          team_abilities_cant: "",
          fouls: "0",
          fouls_tech: "0",
          flips: "0",
          red_cards: "0",
          yellow_cards: "0",
          disabled: false,
          upper_hub_auto: "0",
          lower_hub_auto: "0",
          upper_hub: "0",
          lower_hub: "0",
          climb_level: "",
          alliance: "",
          notes_good: "",
          notes_struggle: "",
          notes_cant: "",
        }}
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
              })
              .catch((err) => {
                console.log("Failed To Save Input!");
                alert(err);
              });
            // alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          setValues,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
            >
              <Grid item>
                {" "}
                <Field
                  type="input"
                  as={TextField}
                  name="team_number"
                  label="Team #"
                />{" "}
              </Grid>
              <Grid item>
                {" "}
                <Field
                  type="input"
                  as={TextField}
                  name="match_number"
                  label="Match Number"
                />{" "}
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Alliance</FormLabel>
                  <RadioGroup aria-label="Alliance" name="alliance" row>
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="alliance"
                          value="red"
                        />
                      }
                      label="Red"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="alliance"
                          value="blue"
                        />
                      }
                      label="Blue"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <hr />
            <div />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <InputNumberField
                      name="upper_hub_auto"
                      label="Upper Hub Auto"
                    />
                  </Grid>
                  <Grid item>
                    <InputNumberField
                      name="lower_hub_auto"
                      label="Lower Hub Auto"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {" "}
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    {" "}
                    <InputNumberField name="upper_hub" label="Lower Hub" />{" "}
                  </Grid>
                  <Grid item>
                    {" "}
                    <InputNumberField name="lower_hub" label="Lower Hub" />{" "}
                  </Grid>
                </Grid>{" "}
              </Grid>
            </Grid>
            <hr />
            <div />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
            >
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Climbing</FormLabel>
                  <RadioGroup aria-label="Climbing" name="climb_level" row>
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="climb_level"
                          value="0"
                        />
                      }
                      label="None"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="climb_level"
                          value="1"
                        />
                      }
                      label="Low"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="climb_level"
                          value="2"
                        />
                      }
                      label="Mid"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="climb_level"
                          value="3"
                        />
                      }
                      label="High"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Radio}
                          type="radio"
                          name="climb_level"
                          value="4"
                        />
                      }
                      label="Traversal"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <hr />
            <div />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
            >
              <Grid item>
                <Grid item>
                  <InputNumberField name="fouls" label="Fouls" />{" "}
                </Grid>{" "}
                <Grid item>
                  <InputNumberField name="fouls_tech" label="Tech Fouls" />{" "}
                </Grid>{" "}
              </Grid>
              <Grid item>
                <Grid item>
                  <InputNumberField name="red_cards" label="Red Cards" />{" "}
                </Grid>{" "}
                <Grid item>
                  <InputNumberField name="yellow_cards" label="Yellow Cards" />{" "}
                </Grid>
                <Grid item>
                  {/* <InputNumberField name="disables" label="Disables" />{" "} */}
                </Grid>{" "}
              </Grid>
            </Grid>
            <hr />
            <div />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
            >
              <Grid item>
                {" "}
                <Field
                  type="input"
                  as={TextField}
                  multiline
                  rows={3}
                  rowsMax={7}
                  labelWidth={60}
                  name="team_abilities_well"
                  label="What they did Well"
                />{" "}
              </Grid>
              <Grid item>
                {" "}
                <Field
                  type="input"
                  as={TextField}
                  multiline
                  rows={3}
                  rowsMax={7}
                  labelWidth={60}
                  name="team_abilities_struggle"
                  label="What they struggled with"
                />{" "}
              </Grid>
              <Grid item>
                {" "}
                <Field
                  type="input"
                  as={TextField}
                  multiline
                  rows={3}
                  rowsMax={7}
                  labelWidth={60}
                  name="team_abilities_cant"
                  label="What they can't do"
                />{" "}
              </Grid>
            </Grid>

            <div />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
            >
              <Button type="submit" disabled={isSubmitting}>
                {" "}
                Submit{" "}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputPage;
