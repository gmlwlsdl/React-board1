import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';

const ModalComponent = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="F1000004554_modal">
      <Modal.Header closeButton className="assets1_modal">
        <Modal.Title className="headerTitle_modal">댓글 삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body className="headerLabel_modal">
        해당 댓글을 삭제하시겠습니까?
      </Modal.Body>
      <Modal.Footer className="assets2_modal">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="btn1_modal"
        >
          <span className="btnText_modal">취소</span>
        </Button>
        <Button variant="danger" onClick={handleConfirm} className="btn2_modal">
          <span className="btnText2_modal">삭제</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
