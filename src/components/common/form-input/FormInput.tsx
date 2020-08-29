import React, { useState, useEffect, Fragment } from 'react';
import { FormControlInput } from '../../../models/interfaces/FormControlInput';
import translation from '../../../assets/localization/language';
import Form from 'react-bootstrap/Form';

interface Input {
  config: FormControlInput;
  inputChange: any;
  rested: boolean;
}
export default function FormInput({ config, inputChange, rested }: Input) {
  const [classesState, setClassesState] = useState('form-control py-4 pr-3');
  let input = (
    <input
      type={config.type}
      className={classesState}
      placeholder={translation[config.placeHolder]}
      tabIndex={config.tabIndex}
      required={config.required}
      onBlur={onInputBlur}
     value={config.value}
      onChange={inputChange}
      name={config.name}
    />
  );
  useEffect(() => {
    if (rested) setClassesState('form-control p-4');
  }, [rested]);
  function onInputBlur() {
    if ((config.required && !config.value.trim()) || config.validations?.find((c) => c.show)) {
      let newClasses = classesState.replace('is-valid', ' is-invalid');
      if (newClasses.indexOf('is-invalid') <= 0) {
        newClasses += ' is-invalid';
      }
      setClassesState(newClasses);
    } else {
      let newClasses = classesState.replace('is-invalid', ' is-valid');
      if (newClasses.indexOf('is-valid') <= 0) {
        newClasses += ' is-valid';
      }

      setClassesState(newClasses);
    }
  }
  let displayedInput = (
    <div className="form-group">
      <label>{translation[config.label]}</label>
      {input}
      {config.required && !config.value.trim() ? (
        <div className="invalid-feedback">{translation[config.errorMessage || '']}</div>
      ) : null}
      {config.validations?.map((validator) => {
        return validator.show ? (
          <div className="invalid-feedback">{translation[validator.message]}</div>
        ) : null;
      })}
    </div>
  );
  if (config.type === 'checkbox') {
    displayedInput = (
      <p className="d-flex mb-3 align-items-center">
        <Form.Check
          aria-label="option 1"
          name={config.name}
          tabIndex={config.tabIndex}
          checked={config.value === 'true'}
          onChange={inputChange}
        />{' '}
        {translation[config.label]}
      </p>
    );
  }

  return <Fragment>{displayedInput}</Fragment>;
}
