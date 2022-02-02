import React from "react";
import { Formik, FastField, Form, useFormikContext } from "formik";
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
  const { values, setFieldValue } = useFormikContext();
  return (
    <FastField
      type="number"
      as={TextField}
      name={props.name}
      label={props.label}
      InputProps={{
        style: { fontSize: 40, "maxWidth": 300 },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                setFieldValue(props.name, Math.max(parseInt(values[props.name]) - 1, 0));
              }}
              style={{ width: '96px', height: '96px', padding: '24px' }}
              touch="true"
            >
              <RemoveCircleOutline style={{ fontSize: 50 }} />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setFieldValue(props.name, Math.max(parseInt(values[props.name]) + 1, 0));
              }}
              style={{ width: '96px', height: '96px', padding: '0' }}
              touch="true"
            >
              <AddCircleOutline style={{ fontSize: 50 }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputNumberField;
