import { FormControlInput } from './FormControlInput';

export interface FormCustom {
  formControls: FormControlInput[];
  isValidForm: boolean;
  formReset: boolean;
}
