import React from 'react';
import Modal from 'react-bootstrap/Modal';
import translation from '../../../assets/localization/language';
import Button from 'react-bootstrap/Button';
import AboutTable from '../aboutTable/AboutTable';

export default function AboutModal({ show, onClose, onSubmit }: any) {
  return (
    <Modal
      className="basicModal"
      show={show}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-primary mt-3" id="contained-modal-title-vcenter">
          {translation.aboutPepsiAwards}
        </Modal.Title>
        <p>{translation.aboutPepsiAwardsText}</p>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <AboutTable />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="mb-4" onClick={onSubmit}>
          {translation.continue}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
