import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function GeneralModal({ show, onClose, children }: any) {
  return (
    <div>
      <Modal show={show} onHide={onClose} className="modal-simple">
        <Modal.Header closeButton className="pb-0 border-0"></Modal.Header>
        <Modal.Body className="pt-0">{children}</Modal.Body>
      </Modal>
    </div>
  );
}
