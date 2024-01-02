import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Modal.setAppElement('#root'); // Specify the root element for accessibility

const SearchComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [postList, setPostList] = useState([]);
  useEffect(() => {

    axios.get('http://localhost:8000/api/all-posts').then(res=>{
      if(res.data.status === 200){
        setPostList(res.data.allPosts);
      }
    });
  
  },[])

  const handleSearch = () => {
    
    console.log(postList)
    setSearchResults(postList);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSearchResults([]);
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        style={{ marginLeft: '120px'}}
        placeholder="Caută..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setModalIsOpen(true)}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Căutare"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div style={{position: 'relative'}}>
          <input
            type="text"
            className="form-control"
            placeholder="Introduceți termenul de căutare..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btnBts btn-outline-secondary mt-2" onClick={handleSearch}>
            Caută
          </button>

          <div className="search-results-container">
            <h5 className="mt-3">Rezultatele Căutării</h5>
            <div className="search-results-list">
              {searchResults && searchResults.map((result) => (
                <div key={result.id}>
                  <h6>{result.name}</h6>
                  <p>{result.name}</p>
                </div>
              ))}
            </div>
          </div>


          <button className="btn-close-modal" style={{right: '-14px', top: '0px' }} onClick={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};

export default SearchComponent;