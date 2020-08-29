import React, { useState } from "react";

import GeneralModal from "./../common/general-modal/GeneralModal";
import { SendMail } from "./sendMail/SendMail";
import { ConfirmMail } from "./confirmMail/ConfirmMail";
import { ChangePassword } from "./changePassword/ChangePassword";
import { PasswordSuccess } from "./passwordSuccss/PasswordSuccss";

type resetPasswordProps = {
  show: Boolean;
  onClose: Function;
};

const modals = {
  sendMail: "sendMail",
  confirmMail: "confirmMail",
  changePassword: "changePassword",
  passwordSuccess: "passwordSuccess",
};

const ResetPassword = (props: resetPasswordProps) => {
  const [step, setStep] = useState(modals.sendMail);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const handleClose = () => {
    setStep(modals.sendMail);
    props.onClose();
  };
  return (
    <GeneralModal show={props.show} onClose={handleClose}>
      {step === modals.sendMail && (
        <SendMail
          setEmail={(mail: string) => setEmail(mail)}
          setStep={(step: string) => setStep(step)}
        />
      )}
      {step === modals.confirmMail && (
        <ConfirmMail
          email={email}
          otp={otp}
          setOTP={(otp: string) => setOTP(otp)}
          setStep={(step: string) => setStep(step)}
        />
      )}
      {step === modals.changePassword && (
        <ChangePassword
          email={email}
          otp={otp}
          setStep={(step: string) => setStep(step)}
        />
      )}
      {step === modals.passwordSuccess && (
        <PasswordSuccess onClose={() => props.onClose()} />
      )}
    </GeneralModal>
  );
};

export default ResetPassword;
