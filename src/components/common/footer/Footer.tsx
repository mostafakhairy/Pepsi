import React, { useState, useContext, useEffect } from 'react';
import pepsi from '../../../assets/imgs/pepsi.png';
import Classes from './Footer.module.scss';
import translation from './../../../assets/localization/language';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink, withRouter } from 'react-router-dom';
import { ApplicationContext } from '../../../context/ApplicationContext';
import { FormCustom } from './../../../models/interfaces/FormCustom';
import FormInput from '../form-input/FormInput';
import useForm from './../../../custom-hooks/useForm';
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import authService from '../../../services/auth.service';
import userService from '../../../services/user.service';
import IUserSubscription from './../../../models/interfaces/IUserSubscription';
import ErrorAlert from '../error-alert/ErrorAlert';
let form: FormCustom = {
  formControls: [
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
  ],
  isValidForm: false,
  formReset: false,
};
export default withRouter(function Footer(props: any) {
  const [show, setShow] = useState(false);
  const [appState, setAppState] = useContext(ApplicationContext);
  const [formState, onInputChange, , formValue, setFormState] = useForm(form);
  const [serverError, setServerError] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    let newState = { ...formState };
    let sms = newState.formControls.find((c) => c.name === 'isSubscribedSms');
    let mail = newState.formControls.find((c) => c.name === 'isSubscribedMail');
    if (sms && appState.user.mobileNumber) sms.value = appState.user.isSubscribedSms.toLowerCase();
    if (mail && appState.user.mobileNumber)
      mail.value = appState.user.isSubscribedMail.toLowerCase();
    setFormState({ ...newState });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError('');
    setShowLoading(true);
    updateUser(formValue() as IUserSubscription);
  }
  function updateUser(userSubscription: IUserSubscription) {
    userService
      .updateUser(userSubscription)
      .then(() => {
        setShowLoading(false);
        setAppState({ ...appState, user: authService.getLoggedUser() });
        setShow(false);
      })
      .catch((ex) => {
        setServerError(ex);
        setShowLoading(false);
      });
  }
  return (
    <footer className={Classes.FooterContainer}>
      <div className="container-fluid">
        <div className={Classes.FooterContent}>
          <img className="mr-2" src={pepsi} width="50" height="50" />
          <div className={Classes.FooterTexts}>
            <h5 className="mb-0"> {translation.pepsiGifts20} </h5>
            {/* <p> {translation.copyRights} </p> */}
          </div>
        </div>

        <div className="row footer-links mt-4">
          <div className="col-lg first">
            <div className="row">
              <div className="col-md-6">
                <ul className="text-left p-0">
                  <li className="mb-3">
                    <NavLink to="/" exact className="text-light">
                      {translation.home}{' '}
                    </NavLink>
                  </li>
                  <li className="mb-3">
                    <NavLink to="/" exact className="text-light">
                      {translation.useCode}{' '}
                    </NavLink>
                  </li>
                  <li className="mb-3">
                    <NavLink to="about" exact className="text-light">
                      {translation.about}{' '}
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="text-left p-0">
                  <li className="mb-3">
                    <NavLink to="terms" exact className="text-light">
                      {translation.terms}{' '}
                    </NavLink>
                  </li>
                  <li className="mb-3">
                    <NavLink to="privacy" exact className="text-light">
                      {translation.privacy}{' '}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg inner center">
            <div className="">
              <p className="text-left"> {translation.footerText} </p>
              <div className="text-left mt-3">
                <Button variant="outline-light mr-4" onClick={() => props.history.push('login')}>
                  {translation.login}
                </Button>
                <Button variant="light text-primary" onClick={() => props.history.push('register')}>
                  {translation.register}
                </Button>
              </div>
            </div>
          </div>

          <div className="col-lg inner last">
            <div className="">
              <p className="text-left"> {translation.footerSubscriptionsText} </p>
              <div className="text-left mt-3">
                <Button onClick={() => setShow(true)} variant="light text-primary">
                  {translation.subscriptions}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal className="footer-Modal" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{translation.subscriptionControl}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">{translation.subscriptionsModal}</div>
          <form onSubmit={handleSubmit} noValidate={true}>
            <div className="text-center checkBoxes">
              <div>
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
              </div>
            </div>

            <div className="text-center fix-btn-modal">
              <SubmitBtn
                text="saveSettings"
                index={formState.formControls.length + 1}
                disabled={!formState.isValidForm}
                loading={showLoading}
              />
            </div>
            <div className="col-12 text-center mt-3">
              <ErrorAlert show={!!serverError} message={serverError} />
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {translation.saveSettings}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </footer>
  );
});
