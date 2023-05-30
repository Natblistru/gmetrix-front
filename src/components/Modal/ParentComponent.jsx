import React, { useState } from 'react';
import DiagramTable from '../DiagramTable';
import Modal from './Modal';

const ParentComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const openModal = (text) => {
    setIsModalOpen(true);
    setModalText(text);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalText('');
  };

  return (
    <div>
      <DiagramTable {...props} openModal={openModal} />
      {isModalOpen && <Modal closeModal={closeModal} text={modalText}/>}
    </div>
  );
};

export default ParentComponent;
