import { FormCustom } from "../../../models/interfaces/FormCustom";

export const ChangePasswordForm: FormCustom = {
  formControls: [
    {
        name: 'password',
        tabIndex: 1,
        label: 'password',
        placeHolder: 'password',
        type: 'password',
        value: '',
        required: true,
        errorMessage: 'requiredPassword',
      },
      {
        name: 'confirmPassword',
        tabIndex: 2,
        label: 'confirmPassword',
        placeHolder: 'confirmPassword',
        type: 'password',
        value: '',
        required: true,
        errorMessage: 'requiredConfirmPassword',
        validations: [
          { type: 'Confirm', value: 'password', message: 'invalidPassword', show: false },
        ],
      },
  ],
  isValidForm: false,
  formReset: false,
};
