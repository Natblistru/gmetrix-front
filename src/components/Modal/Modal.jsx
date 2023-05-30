import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
    <div className="modal-overlay" onClick={props.closeModal}>
      <div className="modal">
        <h2>Модальное окно</h2>
        <p>{props.text}</p>
        <button onClick={props.closeModal}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;
