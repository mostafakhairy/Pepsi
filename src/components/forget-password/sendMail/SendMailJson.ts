import { FormCustom } from "../../../models/interfaces/FormCustom";

export const SendMailForm: FormCustom = {
  formControls: [
    {
      name: "email",
      tabIndex: 1,
      label: "email",
      placeHolder: "email",
      type: "text",
      value: "",
      required: true,
      errorMessage: "requiredEmail",
      validations: [
        {
          type: "Regex",
          value: new RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          ),
          message: "invalidMail",
          show: false,
        },
      ],
    },
  ],
  isValidForm: false,
  formReset: false,
};
