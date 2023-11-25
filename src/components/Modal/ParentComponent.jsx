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
    <div style={{ paddingBottom: '100px' }}>
      {/* <DiagramTable {...props} openModal={openModal} /> */}
      <iframe style={{borderBottom: '1px solid #584949'}} width="100%" height="360" src="https://www.youtube.com/embed/qV2PSgIK-c4" title="România în Primul Război Mondial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
      {isModalOpen && <Modal closeModal={closeModal} text={modalText} img={modalImg}/>}
    </div>
  );
};

export default ParentComponent;
