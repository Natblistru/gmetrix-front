import React from 'react';
import './Modal.css';

const Modal = (props) => {
  const img_slider = {
    display: 'block',
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    margin: '0px auto',
  };
  return (
    <div className="modal-overlay" onClick={props.closeModal}>
      <div className="modal">
        {/* <h2>Модальное окно</h2> */}
        <p>{props.text}</p>
        <img src={process.env.PUBLIC_URL + props.img} alt="" style= {img_slider}/>
        {/* <button onClick={props.closeModal}>Закрыть</button> */}
      </div>
    </div>
  );
};

export default Modal;
