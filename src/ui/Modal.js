import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../CSS/Modal.css';
import { ModalContext } from '../contextApi/Context';

const Modal = () => {
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <>
      {showModal && (
        <div className={`overlay ${showModal ? 'show-modal' : ''}`}>
          <div className="modal-container">
            <div className="">
              <h3>Modal Content</h3>
              <FaTimes
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
