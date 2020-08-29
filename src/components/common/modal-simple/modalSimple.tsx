import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modalSimple.scss';
import translation from '../../../assets/localization/language';
import Extralogo from '../../../assets/imgs/Extralogo.png';

export default function ModalSimple({ show, onClose, onSubmit }: any) {
  return (
    <div>
      <Modal show={show} onHide={onClose} className="modal-simple">
        <Modal.Header closeButton className="pb-0">
          {' '}
          <img className='extra-logo' src={Extralogo} />{' '}
        </Modal.Header>

        <Modal.Body className="pt-0">
          <p className="mb-22 heading-6 mt-3">{translation.gift1Details}</p>

          <Button variant="primary mb-4 lg-btn" onClick={onSubmit}>
            {translation.continue}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
