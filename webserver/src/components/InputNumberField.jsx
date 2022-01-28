import React from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
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

const InputNumberField = (props) => {
  const { values, setValues } = useFormikContext();
  return (
    <Field
      type="number"
      as={TextField}
      name={props.name}
      label={props.label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                setValues({
                  ...values,
                  [props.name]: Math.max(parseInt(values[props.name]) - 1, 0),
                });
              }}
            >
              <RemoveCircleOutline />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setValues({
                  ...values,
                  [props.name]: parseInt(values[props.name]) + 1,
                });
              }}
            >
              <AddCircleOutline />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputNumberField;
