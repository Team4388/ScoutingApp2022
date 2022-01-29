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
  const { values, setFieldValue } = useFormikContext();
  return (
    <Field
      type="number"
      as={TextField}
      name={props.name}
      label={props.label}
      InputProps={{
        style: { fontSize: 40, "max-width": 300 },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => {
                setFieldValue(props.name, Math.max(parseInt(values[props.name]) - 1, 0));
              }}
              iconStyle={{ width: '48px', height: '48px' }}
              style={{ width: '96px', height: '96px', padding: '24px' }}
              touch={true}
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
              iconStyle={{ width: '100px', height: '100px' }}
              style={{ width: '96px', height: '96px', padding: '0' }}
              touch={true}
              size="large"

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
