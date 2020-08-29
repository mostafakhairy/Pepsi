import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Classes from './ErrorAlert.module.scss';

interface IAlert {
  show: boolean;
  message: string;
}
const ErrorAlert = ({ show, message }: IAlert) => {
  return (
    <Alert show={show} variant="danger" className="border border-danger">
      <div className={Classes.AlertContainer}>
        <p>{message}</p>
        <i className="fa fa-exclamation-circle text-danger fa-2x m-2" aria-hidden="true"></i>
      </div>
    </Alert>
  );
};

export default ErrorAlert;
