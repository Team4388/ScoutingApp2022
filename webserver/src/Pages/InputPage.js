import React from 'react'
import { useLocalDb } from '../DbContext';
// import { Button, Intent, Spinner } from "@blueprintjs/core";
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import componentMapper from '@data-driven-forms/blueprint-component-mapper/component-mapper';
import FormTemplate from '@data-driven-forms/blueprint-component-mapper/form-template';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'name',
    label: 'Your name',
    isRequired: true,
    // validate: [{type: validatorTypes.REQUIRED}],
    default: 'test'
  }]
}

const InputPage = () => {
    const localdb = useLocalDb();
    console.log(localdb);
    return (
        <div>
          <FormRenderer
          schema={schema}
          componentMapper={componentMapper}
          FormTemplate={FormTemplate}
          />
        </div>
    )
}

export default InputPage