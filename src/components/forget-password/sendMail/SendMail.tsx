import React, { useState, Fragment } from 'react';
import useForm from '../../../custom-hooks/useForm';
import { SendMailForm } from './SendMailJson';
import FormHeader from '../../common/form-header/FormHeader';
import SubmitBtn from '../../common/SubmitBtn/SubmitBtn';
import translation from '../../../assets/localization/language';
import FormInput from '../../common/form-input/FormInput';
import ErrorAlert from '../../common/error-alert/ErrorAlert';
import authService from '../../../services/auth.service';

type sendMailProps = {
  setEmail: Function;
  setStep: Function;
};

export const SendMail = (props: sendMailProps) => {
  const [formState, onInputChange, resetForm, formValue] = useForm(SendMailForm);
  const [showLoading, setShowLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoading(true);
    setServerError('');
    let value = formValue();
    setTimeout(() => {
      authService
        .getOTP(value.email)
        .then(() => {
          resetForm();
          props.setEmail(value.email);
          props.setStep('confirmMail');
        })
        .catch((err) => {
          setServerError(err);
          setShowLoading(false);
        });
    });
  };

  return (
    <Fragment>
      <div className="card card-body m-auto col-12  border-0">
        {/* <h2 className="text-center text-primary">{translation.login}</h2> */}
        <FormHeader
          main={translation.forgetPassword}
          secondary={translation.forgetPasswordSub}
        ></FormHeader>
        <form className="needs-validation mt-3" noValidate onSubmit={submitForm} id="post-container">
          {formState.formControls.map((input) => {
            return (
              <FormInput
                key={input.name}
                config={input}
                inputChange={(e: any) => {
                  setServerError('');
                  onInputChange(e);
                }}
                rested={formState.formReset}
              />
            );
          })}
          <SubmitBtn
            text="sendCode"
            index={formState.formControls.length + 1}
            disabled={!formState.isValidForm}
            loading={showLoading}
          />
        </form>
      </div>

      <div className="col-6 text-center m-auto">
        <ErrorAlert show={!!serverError} message={serverError} />
      </div>
    </Fragment>
  );
};
