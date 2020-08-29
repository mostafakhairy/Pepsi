import { FormCustom } from '../../models/interfaces/FormCustom';

export const loginForm: FormCustom = {
  formControls: [
    {
      name: 'mobileNumber',
      tabIndex: 1,
      label: 'mobileNumber',
      placeHolder: 'mobileNumber',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'requiredMobileNumber',
      validations: [
        {
          type: 'Regex',
          value: new RegExp('^05[0-9]{8}$'),
          // value: new RegExp('^0[1][0-9]{9}$'),
          message: 'invalidMobileNumber',
          show: false,
        },
      ],
    },
    {
      name: 'password',
      tabIndex: 2,
      label: 'password',
      placeHolder: 'password',
      type: 'password',
      value: '',
      required: true,
      errorMessage: 'requiredPassword',
    },
  ],
  isValidForm: false,
  formReset: false,
};
