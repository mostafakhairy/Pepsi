import Validation from './Validation';

export interface FormControlInput {
  type: string;
  label: string;
  value: string;
  placeHolder: string;
  name: string;
  tabIndex: number;
  required: boolean;
  errorMessage?: string;
  validations?: Validation[];
}
