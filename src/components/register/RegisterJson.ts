import { FormCustom } from './../../models/interfaces/FormCustom';

export const registerForm: FormCustom = {
  formControls: [
    {
      name: 'firstName',
      tabIndex: 1,
      label: 'firstName',
      placeHolder: 'firstName',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'requiredFirstName',
    },
    {
      name: 'lastName',
      tabIndex: 2,
      label: 'lastName',
      placeHolder: 'lastName',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'requiredLastName',
    },
    {
      name: 'email',
      tabIndex: 3,
      label: 'email',
      placeHolder: 'email',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'requiredEmail',
      validations: [
        {
          type: 'Regex',
          value: new RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          ),
          message: 'invalidMail',
          show: false,
        },
      ],
    },
    {
      name: 'mobileNumber',
      tabIndex: 4,
      label: 'mobileNumber',
      placeHolder: 'mobileNumber',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'requiredMobileNumber',
      validations: [
        {
          type: 'Regex',
          // value: new RegExp('^0[1][0-9]{9}$'),
          value: new RegExp('^05[0-9]{8}$'),
          message: 'invalidMobileNumber',
          show: false,
        },
      ],
    },
    {
      name: 'password',
      tabIndex: 5,
      label: 'password',
      placeHolder: 'password',
      type: 'password',
      value: '',
      required: true,
      errorMessage: 'requiredPassword',
    },
    {
      name: 'confirmPassword',
      tabIndex: 6,
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
    {
      name: 'isSubscribedSms',
      tabIndex: 7,
      label: 'subscriptionMgs',
      placeHolder: '',
      type: 'checkbox',
      value: 'true',
      required: false,
    },
    {
      name: 'isSubscribedMail',
      tabIndex: 8,
      label: 'subscriptionMail',
      placeHolder: '',
      type: 'checkbox',
      value: 'true',
      required: false,
    },
    {
      name: 'regTerms',
      tabIndex: 9,
      label: 'regTerms',
      placeHolder: '',
      type: 'checkbox',
      value: 'false',
      required: true,
    },
  ],
  isValidForm: false,
  formReset: false,
};
