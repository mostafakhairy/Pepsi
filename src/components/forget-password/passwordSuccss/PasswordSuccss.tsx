import React from "react";
import Button from "react-bootstrap/Button";
import translation from "./../../../assets/localization/language";
import successIcon from "../../../assets/imgs/success-icon.png";

type successProps = {
  onClose: Function;
}

export function PasswordSuccess(props: successProps) {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-primary heading-1 mb-4">
          {translation.passwordSuccessText}
        </h2>
        <p className="mb-3 heading-6 px-5">{translation.otpText}</p>

        <div className="text-center">
          <img height="80" className="my-2" src={successIcon} alt="" />
        </div>
          <Button className="mt-3 mb-4 btn-w-1" variant="primary" onClick={() => props.onClose()}>
            {translation.login}
          </Button>
      </div>
    </div>
  );
}
