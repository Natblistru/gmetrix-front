import React, { useState } from 'react';
import DiagramTable from '../DiagramTable';
import Modal from './Modal';

const ParentComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalImg, setModalImg] = useState('');

  const openModal = (text,img) => {
    setIsModalOpen(true);
    setModalText(text);
    setModalImg(img)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalText('');
  };

  return (
    <div>
      <DiagramTable {...props} openModal={openModal} />
      {isModalOpen && <Modal closeModal={closeModal} text={modalText} img={modalImg}/>}
    </div>
  );
};

export default ParentComponent;
