import { useState } from 'react';
import { FormCustom } from './../models/interfaces/FormCustom';

type FormHook = [
  FormCustom,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => any,
  any,
  any
];
export default function useForm(form: FormCustom): FormHook {
  const [formState, setFormState] = useState(form);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newState = { ...formState };
    let item = newState.formControls.find((c) => c.name === e.target.name);

    if (item) item.value = e.target.type === 'checkbox' ? e.target.checked + '' : e.target.value;

    newState = validateState(newState);

    setFormState({ ...newState, formReset: false });
  }
  function validateState(state: FormCustom) {
    let newstate = ValidateRequired(state);

    newstate = ValidateOthers(newstate);
    return newstate;
  }
  function resetForm() {
    formState.formControls.forEach((c) => (c.value = ''));

    setFormState({ ...formState, formReset: true, isValidForm: false });
  }
  function ValidateOthers(newState: FormCustom): FormCustom {
    for (let item of newState.formControls) {
      if (item && item?.validations && item.validations.length > 0) {
        for (let validator of item.validations) {
          switch (validator.type) {
            case 'Regex':
              if (!validator.value.test(item.value) && item.value.trim()) {
                validator.show = true;
                newState.isValidForm = false;
              } else {
                validator.show = false;
              }
              break;
            case 'Confirm':
              if (
                item.value !== newState.formControls.find((c) => c.name === validator.value)?.value
              ) {
                validator.show = true;
                newState.isValidForm = false;
              } else {
                validator.show = false;
              }
          }
        }
      }
    }
    return newState;
  }
  function ValidateRequired(newState: FormCustom) {
    if (newState.formControls.find((c) => (c.value === "false" || !c.value.trim() ) && c.required)) {
      newState.isValidForm = false;
    } else {
      newState.isValidForm = true;
    }
    return newState;
  }
  function getformValue() {
    const formValue: any = {};
    formState.formControls.forEach((c) => {
      const y = c.name;
      formValue[y] = c.type === 'checkbox' ? c.value.toLowerCase() === 'true' : c.value;
    });
    return formValue;
  }
  return [formState, onInputChange, resetForm, getformValue, setFormState, validateState];
}
