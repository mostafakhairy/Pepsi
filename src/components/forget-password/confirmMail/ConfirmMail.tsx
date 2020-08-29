import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import translation from "./../../../assets/localization/language";
import PinInput from "react-pin-input";
import authService from "../../../services/auth.service";
import ErrorAlert from "../../common/error-alert/ErrorAlert";
import Loader from '../../common/loader/Loader';

type confirmNailProps = {
  email: string;
  otp: string;
  setOTP: Function;
  setStep: Function;
};

export function ConfirmMail(props: confirmNailProps) {
  const [showLoading, setShowLoading] = useState(false);
  const [serverError, setServerError] = useState("");


  const onSubmit = () => {
    setShowLoading(true);
            debugger;
            setTimeout(() => {
              authService
                .validateOTP(props.email, +props.otp)
                .then((res) => {
                  props.setStep("changePassword");
                })
                .catch((err) => {
                  setServerError(err);
                  setShowLoading(false);
                });
            });
  };
  return (
    <div>
      <div className="text-center">
        <h2 className="text-primary heading-1 mb-4">
          {translation.identityVerification}
        </h2>
        <p className="heading-6 px-5">{translation.otpText}</p>
        <p className="mb-3 heading-6 px-5">{translation.otpTextMail}</p>
        <PinInput
          length={4}
          initialValue=""
          onChange={(value, index) => {}}
          type="numeric"
          onComplete={(value, index) => {
            props.setOTP(value);
          }}
        />

        <Button className="mt-3 btn-w-1 mb-4" variant="primary" onClick={() => onSubmit()}>
          {translation.enterCode}<Loader show={showLoading} />
        </Button>
      </div>
      <div className="col-6 text-center m-auto">
        <ErrorAlert show={!!serverError} message={serverError} />
      </div>
    </div>
  );
}
