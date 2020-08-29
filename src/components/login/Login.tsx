import React, { Fragment, useState, useEffect } from 'react';
import translation from '../../assets/localization/language';
import FormInput from '../common/form-input/FormInput';
import FormHeader from '../common/form-header/FormHeader';
import SubmitBtn from './../common/SubmitBtn/SubmitBtn';
import Slider from '../common/slider/Slider';
import useForm from './../../custom-hooks/useForm';
import { loginForm } from './LoginJson';
import authService from '../../services/auth.service';
import LoginUser from './../../models/interfaces/LoginUser';
import { withRouter } from 'react-router-dom';
import ErrorAlert from './../common/error-alert/ErrorAlert';
import ForgetPassword from './../forget-password/Index';

export default withRouter(function Login(props: any) {
  const [formState, onInputChange, resetForm, formValue, setLoginState] = useForm(loginForm);
  const [showLoading, setShowLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [forgetPassword, setForgetPassword] = useState(false);

  const {
    match: { params },
  } = props;
  useEffect(() => {
    let mobileNumber = params.mobileNumber as string;
    let loginState = formState;
    if (mobileNumber) {
      let input = loginState.formControls.find((c) => c.name === 'mobileNumber');
      if (input) {
        input.value = mobileNumber;
      }
      setLoginState({ ...loginState });
    }
  }, []);
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowLoading(true);
    setServerError('');
    let value = formValue() as LoginUser;
    setTimeout(() => {
      authService
        .login(value)
        .then(() => {
          resetForm();
          window.location.href = '/';
        })
        .catch((err) => {
          setServerError(err);
          setShowLoading(false);
        });
    });
  }

  return (
    <Fragment>
      <Slider />
      <div className="card card-body m-auto col-xs-12  col-sm-6 col-lg-4 border-0">
        {/* <h2 className="text-center text-primary">{translation.login}</h2> */}
        <FormHeader main={translation.login} secondary={translation.loginSub}></FormHeader>
        <form className="needs-validation" noValidate onSubmit={submitForm} id="post-container">
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
            text="login"
            index={formState.formControls.length + 1}
            disabled={!formState.isValidForm}
            loading={showLoading}
          />
          <p className="my-3 text-center">
            {translation.forgetText1}{' '}
            <a
              href="#"
              onClick={(e) => {
                setForgetPassword(true);
              }}
            >
              {translation.forgetText2}
            </a>
          </p>
        </form>
      </div>

      <div className="col-6 text-center m-auto">
        <ErrorAlert show={!!serverError} message={serverError} />
      </div>
      <ForgetPassword show={forgetPassword} onClose={() => setForgetPassword(false)}/>
    </Fragment>
  );
});
