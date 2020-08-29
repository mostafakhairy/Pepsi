import React, { Fragment, useState, useEffect, useContext } from 'react';
import FormHeader from '../common/form-header/FormHeader';
import FormInput from '../common/form-input/FormInput';
import SubmitBtn from '../common/SubmitBtn/SubmitBtn';
import translation from './../../assets/localization/language';
import useForm from './../../custom-hooks/useForm';
import Slider from '../common/slider/Slider';
import { registerForm } from './RegisterJson';
import authService from '../../services/auth.service';
import RegisterUser from './../../models/interfaces/RegisterUser';
import { withRouter } from 'react-router-dom';
import ErrorAlert from './../common/error-alert/ErrorAlert';
import { ApplicationContext } from '../../context/ApplicationContext';
import ModalSimple from '../common/modal-simple/modalSimple';
import AboutModal from '../common/aboutModal/AboutModal';

export default withRouter(function Register(props: any) {
  const [formState, onInputChange, resetForm, formValue, setFormState, validateState] = useForm(
    registerForm
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    match: { params },
  } = props;
  const [appState] = useContext(ApplicationContext);

  useEffect(
    () => {
      let userParams = params as RegisterUser;

      if (userParams.mobileNumber) {
        if (userParams.offerNumber !== 'null' && userParams.offerNumber !== '0') {
          localStorage.externalCode = userParams.offerNumber;
        }
        authService
          .isUserAlreadyRegistered(userParams.mobileNumber)
          .then((res) => {
            if (!res) {
              let registerFormState = formState;
              for (let [key, value] of Object.entries(userParams)) {
                let input = registerFormState.formControls.find((c) => c.name === key);
                if (input) input.value = value || '';
              }
              registerFormState = validateState(registerFormState);
              setFormState({ ...registerFormState });
            } else {
              props.history.push(`/externalLogin/${userParams.mobileNumber}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // eslint-disable-next-line
    []
  );
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowLoading(true);
    setServerError('');
    setTimeout(() => {
      const value = formValue() as RegisterUser;
      value.Language = appState.lang === 'ar' ? 'Arabic' : 'English';
      authService
        .register(value)
        .then(() => {
          resetForm();
          setShowLoading(false);
          setShowSuccess(true);
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
      <div className="card card-body m-auto col-xs-12  col-sm-6 col-lg-5 border-0 home-form pb-5">
        <FormHeader
          main={translation.registerMain}
          secondary={translation.registerSub}
        ></FormHeader>
        <form onSubmit={handleSubmit} noValidate={true}>
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
            text="registerBtn"
            index={formState.formControls.length + 1}
            disabled={!formState.isValidForm}
            loading={showLoading}
          />
        </form>
      </div>
      <div className="col-6 text-center m-auto">
        <ErrorAlert show={!!serverError} message={serverError} />
      </div>
      <ModalSimple
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        onSubmit={() => setShowAbout(true)}
      />
      <AboutModal
        show={showAbout}
        onClose={() => setShowAbout(false)}
        onSubmit={() => {
          window.location.href = '/';
        }}
      />
    </Fragment>
  );
});
